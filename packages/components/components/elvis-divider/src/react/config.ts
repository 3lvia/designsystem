import { ComponentConfig } from '@elvia/elvis-toolbox';

export const config: ComponentConfig = {
  name: 'Divider',
  attributes: [
    { name: 'type', type: 'string' },
    { name: 'title', type: 'string' },
    { name: 'typography', type: 'string' },
    { name: 'isInverted', type: 'boolean' },
    { name: 'orientation', type: 'string' },
    { name: 'className', type: 'string' },
    { name: 'inlineStyle', type: 'object' },
  ],
};
