import { Component, Input } from '@angular/core';
import { Checkbox } from '../../controlType';

let CEG_CHECKBOX_ID = 0;

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
})
export class CheckboxComponent {
  @Input() checkbox: Checkbox;

  get checkboxId() {
    return `ceg-checkbox-${CEG_CHECKBOX_ID++}`;
  }
}
