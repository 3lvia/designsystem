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
    // Deprecated attributes
    {
      name: 'disabled',
      type: 'boolean',
      deprecatedDetails: { version: '2.0.0', newProp: 'isDisabled', isDirectReplacement: true },
    },
    {
      name: 'selected',
      type: 'boolean',
      deprecatedDetails: { version: '2.0.0', newProp: 'isSelected', isDirectReplacement: true },
    },
    {
      name: 'valueOnChange',
      type: 'event',
      deprecatedDetails: { version: '2.0.0', newProp: 'isSelectedOnChange', isCallbackFunction: true },
    },
  ],
};
