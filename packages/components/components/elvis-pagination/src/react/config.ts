import { ComponentConfig } from '@elvia/elvis-toolbox';

export const config: ComponentConfig = {
  name: 'Pagination',
  attributes: [
    { name: 'alignment', type: 'string' },
    { name: 'ariaLabel', type: 'string' },
    { name: 'dropdownItems', type: 'object' },
    { name: 'dropdownMenuPosition', type: 'string' },
    { name: 'dropdownSelectedItemIndex', type: 'number' },
    { name: 'labelOptions', type: 'object' },
    { name: 'lastNumberLimit', type: 'number' },
    { name: 'numberOfElements', type: 'number' },
    { name: 'value', type: 'object' },
    { name: 'className', type: 'string' },
    { name: 'inlineStyle', type: 'object' },
  ],
};
