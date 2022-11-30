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
    // Deprecated attributes
    {
      name: 'dropdownMenuPos',
      type: 'string',
      deprecatedDetails: { version: '3.0.0', newProp: 'dropdownMenuPosition', isDirectReplacement: true },
    },
    {
      name: 'selectedDropdownItemIndex',
      type: 'number',
      deprecatedDetails: {
        version: '3.0.0',
        newProp: 'dropdownSelectedItemIndex',
        isDirectReplacement: true,
      },
    },
    {
      name: 'isRightAligned',
      type: 'boolean',
      deprecatedDetails: { version: '3.0.0', newProp: 'alignment' },
    },
    {
      name: 'labelDisplaying',
      type: 'string',
      deprecatedDetails: { version: '3.0.0', newProp: 'labelOptions.displaying' },
    },
    { name: 'label', type: 'string', deprecatedDetails: { version: '3.0.0', newProp: 'labelOptions.label' } },
    { name: 'labelOf', type: 'string', deprecatedDetails: { version: '3.0.0', newProp: 'labelOptions.of' } },
    {
      name: 'selectedDropdownItemIndexOnChange',
      type: 'event',
      deprecatedDetails: {
        version: '3.0.0',
        newProp: 'dropdownSelectedItemIndexOnChange',
        isCallbackFunction: true,
        isDirectReplacement: true,
      },
    },
  ],
};
