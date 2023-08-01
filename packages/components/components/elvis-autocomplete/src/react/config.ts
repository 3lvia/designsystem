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
    { name: 'useBuiltInFilter', type: 'boolean' },
    { name: 'value', type: 'string' },
    { name: 'valueOnChange', type: 'function' },
    { name: 'ariaLabel', type: 'string' },
    { name: 'hasOptionalText', type: 'boolean' },
    { name: 'isFullWidth', type: 'boolean' },
    { name: 'menuPosition', type: 'string' },
    { name: 'inlineStyle', type: 'object' },
    { name: 'className', type: 'string' },
  ],
};
