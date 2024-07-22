import { ComponentConfig } from '@elvia/elvis-toolbox';

export const config: ComponentConfig = {
  name: 'DatepickerRange',
  attributes: [
    { name: 'value', type: 'object' },
    { name: 'labelOptions', type: 'object' },
    { name: 'size', type: 'string' },
    { name: 'isDisabled', type: 'boolean' },
    { name: 'isFullWidth', type: 'boolean' },
    { name: 'isRequired', type: 'object' },
    { name: 'isVertical', type: 'boolean' },
    { name: 'hasTimepickers', type: 'boolean' },
    { name: 'timepickerInterval', type: 'string' },
    { name: 'hasSelectDateOnOpen', type: 'boolean' },
    { name: 'errorOptions', type: 'object' },
    { name: 'hasAutoOpenEndDatepicker', type: 'boolean' },
    { name: 'minDate', type: 'Date' },
    { name: 'maxDate', type: 'Date' },
    { name: 'disableDates', type: 'function' },
    { name: 'className', type: 'string' },
    { name: 'inlineStyle', type: 'object' },
  ],
};
