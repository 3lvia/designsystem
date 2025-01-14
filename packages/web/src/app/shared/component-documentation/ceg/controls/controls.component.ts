import { KeyValuePipe } from '@angular/common';
import { Component, EventEmitter, OnDestroy, OnInit, Output, input } from '@angular/core';
import { Subject, combineLatest } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';

import { UnknownCegControlManager } from '../cegControlManager';
import { ControlValue, Controls } from '../controlType';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { CounterComponent } from './counter/counter.component';
import { RadioGroupComponent } from './radio-group/radio-group.component';
import { SwitchComponent } from './switch/switch.component';
import { TextComponent } from './text/text.component';

interface Group {
  name: string;
  controls: Controls;
}

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss'],
  imports: [
    RadioGroupComponent,
    CheckboxComponent,
    SwitchComponent,
    CounterComponent,
    TextComponent,
    KeyValuePipe,
  ],
})
export class ControlsComponent implements OnInit, OnDestroy {
  private unsubscriber = new Subject<void>();
  readonly controlManager = input.required<UnknownCegControlManager>();
  @Output() propChange = new EventEmitter<{ propName: string; value: ControlValue }>();
  @Output() slotToggle = new EventEmitter<{ slotName: string; isVisible: boolean }>();
  disabledControls: string[] = [];
  groups: Group[] = [];

  ngOnInit() {
    combineLatest([
      this.controlManager().getCurrentControls(),
      this.controlManager().getCurrentControlGroupOrder(),
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

    this.controlManager()
      .getDisabledControls()
      .pipe(takeUntil(this.unsubscriber))
      .subscribe((controls) => (this.disabledControls = controls));
  }

  isDisabled(controlName: string): boolean {
    return this.disabledControls.includes(controlName);
  }

  parentIsChecked(parentName?: string): boolean {
    const control = this.controlManager().getControlSnapshot()?.[parentName || ''];
    if (!control) {
      return true;
    }
    return control.value;
  }

  private createControlGroups(controls: Controls, groupOrder: string[]) {
    const newGroups: Group[] = [];

    groupOrder.forEach((groupName) => {
      const groupControls: Record<string, Controls[keyof Controls]> = {};
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

  slotToggleChange(slotName: string, isVisible: boolean): void {
    this.slotToggle.emit({ slotName, isVisible });
  }

  // Reset the default sorting provided by the 'keyvalue' pipe.
  noSort = () => 0;
}
