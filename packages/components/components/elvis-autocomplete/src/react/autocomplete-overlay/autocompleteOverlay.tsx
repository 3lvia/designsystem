import { FormFieldSizes, Overlay } from '@elvia/elvis-toolbox';
import React, { useState } from 'react';
import { AutocompleteItem } from '../elvia-autocomplete.types';
import { AutocompletePopup } from './styledAutocompleteOverlay';
import { AutocompletePopupItem } from '../autocomplete-item/autocompleteItem';

interface AutocompleteOverlayProps {
  filteredItems: AutocompleteItem[] | undefined;
  size: FormFieldSizes;
  onClose: () => void;
  onItemSelect: (item: AutocompleteItem) => void;
  value: string | null;
}

export const AutocompleteOverlay = React.forwardRef<HTMLDivElement, AutocompleteOverlayProps>(
  ({ filteredItems = [], onClose, size, onItemSelect }, ref) => {
    const [fadeOut, setFadeOut] = useState(false);

    return (
      <Overlay ref={ref} startFade={fadeOut} hasBackdrop={false} onClose={onClose}>
        <AutocompletePopup>
          {filteredItems.map((item) => (
            <AutocompletePopupItem
              key={item.value}
              item={item}
              size={size}
              onItemSelect={() => {
                onItemSelect(item);
                setFadeOut(true);
              }}
            />
          ))}
        </AutocompletePopup>
      </Overlay>
    );
  },
);

AutocompleteOverlay.displayName = 'AutocompleteOverlayComponent';
