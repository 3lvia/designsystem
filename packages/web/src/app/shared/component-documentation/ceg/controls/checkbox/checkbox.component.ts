import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Checkbox, ChildCheckbox } from '../../controlType';

let CEG_CHECKBOX_ID = 0;

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
})
export class CheckboxComponent {
  @Input() checkbox: Checkbox | ChildCheckbox;
  @Input() isChild = false;
  @Input() disabled = false;
  @Output() toggle = new EventEmitter<Checkbox['value']>();
  readonly checkboxId = `ceg-checkbox-${CEG_CHECKBOX_ID++}`;

  onChange(isChecked: Checkbox['value']): void {
    this.toggle.emit(isChecked);
  }
}
