import React, { useEffect, useRef, useState } from 'react';

import { config } from './config';
import { DropdownProps, DropdownValue, GlobalDropdownProps } from './elviaDropdown.types';
import { warnDeprecatedProps, FormFieldLabel, useConnectedOverlay } from '@elvia/elvis-toolbox';
import { Icon } from '@elvia/elvis-icon/react';
import { DropdownInput } from './dropdown-input/dropdownInput';
import {
  Backdrop,
  DropdownContainer,
  DropdownInputContainer,
  IconRotator,
  Overlay,
  OverlayPositioner,
} from './styledComponents';
import { DropdownError } from './error/dropdownError';
import { createPortal } from 'react-dom';
import { useWebComponentState } from '@elvia/elvis-toolbox';
import { useInputModeDetection } from './useInputModeDetection';

interface DropdownItem {
  value: string;
  label: string;
}

interface SharedState {
  registerListItem: (item: DropdownItem) => void;
  setFocusedIndex: (newIndex: number) => void;
  onItemSelect: (value: string) => void;
  onClose: () => void;
  currentVal: DropdownValue | null;
  inputIsMouse: boolean;
  filter: string;
  focusedIndex: number;
  items: DropdownItem[];
}

export const DropdownContext = React.createContext<GlobalDropdownProps & SharedState>({
  registerListItem: () => undefined,
  setFocusedIndex: () => undefined,
  onItemSelect: () => undefined,
  onClose: () => undefined,
  currentVal: undefined,
  inputIsMouse: true,
  filter: '',
  focusedIndex: 0,
  items: [],
});

const Dropdown: React.FC<DropdownProps> = ({
  dropdownOverlay,
  value,
  isCompact = false,
  isDisabled = false,
  isFullWidth = false,
  isSearchable = false,
  allOptionsSelectedLabel = 'Alle',
  label = '',
  errorMessage = '',
  menuPosition = 'auto',
  placeholder = '',
  placeholderIcon,
  isMulti = false,
  hasSelectAllOption = false,
  selectAllOption,
  noOptionsMessage = 'Ingen tilgjengelige valg',
  valueOnChange,
  hasLoadMoreItemsButton,
  onLoadMoreItems,
  isLoadingMoreItems,
  className,
  inlineStyle,
  webcomponent,
}) => {
  // warnDeprecatedProps(config, arguments[0]);

  const [currentVal, setCurrentVal] = useWebComponentState(value, 'value', webcomponent, valueOnChange);
  const { isMouse } = useInputModeDetection();
  const [isError, setIsError] = useState(false);
  const [filter, setFilter] = useState('');
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [items, setItems] = useState<DropdownItem[]>([]);

  const connectedElementRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const { isShowing, setIsShowing, updatePreferredPosition } = useConnectedOverlay(
    connectedElementRef,
    popoverRef,
    {
      offset: 8,
      horizontalPosition: 'center',
      verticalPosition: menuPosition === 'top' ? 'top' : 'bottom',
      alignWidths: true,
    },
  );

  const setVisibility = (isShowing: boolean): void => {
    setIsShowing(isShowing);

    if (!isShowing) {
      setFocusedIndex(0);
    }
  };

  const setSelectedItem = (value: string): void => {
    if (isMulti && Array.isArray(currentVal)) {
      const arrayCopy = currentVal.slice();
      const existingIndex = arrayCopy.indexOf(value);
      if (existingIndex === -1) {
        arrayCopy.push(value);
      } else {
        arrayCopy.splice(existingIndex, 1);
      }
      setCurrentVal(arrayCopy);
    } else if (!isMulti && typeof currentVal === 'string') {
      setCurrentVal(value);
    }
  };

  let itemList: DropdownItem[] = [];
  const registerListItem = (listItem: DropdownItem): void => {
    if (!itemList.map((item) => item.value).includes(listItem.value)) {
      const listClone = itemList.slice();
      listClone.push(listItem);
      itemList = listClone;
      setItems(listClone);
    }
  };

  useEffect(() => {
    if (!isShowing) {
      return;
    }

    /** We need to update the position, because the dimensions of the
     * overlay has changed.
     */
    setTimeout(() => {
      updatePreferredPosition();
    });
  }, [isShowing]);

  return (
    <DropdownContext.Provider
      value={{
        isCompact: isCompact,
        isMulti: isMulti,
        isDisabled: isDisabled,
        focusedIndex: focusedIndex,
        registerListItem: (listItem) => registerListItem(listItem),
        setFocusedIndex: (newIndex) => setFocusedIndex(newIndex),
        onItemSelect: (value) => setSelectedItem(value),
        onClose: () => setVisibility(false),
        currentVal: currentVal,
        inputIsMouse: isMouse,
        filter: filter,
        items: items,
      }}
    >
      <DropdownContainer
        isCompact={isCompact}
        className={className ?? ''}
        style={{ ...inlineStyle }}
        fullWidth={isFullWidth}
        data-testid="wrapper"
        role="combobox"
        aria-haspopup="true"
      >
        {!!label && <FormFieldLabel data-testid="label">{label}</FormFieldLabel>}
        <DropdownInputContainer
          ref={connectedElementRef}
          isDisabled={isDisabled}
          isActive={isShowing}
          isInvalid={isError}
          isCompact={isCompact}
          data-testid="input-container"
        >
          <DropdownInput
            placeholder={placeholder}
            placeholderIcon={placeholderIcon}
            allOptionsSelectedLabel={allOptionsSelectedLabel}
            editable={isSearchable}
            onChange={(value) => setFilter(value)}
            onFocusChange={(isFocused) => setVisibility(isFocused)}
          />

          <IconRotator isRotated={isShowing}>
            <Icon
              name="arrowDownBold"
              color={isDisabled ? 'disabled' : 'black'}
              size={isCompact ? 'xs' : 'sm'}
            />
          </IconRotator>
        </DropdownInputContainer>
        {(isError || errorMessage) && <DropdownError errorText={errorMessage} />}
      </DropdownContainer>
      {createPortal(
        <Overlay isShowing={isShowing}>
          <Backdrop onClick={() => setVisibility(false)} />
          <OverlayPositioner ref={popoverRef}>{dropdownOverlay}</OverlayPositioner>
        </Overlay>,
        document.body,
      )}
    </DropdownContext.Provider>
  );
};

export default Dropdown;
