import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ComponentExample } from 'src/app/shared/component-documentation/ceg/componentExample';
import { ControlConfiguration } from 'src/app/shared/component-documentation/ceg/controlType';

@Component({
  selector: 'app-timepicker-ceg',
  templateUrl: './timepicker-ceg.component.html',
  styleUrls: ['./timepicker-ceg.component.scss'],
  providers: [{ provide: ComponentExample, useExisting: TimepickerCegComponent }],
})
export class TimepickerCegComponent implements ComponentExample {
  controls = new BehaviorSubject<ControlConfiguration[]>([
    {
      name: 'Default',
      controls: {
        minuteInterval: {
          type: 'radioGroup',
          value: 10,
          radios: [
            { label: '1', value: 1 },
            { label: '5', value: 5 },
            { label: '10', value: 10 },
            { label: '15', value: 15 },
            { label: '60', value: 60 },
          ],
          group: 'Minute interval',
        },
        isDisabled: { type: 'checkbox', label: 'Disabled', group: 'State' },
        isFullWidth: { type: 'checkbox', label: 'Full width', group: 'State' },
        isCompact: { type: 'checkbox', label: 'Compact', group: 'Size' },
        isRequired: { type: 'checkbox', label: 'Required', group: 'Options' },
        selectNowOnOpen: { type: 'checkbox', label: 'Select Now on Open', group: 'Options' },
      },
      groupOrder: ['Minute interval', 'State', 'Size', 'Options'],
    },
  ]);

  customText = [];
  elementName = 'timepicker';

  handleOnChange(time: Date): void {
    console.log('Selected time: ', time);
  }
}
