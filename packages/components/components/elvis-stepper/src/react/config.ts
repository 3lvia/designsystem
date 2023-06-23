import { ComponentConfig } from '@elvia/elvis-toolbox';

export const config: ComponentConfig = {
  name: 'Stepper',
  attributes: [
    { name: 'type', type: 'string' },
    { name: 'steps', type: 'object' },
    { name: 'typography', type: 'string' },
    { name: 'className', type: 'string' },
    { name: 'isForced', type: 'boolean' },
    { name: 'inlineStyle', type: 'object' },
  ],
};
