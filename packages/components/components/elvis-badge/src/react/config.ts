import { ComponentConfig } from '@elvia/elvis-toolbox';

export const config: ComponentConfig = {
  name: 'Badge',
  attributes: [
    { name: 'badgeColor', type: 'string' },
    { name: 'count', type: 'number' },
    { name: 'content', type: 'string' },
  ],
};
