import { ComponentConfig } from '@elvia/elvis-toolbox';

export const config: ComponentConfig = {
  name: 'Icon',
  attributes: [
    { name: 'name', type: 'string' },
    { name: 'color', type: 'string' },
    { name: 'size', type: 'string' },
    { name: 'customSize', type: 'string' },
  ],
};
