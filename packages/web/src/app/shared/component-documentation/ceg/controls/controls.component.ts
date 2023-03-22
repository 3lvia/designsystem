import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { ControlConfiguration, Controls, ControlValue } from '../controlType';

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
  @Input() configuration: BehaviorSubject<ControlConfiguration>;
  @Output() propChange = new EventEmitter<{ key: string; value: ControlValue }>();
  unsubscriber = new Subject();
  groups: Group[] = [];

  ngOnInit() {
    this.configuration
      .pipe(
        takeUntil(this.unsubscriber),
        distinctUntilChanged((x, y) => x.controls === y.controls),
      )
      .subscribe((controls) => this.createControlGroups(controls));
  }

  private createControlGroups(config: ControlConfiguration) {
    const newGroups: Group[] = [];

    config.groupOrder.forEach((groupName) => {
      const groupControls = {};
      Object.entries(config.controls).forEach(([key, value]) => {
        if (value.group === groupName) {
          groupControls[key] = value;
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
    this.propChange.emit({ key: key, value: value });
  }

  // Reset the default sorting provided by the 'keyvalue' pipe.
  noSort = () => 0;
}
