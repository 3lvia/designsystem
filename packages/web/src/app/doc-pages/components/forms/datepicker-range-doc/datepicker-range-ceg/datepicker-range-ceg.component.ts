import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { BaseDatepickerRangeProps } from '@elvia/elvis-datepicker-range/react';

import { CegControlManager, ComponentExample } from 'src/app/shared/component-documentation/ceg';

/**
 * The `isRequired` prop is of type `BothDatepicker<boolean> | boolean` which confuses the CEG,
 * so we override it here to be only a `boolean`.
 */
type DatepickerRangePropsWithFixedRequired = Omit<BaseDatepickerRangeProps, 'isRequired'> & {
  isRequired?: boolean;
};

@Component({
  selector: 'app-datepicker-range-ceg',
  templateUrl: './datepicker-range-ceg.component.html',
  providers: [{ provide: ComponentExample, useExisting: DatepickerRangeCegComponent }],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DatepickerRangeCegComponent implements ComponentExample {
  elementName = 'datepicker-range';
  cegContent = new CegControlManager<DatepickerRangePropsWithFixedRequired>([
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
          value: false,
          group: 'Options',
        },
        isDisabled: {
          label: 'Disabled',
          type: 'checkbox',
          value: false,
          group: 'State',
        },
        hasAutoOpenEndDatepicker: {
          label: 'Auto Open End Datepicker',
          type: 'checkbox',
          value: false,
          group: 'Options',
        },
        isVertical: {
          label: 'Vertical Stacking',
          type: 'checkbox',
          value: false,
          group: 'Options',
        },
        hasTimepickers: {
          label: 'Has Timepickers',
          type: 'checkbox',
          value: false,
          group: 'Options',
        },
      },
      groupOrder: ['Size', 'Options', 'State'],
      staticProps: {
        valueOnChange: () => '',
      },
    },
  ]);

  handleOnChange(value: number): void {
    console.log('New value:', value);
  }
}
