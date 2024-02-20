import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SlotToggle, Switch } from '../../controlType';

@Component({
    selector: 'app-switch',
    templateUrl: './switch.component.html',
    standalone: true,
})
export class SwitchComponent {
  @Input() switch: Switch | SlotToggle;
  @Output() toggle = new EventEmitter<boolean>();

  onChange(isChecked: boolean): void {
    this.toggle.emit(isChecked);
  }
}
