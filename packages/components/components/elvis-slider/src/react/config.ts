import { ComponentConfig } from '@elvia/elvis-toolbox';

export const config: ComponentConfig = {
  name: 'Slider',
  attributes: [
    { name: 'ariaLabel', type: 'object' },
    { name: 'className', type: 'string' },
    { name: 'errorOptions', type: 'object' },
    { name: 'hasHints', type: 'boolean' },
    { name: 'hasInputField', type: 'boolean' },
    { name: 'inlineStyle', type: 'object' },
    { name: 'isDisabled', type: 'boolean' },
    { name: 'label', type: 'string' },
    { name: 'max', type: 'number' },
    { name: 'min', type: 'number' },
    { name: 'size', type: 'string' },
    { name: 'unit', type: 'string' },
    { name: 'type', type: 'string' },
    { name: 'value', type: 'number' },
  ],
};
