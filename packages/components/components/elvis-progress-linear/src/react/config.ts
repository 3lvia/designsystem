import { ComponentConfig } from '@elvia/elvis-toolbox';

export const config: ComponentConfig = {
  name: 'ProgressLinear',
  attributes: [
    { name: 'value', type: 'number' },
    { name: 'isIndeterminate', type: 'boolean' },
    { name: 'isError', type: 'boolean' },
    { name: 'ariaLabel', type: 'string' },
    { name: 'ariaRole', type: 'string' },
    { name: 'ariaValueText', type: 'string' },
    { name: 'componentId', type: 'string' },
    { name: 'size', type: 'string' },
    { name: 'transitionDuration', type: 'string' },
    { name: 'className', type: 'string' },
    { name: 'inlineStyle', type: 'object' },
  ],
};
