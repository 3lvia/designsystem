import React from 'react';
import { AutocompleteItemStyles } from './styledAutocompleteItem';
import { AutocompleteItem } from '../elvia-autocomplete.types';
import { FormFieldSizes } from '@elvia/elvis-toolbox';

interface AutocompleteItemProps {
  item: AutocompleteItem;
  size: FormFieldSizes;
  onItemSelect: (item: AutocompleteItem) => void;
}

export const AutocompletePopupItem: React.FC<AutocompleteItemProps> = ({ item, size, onItemSelect }) => {
  return (
    <AutocompleteItemStyles $size={size} onClick={() => onItemSelect(item)}>
      {item.label}
    </AutocompleteItemStyles>
  );
};
