import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Switch } from '../../controlType';

@Component({
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss'],
})
export class SwitchComponent {
  @Input() switch: Switch;
  @Output() toggle = new EventEmitter<boolean>();

  onChange(isChecked: boolean): void {
    console.log(isChecked);
    this.toggle.emit(isChecked);
  }
}
