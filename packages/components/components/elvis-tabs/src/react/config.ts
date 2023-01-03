import { ComponentConfig } from '@elvia/elvis-toolbox';

export const config: ComponentConfig = {
  name: 'Tabs',
  attributes: [
    { name: 'items', type: 'object' },
    { name: 'value', type: 'number' },
    { name: 'ariaLabel', type: 'string' },
    { name: 'isInverted', type: 'boolean' },
    { name: 'hasManualActivation', type: 'boolean' },
    { name: 'tabIdPrefix', type: 'string' },
    { name: 'className', type: 'string' },
    { name: 'inlineStyle', type: 'object' },
  ],
};
