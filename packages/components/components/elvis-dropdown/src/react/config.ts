import { ComponentConfig } from '@elvia/elvis-toolbox';

export const config: ComponentConfig = {
  name: 'Dropdown',
  attributes: [
    { name: 'items', type: 'object' },
    { name: 'isFullWidth', type: 'boolean' },
    { name: 'isRequired', type: 'boolean' },
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
    { name: 'ariaLabel', type: 'string' },
    { name: 'hasSelectAllOption', type: 'boolean' },
    { name: 'selectAllOption', type: 'string' },
    { name: 'noOptionsMessage', type: 'string' },
    { name: 'hasLoadMoreItemsButton', type: 'boolean' },
    { name: 'isLoadingMoreItems', type: 'boolean' },
    { name: 'labelTransformation', type: 'function' },
    { name: 'className', type: 'string' },
    { name: 'inlineStyle', type: 'object' },
  ],
};
