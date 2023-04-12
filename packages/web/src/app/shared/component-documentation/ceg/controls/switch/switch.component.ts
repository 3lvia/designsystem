import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SlotToggle, Switch } from '../../controlType';

@Component({
  selector: 'app-switch',
  templateUrl: './switch.component.html',
})
export class SwitchComponent {
  @Input() switch: Switch | SlotToggle;
  @Output() toggle = new EventEmitter<Switch['value']>();

  onChange(isChecked: Switch['value']): void {
    this.toggle.emit(isChecked);
  }
}
