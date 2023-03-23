import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { combineLatest, Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { CegControlManager } from '../cegControlManager';
import { Controls, ControlValue } from '../controlType';

interface Group {
  name: string;
  controls: Controls;
}

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss'],
})
export class ControlsComponent implements OnInit, OnDestroy {
  @Input() controlManager: CegControlManager;
  @Output() propChange = new EventEmitter<{ propName: string; value: ControlValue }>();
  unsubscriber = new Subject();
  groups: Group[] = [];

  ngOnInit() {
    combineLatest([
      this.controlManager.getCurrentControlGroupOrder(),
      this.controlManager.getCurrentControls(),
    ])
      .pipe(
        takeUntil(this.unsubscriber),
        distinctUntilChanged(([prevGroupOrder], [currGroupOrder]) => {
          /**
           * We only want to re-create the controls when the entire list changes,
           * to prevent all the controls re-rendering on each change.
           **/
          return JSON.stringify(prevGroupOrder) === JSON.stringify(currGroupOrder);
        }),
      )
      .subscribe(([groupOrder, controls]) => this.createControlGroups(controls, groupOrder));
  }

  private createControlGroups(controls: Controls, groupOrder: string[]) {
    console.log('Creating list');
    const newGroups: Group[] = [];

    groupOrder.forEach((groupName) => {
      const groupControls = {};
      Object.entries(controls).forEach(([propName, value]) => {
        if (value.group === groupName) {
          groupControls[propName] = value;
        }
      });

      newGroups.push({ name: groupName, controls: groupControls });
    });

    this.groups = newGroups;
  }

  ngOnDestroy(): void {
    this.unsubscriber.next();
    this.unsubscriber.complete();
  }

  updateValue(key: string, value: ControlValue): void {
    this.propChange.emit({ propName: key, value: value });
  }

  // Reset the default sorting provided by the 'keyvalue' pipe.
  noSort = () => 0;
}
