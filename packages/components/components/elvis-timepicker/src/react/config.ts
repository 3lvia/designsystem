import { ComponentConfig } from '@elvia/elvis-toolbox';

export const config: ComponentConfig = {
  name: 'Timepicker',
  attributes: [
    { name: 'value', type: 'Date' },
    { name: 'minTime', type: 'Date' },
    { name: 'maxTime', type: 'Date' },
    { name: 'minuteInterval', type: 'string' },
    { name: 'hasSecondPicker', type: 'boolean' },
    { name: 'isDisabled', type: 'boolean' },
    { name: 'isFullWidth', type: 'boolean' },
    { name: 'size', type: 'string' },
    { name: 'isRequired', type: 'boolean' },
    { name: 'isOpen', type: 'boolean' },
    { name: 'errorOptions', type: 'object' },
    { name: 'selectNowOnOpen', type: 'boolean' },
    { name: 'label', type: 'string' },
    { name: 'className', type: 'string' },
    { name: 'inlineStyle', type: 'object' },
  ],
};
