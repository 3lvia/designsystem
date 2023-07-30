import { ComponentConfig } from '@elvia/elvis-toolbox';

export const config: ComponentConfig = {
  name: 'Autocomplete',
  attributes: [
    { name: 'label', type: 'string' },
    { name: 'items', type: 'object' },
    { name: 'size', type: 'string' },
    { name: 'value', type: 'string' },
    { name: 'placeholder', type: 'string' },
    { name: 'isDisabled', type: 'boolean' },
    { name: 'valueOnChange', type: 'function' },
  ],
};
