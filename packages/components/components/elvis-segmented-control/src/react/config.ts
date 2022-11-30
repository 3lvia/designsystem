import { ComponentConfig } from '@elvia/elvis-toolbox';

export const config: ComponentConfig = {
  name: 'SegmentedControl',
  attributes: [
    { name: 'items', type: 'object' },
    { name: 'value', type: 'number' },
    { name: 'type', type: 'string' },
    { name: 'size', type: 'string' },
    { name: 'className', type: 'string' },
    { name: 'inlineStyle', type: 'object' },
  ],
};
