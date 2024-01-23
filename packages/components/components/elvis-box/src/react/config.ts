import { ComponentConfig } from '@elvia/elvis-toolbox';

export const config: ComponentConfig = {
  name: 'Box',
  attributes: [
    { name: 'content', type: 'string' },
    { name: 'heading', type: 'string' },
    { name: 'isColored', type: 'boolean' },
    { name: 'className', type: 'string' },
    { name: 'inlineStyle', type: 'object' },
  ],
};
