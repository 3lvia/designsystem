import { ComponentConfig } from '@elvia/elvis-toolbox';

export const config: ComponentConfig = {
  name: 'Pagination',
  attributes: [
    { name: 'value', type: 'object' },
    { name: 'numberOfElements', type: 'number' },
    { name: 'lastNumberLimit', type: 'number' },
    { name: 'dropdownItems', type: 'object' },
    { name: 'className', type: 'string' },
    { name: 'inlineStyle', type: 'object' },
    { name: 'labelOptions', type: 'object' },
    { name: 'alignment', type: 'string' },
    { name: 'dropdownMenuPosition', type: 'string' },
    { name: 'dropdownSelectedItemIndex', type: 'number' },
  ],
};
