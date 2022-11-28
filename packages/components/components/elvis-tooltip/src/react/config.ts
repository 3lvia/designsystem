import { ComponentConfig } from '@elvia/elvis-toolbox';

export const config: ComponentConfig = {
  name: 'Tooltip',
  attributes: [
    { name: 'trigger', type: 'string' },
    { name: 'display', type: 'string' },
    { name: 'isDisabled', type: 'boolean' },
    { name: 'position', type: 'string' },
    { name: 'showDelay', type: 'number' },
    { name: 'content', type: 'string' },
    { name: 'className', type: 'string' },
    { name: 'inlineStyle', type: 'object' },
  ],
};
