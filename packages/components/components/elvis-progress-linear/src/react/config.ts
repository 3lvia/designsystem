import { ComponentConfig } from '@elvia/elvis-toolbox';

export const config: ComponentConfig = {
  name: 'ProgressLinear',
  attributes: [
    { name: 'value', type: 'number' },
    { name: 'isIndeterminate', type: 'boolean' },
    { name: 'isError', type: 'boolean' },
    { name: 'ariaValueText', type: 'string' },
    { name: 'size', type: 'string' },
    { name: 'className', type: 'string' },
    { name: 'inlineStyle', type: 'object' },
  ],
};
