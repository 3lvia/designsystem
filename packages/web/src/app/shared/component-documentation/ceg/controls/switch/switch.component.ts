import { Component, input, output } from '@angular/core';

import { SlotToggle, Switch } from '../../controlType';

@Component({
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  standalone: true,
})
export class SwitchComponent {
  readonly switch = input.required<Switch | SlotToggle>();
  readonly toggleChange = output<boolean>();

  onChange(isChecked: boolean): void {
    this.toggleChange.emit(isChecked);
  }
}
