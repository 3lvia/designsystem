import { ComponentConfig } from '@elvia/elvis-toolbox';

export const config: ComponentConfig = {
  name: 'Autocomplete',
  attributes: [
    { name: 'isDisabled', type: 'boolean' },
    { name: 'isRequired', type: 'boolean' },
    { name: 'items', type: 'object' },
    { name: 'label', type: 'string' },
    { name: 'placeholder', type: 'string' },
    { name: 'size', type: 'string' },
    { name: 'value', type: 'string' },
    { name: 'valueOnChange', type: 'function' },
  ],
};
