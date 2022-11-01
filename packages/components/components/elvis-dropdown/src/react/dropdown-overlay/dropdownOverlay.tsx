import { useInputModeDetection } from '@elvia/elvis-toolbox';
import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { DropdownItem } from '../dropdown-item/dropdownItem';
import { DropdownItem as DropdownItemOptions } from '../elviaDropdown.types';
import { Backdrop, DropdownPopup, ItemList, NoItemsMessage } from './dropdownOverlayStyles';

interface DropdownOverlayProps {
  items: DropdownItemOptions[];
  isCompact: boolean;
  isMulti: boolean;
  onClose: () => void;
  noItemsText?: string;
  currentVal?: string;
  onItemSelect: (value: string) => void;
}

// TODO: Have a "focused" element
export const DropdownOverlay = React.forwardRef<HTMLDivElement, DropdownOverlayProps>(
  ({ items, isCompact, isMulti, onClose, noItemsText, currentVal, onItemSelect }, ref) => {
    const [focusedValue, setFocusedValue] = useState(items[0].value);
    const { isMouse: inputIsMouse } = useInputModeDetection();
    const listRef = useRef<HTMLDivElement>(null);
    const [fadeOut, setFadeOut] = useState(false);

    const onAnimationEnd = () => {
      if (fadeOut) {
        onClose();
      }
    };

    useEffect(() => {
      if (!inputIsMouse) {
        const buttonHeight = isCompact ? 40 : 48;
        const index = items.findIndex((item) => item.value === focusedValue);
        listRef.current?.scrollTo({
          top: buttonHeight * index - listRef.current?.offsetHeight / 2,
        });
      }
    }, [focusedValue]);

    return createPortal(
      <>
        <Backdrop onClick={() => setFadeOut(true)} data-testid="backdrop" />
        <DropdownPopup ref={ref} data-testid="popover" fadeOut={fadeOut} onAnimationEnd={onAnimationEnd}>
          <ItemList ref={listRef} isCompact={isCompact}>
            {!items?.length && <NoItemsMessage isCompact={isCompact}>{noItemsText}</NoItemsMessage>}
            {items.map((item) => (
              <DropdownItem
                key={item.value}
                item={item}
                focusedValue={focusedValue}
                setFocusedValue={setFocusedValue}
                isCompact={isCompact}
                isMulti={isMulti}
                inputIsMouse={inputIsMouse}
                currentVal={currentVal}
                onItemSelect={onItemSelect}
              />
            ))}
          </ItemList>
        </DropdownPopup>
      </>,
      document.body,
    );
  },
);

DropdownOverlay.displayName = 'DropdownOverlayComponent';
