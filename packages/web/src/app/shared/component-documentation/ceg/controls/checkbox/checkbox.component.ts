import { NgClass } from '@angular/common';
import { Component, EventEmitter, Output, input } from '@angular/core';

import { Checkbox } from '../../controlType';

let CEG_CHECKBOX_ID = 0;

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  imports: [NgClass],
})
export class CheckboxComponent {
  readonly checkbox = input.required<Checkbox>();
  readonly isChild = input(false);
  readonly disabled = input(false);
  @Output() toggle = new EventEmitter<Checkbox['value']>();
  readonly checkboxId = `ceg-checkbox-${CEG_CHECKBOX_ID++}`;

  onChange(isChecked: Checkbox['value']): void {
    this.toggle.emit(isChecked);
  }
}
