import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Switch } from '../../controlType';

@Component({
  selector: 'app-switch',
  templateUrl: './switch.component.html',
})
export class SwitchComponent {
  @Input() switch: Switch;
  @Output() toggle = new EventEmitter<Switch['value']>();

  onChange(isChecked: Switch['value']): void {
    this.toggle.emit(isChecked);
  }
}
