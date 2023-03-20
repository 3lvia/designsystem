import { Component, Input } from '@angular/core';
import { RadioGroup } from '../../controlType';

let CEG_RADIO_GROUP_ID = 0;

@Component({
  selector: 'app-radio-group',
  templateUrl: './radio-group.component.html',
  styleUrls: ['./radio-group.component.scss'],
})
export class RadioGroupComponent {
  @Input() radioGroup: RadioGroup;

  get radioGroupId() {
    return `ceg-radio-group-${CEG_RADIO_GROUP_ID++}`;
  }
}
