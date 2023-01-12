import { ComponentConfig } from '@elvia/elvis-toolbox';

export const config: ComponentConfig = {
  name: 'AccordionGroup',
  attributes: [
    { name: 'items', type: 'object' },
    { name: 'labels', type: 'object' },
    { name: 'className', type: 'string' },
    { name: 'inlineStyle', type: 'object' },
  ],
};
