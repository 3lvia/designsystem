import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

import { SlotToggle, Switch } from '../../controlType';

@Component({
  selector: 'app-switch',
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './switch.component.html',
})
export class SwitchComponent {
  readonly switch = input.required<Switch | SlotToggle>();
  readonly toggleChange = output<boolean>();

  onChange(isChecked: boolean): void {
    this.toggleChange.emit(isChecked);
  }
}
