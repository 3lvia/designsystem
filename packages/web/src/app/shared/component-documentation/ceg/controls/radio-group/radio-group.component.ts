import { Component, input, output } from '@angular/core';

import { RadioGroup } from '../../controlType';

let CEG_RADIO_GROUP_ID = 0;

@Component({
  selector: 'app-radio-group',
  templateUrl: './radio-group.component.html',
})
export class RadioGroupComponent {
  readonly radioGroup = input.required<RadioGroup>();
  // eslint-disable-next-line @angular-eslint/no-output-native
  readonly toggle = output<RadioGroup['value']>();
  readonly radioGroupId = `ceg-checkbox-${CEG_RADIO_GROUP_ID++}`;

  onChange(newValue: RadioGroup['value']): void {
    this.toggle.emit(newValue);
  }
}
