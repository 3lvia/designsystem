import { ComponentConfig } from '@elvia/elvis-toolbox';

export const config: ComponentConfig = {
  name: 'Spotlight',
  attributes: [
    { name: 'position', type: 'object' },
    { name: 'shape', type: 'string' },
    { name: 'radius', type: 'number' },
    { name: 'rectangleProps', type: 'object' },
    { name: 'hasLockBodyScroll', type: 'boolean' },
    { name: 'transitionDuration', type: 'string' },
    { name: 'className', type: 'string' },
    { name: 'inlineStyle', type: 'object' },
  ],
};
