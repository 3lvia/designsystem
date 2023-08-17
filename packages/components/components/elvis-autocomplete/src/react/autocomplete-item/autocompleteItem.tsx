import React, { useRef } from 'react';
import { AutocompleteItemStyles } from './styledAutocompleteItem';
import { AutocompleteItem } from '../elvia-autocomplete.types';
import { FormFieldSizes, useIsOverflowing } from '@elvia/elvis-toolbox';
import { Tooltip } from '@elvia/elvis-tooltip/react';

interface AutocompleteItemProps {
  isFocused: boolean;
  item: AutocompleteItem;
  onSelectItem: (item: AutocompleteItem) => void;
  setFadeOut: (fadeOut: boolean) => void;
  setFocusedItem: (item: AutocompleteItem) => void;
  size: FormFieldSizes;
}

export const AutocompletePopupItem: React.FC<AutocompleteItemProps> = ({
  isFocused,
  item,
  onSelectItem,
  setFadeOut,
  setFocusedItem,
  size,
}) => {
  const elementRef = useRef<HTMLDivElement>(null);

  const {
    isOverflowing: { horizontal },
  } = useIsOverflowing(elementRef);

  const onMouseOver = (item: AutocompleteItem) => {
    setFocusedItem(item);
  };

  return (
    <Tooltip
      display="block"
      content={item.label}
      isDisabled={!horizontal}
      showDelay={500}
      trigger={
        <AutocompleteItemStyles
          $isFocused={isFocused}
          $size={size}
          aria-label={item.label}
          id={`ewc-autocomplete-item-${item.value}`}
          ref={elementRef}
          role="option"
          onClick={() => {
            setFadeOut(true);
            onSelectItem(item);
          }}
          onMouseEnter={() => {
            onMouseOver(item);
          }}
        >
          <span>{item.label}</span>
        </AutocompleteItemStyles>
      }
    />
  );
};
