import { ComponentConfig } from '@elvia/elvis-toolbox';

export const config: ComponentConfig = {
  name: 'Datepicker',
  attributes: [
    { name: 'value', type: 'Date' },
    { name: 'label', type: 'string' },
    { name: 'size', type: 'string' },
    { name: 'isDisabled', type: 'boolean' },
    { name: 'isFullWidth', type: 'boolean' },
    { name: 'isRequired', type: 'boolean' },
    { name: 'hasSelectDateOnOpen', type: 'boolean' },
    { name: 'errorOptions', type: 'object' },
    { name: 'minDate', type: 'Date' },
    { name: 'maxDate', type: 'Date' },
    { name: 'placeholder', type: 'string' },
    { name: 'isOpen', type: 'boolean' },
    { name: 'hasOptionalText', type: 'boolean' },
    { name: 'resetTime', type: 'boolean' },
    { name: 'clearButtonText', type: 'string' },
    { name: 'disableDate', type: 'function' },
    { name: 'className', type: 'string' },
    { name: 'inlineStyle', type: 'object' },
    {
      name: 'isCompact',
      type: 'boolean',
      deprecatedDetails: { version: '7.0.0', newProp: 'size', isDirectReplacement: false },
    },
  ],
};
