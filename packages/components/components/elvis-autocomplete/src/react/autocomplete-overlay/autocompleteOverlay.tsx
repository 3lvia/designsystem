import { FormFieldSizes, Overlay } from '@elvia/elvis-toolbox';
import React from 'react';
import { AutocompleteItem } from '../elvia-autocomplete.types';
import { AutocompletePopup } from './styledAutocompleteOverlay';
import { AutocompletePopupItem } from '../autocomplete-item/autocompleteItem';

interface AutocompleteOverlayProps {
  fadeOut: boolean;
  filteredItems: AutocompleteItem[] | undefined;
  onClose: () => void;
  onItemSelect: (item: AutocompleteItem) => void;
  setFadeOut: (fadeOut: boolean) => void;
  size: FormFieldSizes;
}

export const AutocompleteOverlay = React.forwardRef<HTMLDivElement, AutocompleteOverlayProps>(
  ({ filteredItems = [], size, fadeOut, setFadeOut, onClose, onItemSelect }, ref) => {
    return (
      <Overlay ref={ref} startFade={fadeOut} hasBackdrop={false} onClose={onClose}>
        <AutocompletePopup>
          {filteredItems.map((item) => (
            <AutocompletePopupItem
              key={item.value}
              item={item}
              size={size}
              onItemSelect={onItemSelect}
              setFadeOut={setFadeOut}
            />
          ))}
        </AutocompletePopup>
      </Overlay>
    );
  },
);

AutocompleteOverlay.displayName = 'AutocompleteOverlayComponent';
