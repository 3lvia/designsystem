import { ComponentConfig } from '@elvia/elvis-toolbox';

export const config: ComponentConfig = {
  name: 'Toast',
  attributes: [
    { name: 'className', type: 'string' },
    { name: 'inlineStyle', type: 'object' },
  ],
};
