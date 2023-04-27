import { Component } from '@angular/core';
import { CegControlManager, ComponentExample } from 'src/app/shared/component-documentation/ceg';
import { DatepickerRangeProps } from '@elvia/elvis-datepicker-range/react';
/**
 * The `isRequired` prop is of type `BothDatepicker<boolean> | boolean` which confuses the CEG,
 * so we override it here to be only a `boolean`.
 */
type DatepickerRangePropsWithFixedRequired = Omit<DatepickerRangeProps, 'isRequired'> & {
  isRequired?: boolean;
};

@Component({
  selector: 'app-datepicker-range-ceg',
  templateUrl: './datepicker-range-ceg.component.html',
  providers: [{ provide: ComponentExample, useExisting: DatepickerRangeCegComponent }],
})
export class DatepickerRangeCegComponent implements ComponentExample {
  elementName = 'datepicker-range';
  cegContent = new CegControlManager<DatepickerRangePropsWithFixedRequired>([
    {
      controls: {
        isCompact: {
          label: 'Compact',
          type: 'checkbox',
          value: false,
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
    },
  ]);

  handleOnChange(value: Date): void {
    console.log('Selected dates: ', value);
  }
}
