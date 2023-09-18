import { ComponentConfig } from '@elvia/elvis-toolbox';

export const config: ComponentConfig = {
  name: 'Chip',
  attributes: [
    { name: 'ariaLabel', type: 'string' },
    { name: 'color', type: 'string' },
    { name: 'isDisabled', type: 'boolean' },
    { name: 'type', type: 'string' },
    { name: 'isLoading', type: 'boolean' },
    { name: 'isSelected', type: 'boolean' },
    { name: 'value', type: 'string' },
    { name: 'className', type: 'string' },
    { name: 'inlineStyle', type: 'object' },
  ],
};
