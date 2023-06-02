import { Component } from '@angular/core';
import { CegControlManager, ComponentExample } from 'src/app/shared/component-documentation/ceg';
import { DatepickerProps } from '@elvia/elvis-datepicker/react';

@Component({
  selector: 'app-datepicker-ceg',
  templateUrl: './datepicker-ceg.component.html',
  providers: [{ provide: ComponentExample, useExisting: DatepickerCegComponent }],
})
export class DatepickerCegComponent implements ComponentExample {
  elementName = 'datepicker';
  cegContent = new CegControlManager<DatepickerProps>([
    {
      controls: {
        size: {
          type: 'radioGroup',
          value: 'medium',
          radios: [
            { label: 'Small', value: 'small' },
            { label: 'Medium', value: 'medium' },
          ],
          group: 'Size',
        },
        isRequired: {
          label: 'Required',
          type: 'checkbox',
          value: false,
          group: 'Options',
        },
        isFullWidth: {
          label: 'Full Width',
          type: 'checkbox',
          value: false,
          group: 'Options',
        },
        hasSelectDateOnOpen: {
          label: 'Select Today On Open',
          type: 'checkbox',
          value: true,
          group: 'Options',
        },
        isDisabled: {
          label: 'Disabled',
          type: 'checkbox',
          value: false,
          group: 'State',
        },
      },
      groupOrder: ['Size', 'Options', 'State'],
    },
  ]);

  handleOnChange(value: Date): void {
    console.log('Selected date: ', value);
  }
}
