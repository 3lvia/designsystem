import React from 'react';
import { AutocompleteItemStyles } from './styledAutocompleteItem';
import { AutocompleteItem } from '../elvia-autocomplete.types';
import { FormFieldSizes } from '@elvia/elvis-toolbox';

interface AutocompleteItemProps {
  item: AutocompleteItem;
  size: FormFieldSizes;
  onItemSelect: (item: AutocompleteItem) => void;
  setFadeOut: (fadeOut: boolean) => void;
}

export const AutocompletePopupItem: React.FC<AutocompleteItemProps> = ({
  item,
  size,
  onItemSelect,
  setFadeOut,
}) => {
  return (
    <AutocompleteItemStyles
      $size={size}
      onClick={() => {
        setFadeOut(true);
        onItemSelect(item);
      }}
    >
      {item.label}
    </AutocompleteItemStyles>
  );
};
