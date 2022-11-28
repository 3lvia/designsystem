import { ComponentConfig } from '@elvia/elvis-toolbox';

export const config: ComponentConfig = {
  name: 'Timepicker',
  attributes: [
    { name: 'value', type: 'Date' },
    { name: 'minuteInterval', type: 'string' },
    { name: 'isDisabled', type: 'boolean' },
    { name: 'isCompact', type: 'boolean' },
    { name: 'isRequired', type: 'boolean' },
    { name: 'errorOptions', type: 'object' },
    { name: 'selectNowOnOpen', type: 'boolean' },
    { name: 'label', type: 'string' },
    { name: 'className', type: 'string' },
    { name: 'inlineStyle', type: 'object' },
  ],
};
