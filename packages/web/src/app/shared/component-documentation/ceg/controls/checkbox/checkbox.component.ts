import { Component, input, output } from '@angular/core';

import { Checkbox } from '../../controlType';

let CEG_CHECKBOX_ID = 0;

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
})
export class CheckboxComponent {
  readonly checkbox = input.required<Checkbox>();
  readonly isChild = input(false);
  readonly disabled = input(false);
  readonly toggleChange = output<Checkbox['value']>();
  readonly checkboxId = `ceg-checkbox-${CEG_CHECKBOX_ID++}`;

  onChange(isChecked: Checkbox['value']): void {
    this.toggleChange.emit(isChecked);
  }
}
