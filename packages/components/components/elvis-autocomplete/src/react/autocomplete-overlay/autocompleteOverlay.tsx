import { ThemeName } from '@elvia/elvis-colors';
import { FormFieldSizes, Overlay } from '@elvia/elvis-toolbox';
import React, { useState } from 'react';
import { AutocompleteItem } from '../elvia-autocomplete.types';
import { AutocompletePopupItem, AutocompletePopup } from '../styledComponents';

interface AutocompleteOverlayProps {
  filteredItems: AutocompleteItem[];
  inputIsKeyboard?: boolean;
  size: FormFieldSizes;
  onClose: () => void;
  value: string | null;
  onItemSelect?: (value: string) => void;
  focusedItem?: any;
  setFocusedItem?: (item?: any) => void;
  currentTheme?: ThemeName;
}

export const AutocompleteOverlay = React.forwardRef<HTMLDivElement, AutocompleteOverlayProps>(
  ({ filteredItems = [], onClose, value }, ref) => {
    const [fadeOut, setFadeOut] = useState(false);

    return (
      <Overlay
        ref={ref}
        startFade={fadeOut}
        onClose={() => {
          onClose();
          setFadeOut(true);
        }}
      >
        <AutocompletePopup>
          <span>{value}</span>
          {filteredItems.map((item) => (
            <AutocompletePopupItem key={item.value}>{item.label}</AutocompletePopupItem>
          ))}
        </AutocompletePopup>
      </Overlay>
    );
  },
);

AutocompleteOverlay.displayName = 'AutocompleteOverlayComponent';
