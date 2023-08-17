import { ComponentConfig } from '@elvia/elvis-toolbox';

export const config: ComponentConfig = {
  name: 'Autocomplete',
  attributes: [
    { name: 'ariaLabel', type: 'string' },
    { name: 'className', type: 'string' },
    { name: 'errorOptions', type: 'object' },
    { name: 'hasBuiltInFilter', type: 'boolean' },
    { name: 'hasOptionalText', type: 'boolean' },
    { name: 'inlineStyle', type: 'object' },
    { name: 'isDisabled', type: 'boolean' },
    { name: 'isFullWidth', type: 'boolean' },
    { name: 'isRequired', type: 'boolean' },
    { name: 'items', type: 'object' },
    { name: 'label', type: 'string' },
    { name: 'menuPosition', type: 'string' },
    { name: 'placeholder', type: 'string' },
    { name: 'size', type: 'string' },
    { name: 'value', type: 'string' },
    { name: 'valueOnChange', type: 'function' },
  ],
};
