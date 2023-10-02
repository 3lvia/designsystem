import { ComponentConfig } from '@elvia/elvis-toolbox';

export const config: ComponentConfig = {
  name: 'Dropdown',
  attributes: [
    { name: 'items', type: 'object' },
    { name: 'isFullWidth', type: 'boolean' },
    { name: 'isSearchable', type: 'boolean' },
    { name: 'allOptionsSelectedLabel', type: 'string' },
    { name: 'errorOptions', type: 'object' },
    { name: 'label', type: 'string' },
    { name: 'menuPosition', type: 'string' },
    { name: 'placeholder', type: 'string' },
    { name: 'placeholderIcon', type: 'string' },
    { name: 'value', type: 'string' },
    { name: 'size', type: 'string' },
    { name: 'isDisabled', type: 'boolean' },
    { name: 'isMulti', type: 'boolean' },
    { name: 'hasSelectAllOption', type: 'boolean' },
    { name: 'selectAllOption', type: 'string' },
    { name: 'noOptionsMessage', type: 'string' },
    { name: 'hasLoadMoreItemsButton', type: 'boolean' },
    { name: 'isLoadingMoreItems', type: 'boolean' },
    { name: 'className', type: 'string' },
    { name: 'inlineStyle', type: 'object' },
    {
      name: 'isCompact',
      type: 'boolean',
      deprecatedDetails: { version: '7.0.0', newProp: 'size', isDirectReplacement: false },
    },
  ],
};
