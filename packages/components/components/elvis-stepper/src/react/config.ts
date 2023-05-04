import { ComponentConfig } from '@elvia/elvis-toolbox';

export const config: ComponentConfig = {
  name: 'Stepper',
  attributes: [
    { name: 'value', type: 'number' },
    { name: 'type', type: 'string' },
    { name: 'states', type: 'object' },
    { name: 'completeButtonText', type: 'string' },
    { name: 'className', type: 'string' },
    { name: 'inlineStyle', type: 'object' },
  ],
};
