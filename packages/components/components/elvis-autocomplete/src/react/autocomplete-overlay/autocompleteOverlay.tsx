import { FormFieldSizes, Overlay } from '@elvia/elvis-toolbox';
import React, { forwardRef } from 'react';

import { AutocompletePopupItem } from '../autocomplete-item/autocompleteItem';
import { AutocompleteItem } from '../elvia-autocomplete.types';
import { AutocompletePopup, NoItemsMessage } from './styledAutocompleteOverlay';

interface AutocompleteOverlayProps {
  fadeOut: boolean;
  filteredItems: AutocompleteItem[];
  focusedItem: AutocompleteItem | undefined;
  id?: string;
  onClose: () => void;
  onSelectItem: (item: AutocompleteItem | undefined) => void;
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
      onSelectItem,
      popupId,
      setFadeOut,
      setFocusedItem,
      size,
    },
    ref,
  ) => {
    return (
      <Overlay ref={ref} startFade={fadeOut} hasBackdrop={false} onClose={onClose}>
        <AutocompletePopup
          $size={size}
          aria-labelledby={id}
          id={popupId}
          onMouseDown={(e) => e.preventDefault()}
          onMouseLeave={() => setFocusedItem(undefined)}
        >
          {!filteredItems.length && <NoItemsMessage $size={size}>{'Ingen forslag.'}</NoItemsMessage>}
          {filteredItems.map((item) => (
            <AutocompletePopupItem
              item={item}
              key={item.value}
              onSelectItem={onSelectItem}
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
