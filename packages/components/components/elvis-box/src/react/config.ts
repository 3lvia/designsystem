import { ComponentConfig } from '@elvia/elvis-toolbox';

export const config: ComponentConfig = {
  name: 'Box',
  attributes: [
    { name: 'content', type: 'string' },
    {
      name: 'title',
      type: 'string',
      deprecatedDetails: { version: '1.6.3', newProp: 'heading', isDirectReplacement: true },
    },
    { name: 'heading', type: 'string' },
    { name: 'hasBorder', type: 'boolean' },
    { name: 'isColored', type: 'boolean' },
    { name: 'className', type: 'string' },
    { name: 'inlineStyle', type: 'object' },
  ],
};
