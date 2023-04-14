import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { combineLatest, Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';

import { UnknownCegControlManager } from '../cegControlManager';
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
  private unsubscriber = new Subject();
  @Input() controlManager: UnknownCegControlManager;
  @Output() propChange = new EventEmitter<{ propName: string; value: ControlValue }>();
  groups: Group[] = [];

  ngOnInit() {
    combineLatest([
      this.controlManager.getCurrentControls(),
      this.controlManager.getCurrentControlGroupOrder(),
    ])
      .pipe(
        takeUntil(this.unsubscriber),
        distinctUntilChanged(([prevControls, prevGroupOrder], [currControls, currGroupOrder]) => {
          const controlsNotChanged = JSON.stringify(prevControls) === JSON.stringify(currControls);
          const groupOrderNotChanged = JSON.stringify(prevGroupOrder) === JSON.stringify(currGroupOrder);
          return controlsNotChanged && groupOrderNotChanged;
        }),
      )
      .subscribe(([controls, groupOrder]) => {
        if (!controls || !groupOrder) return;
        this.createControlGroups(controls, groupOrder);
      });
  }

  private createControlGroups(controls: Controls, groupOrder: string[]) {
    const newGroups: Group[] = [];

    groupOrder.forEach((groupName) => {
      const groupControls = {};
      Object.entries(controls).forEach(([propName, value]) => {
        if (value?.group === groupName) {
          groupControls[propName] = value;
        }
      });

      newGroups.push({ name: groupName, controls: groupControls });
    });

    if (this.groupListsAreAlike(this.groups, newGroups)) {
      this.updateExistingControlValues(newGroups);
    } else {
      this.groups = newGroups;
    }
  }

  private updateExistingControlValues(newGroups: Group[]): void {
    this.groups.forEach((group, groupIndex) => {
      Object.entries(group.controls).forEach(([controlName, control]) => {
        /**
         * We assume that the group lists are identical.
         * This is considered safe, since both lists passed the groupListsAreAlike-check.
         */
        const newValue = newGroups[groupIndex].controls[controlName]?.value;
        if (control && control.value !== newValue) {
          control.value = newValue;
        }
      });
    });
  }

  private groupListsAreAlike(listA: Group[], listB: Group[]): boolean {
    const listAGroupNames = listA.map((group) => group.name).join('');
    const listAControls = listA.flatMap((group) => Object.keys(group.controls)).join('');

    const listBGroupNames = listB.map((group) => group.name).join('');
    const listBControls = listB.flatMap((group) => Object.keys(group.controls)).join('');

    return listAGroupNames === listBGroupNames && listAControls === listBControls;
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
