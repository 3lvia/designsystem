import { Component } from '@angular/core';
import { CegControlManager, ComponentExample } from 'src/app/shared/component-documentation/ceg';
import { TimepickerProps } from '@elvia/elvis-timepicker/react';

@Component({
  selector: 'app-timepicker-ceg',
  templateUrl: './timepicker-ceg.component.html',
  providers: [{ provide: ComponentExample, useExisting: TimepickerCegComponent }],
})
export class TimepickerCegComponent implements ComponentExample {
  elementName = 'timepicker';
  cegContent = new CegControlManager<TimepickerProps>([
    {
      controls: {
        isCompact: { type: 'checkbox', label: 'Compact', group: 'Size' },
        minuteInterval: {
          type: 'radioGroup',
          value: '10',
          radios: [
            { label: '1', value: '1' },
            { label: '5', value: '5' },
            { label: '10', value: '10' },
            { label: '15', value: '15' },
            { label: '60', value: '60' },
          ],
          group: 'Minute interval',
        },
        isRequired: { type: 'checkbox', label: 'Required', group: 'Options' },
        isFullWidth: { type: 'checkbox', label: 'Full width', group: 'Options' },
        selectNowOnOpen: { type: 'checkbox', label: 'Select Now on Open', group: 'Options', value: true },
        isDisabled: { type: 'checkbox', label: 'Disabled', group: 'State' },
      },
      groupOrder: ['Size', 'Minute interval', 'Options', 'State'],
    },
  ]);

  handleOnChange(time: Date): void {
    console.log('Selected time: ', time);
  }
}
