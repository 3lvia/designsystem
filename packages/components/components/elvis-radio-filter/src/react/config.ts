import { ComponentConfig } from '@elvia/elvis-toolbox';

export const config: ComponentConfig = {
  name: 'RadioFilter',
  attributes: [
    { name: 'name', type: 'string' },
    { name: 'items', type: 'object' },
    { name: 'value', type: 'string' },
    { name: 'ariaLabel', type: 'string' },
    { name: 'groupAriaLabel', type: 'string' },
    { name: 'className', type: 'string' },
    { name: 'inlineStyle', type: 'object' },
  ],
};
