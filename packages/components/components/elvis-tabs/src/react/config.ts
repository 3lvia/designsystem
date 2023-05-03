import { ComponentConfig } from '@elvia/elvis-toolbox';

export const config: ComponentConfig = {
  name: 'Tabs',
  attributes: [
    { name: 'items', type: 'object' },
    { name: 'value', type: 'number' },
    { name: 'ariaLabel', type: 'string' },
    { name: 'hasManualActivation', type: 'boolean' },
    { name: 'tabIdPrefix', type: 'string' },
    { name: 'className', type: 'string' },
    { name: 'inlineStyle', type: 'object' },
    // Deprecated attributes
    {
      name: 'isInverted',
      type: 'boolean',
      deprecatedDetails: {
        version: '3.0.0',
        explanation: 'Removed the prop in favour of proper dark theme support.',
      },
    },
  ],
};
