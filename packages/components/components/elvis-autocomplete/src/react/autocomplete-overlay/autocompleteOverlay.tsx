import { FormFieldSizes, Overlay } from '@elvia/elvis-toolbox';
import React, { forwardRef } from 'react';
import { AutocompleteItem } from '../elvia-autocomplete.types';
import { AutocompletePopup } from './styledAutocompleteOverlay';
import { AutocompletePopupItem } from '../autocomplete-item/autocompleteItem';

interface AutocompleteOverlayProps {
  fadeOut: boolean;
  filteredItems: AutocompleteItem[];
  focusedItem: AutocompleteItem | undefined;
  id?: string;
  onClose: () => void;
  onItemSelect: (item: AutocompleteItem | undefined) => void;
  popupId?: string;
  setFadeOut: (fadeOut: boolean) => void;
  setFocusedItem: (item: AutocompleteItem | undefined) => void;
  size: FormFieldSizes;
}

export const AutocompleteOverlay = forwardRef<HTMLDivElement, AutocompleteOverlayProps>(
  (
    {
      fadeOut,
      filteredItems,
      focusedItem,
      id,
      onClose,
      onItemSelect,
      popupId,
      setFadeOut,
      setFocusedItem,
      size,
    },
    ref,
  ) => {
    return (
      <Overlay ref={ref} startFade={fadeOut} hasBackdrop={false} onClose={onClose}>
        <AutocompletePopup aria-labelledby={id} id={popupId} onMouseLeave={() => setFocusedItem(undefined)}>
          {filteredItems.map((item) => (
            <AutocompletePopupItem
              item={item}
              key={item.value}
              onItemSelect={onItemSelect}
              setFadeOut={setFadeOut}
              setFocusedItem={setFocusedItem}
              size={size}
              isFocused={item.value === focusedItem?.value}
            />
          ))}
        </AutocompletePopup>
      </Overlay>
    );
  },
);

AutocompleteOverlay.displayName = 'AutocompleteOverlayComponent';
