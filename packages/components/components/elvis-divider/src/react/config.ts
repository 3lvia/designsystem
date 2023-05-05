import { ComponentConfig } from '@elvia/elvis-toolbox';

export const config: ComponentConfig = {
  name: 'Divider',
  attributes: [
    { name: 'type', type: 'string' },
    { name: 'typography', type: 'string' },
    { name: 'heading', type: 'string' },
    { name: 'orientation', type: 'string' },
    { name: 'className', type: 'string' },
    { name: 'inlineStyle', type: 'object' },
    {
      name: 'isInverted',
      type: 'boolean',
      deprecatedDetails: { version: '2.0.0', explanation: 'Will be replaced be dark theme.' },
    },
    {
      name: 'title',
      type: 'string',
      deprecatedDetails: { version: '3.0.0', newProp: 'heading', isDirectReplacement: true },
    },
  ],
};
