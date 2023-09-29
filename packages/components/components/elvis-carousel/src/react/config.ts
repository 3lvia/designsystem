import { ComponentConfig } from '@elvia/elvis-toolbox';

export const config: ComponentConfig = {
  name: 'Carousel',
  attributes: [
    { name: 'items', type: 'string' },
    { name: 'type', type: 'string' },
    { name: 'hasConfirmationCheckmark', type: 'boolean' },
    { name: 'hasAnimation', type: 'boolean' },
    { name: 'value', type: 'number' },
    { name: 'className', type: 'string' },
    { name: 'inlineStyle', type: 'object' },
  ],
};
