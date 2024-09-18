import { ComponentConfig } from '@elvia/elvis-toolbox';

export const config: ComponentConfig = {
  name: 'Badge',
  attributes: [
    { name: 'badgeColor', type: 'string' },
    { name: 'content', type: 'string' },
    { name: 'count', type: 'number' },
    { name: 'isHidden', type: 'boolean' },
  ],
};
