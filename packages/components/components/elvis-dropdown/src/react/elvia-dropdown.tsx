import React, { KeyboardEvent as ReactKeyboardEvent, useEffect, useRef, useState } from 'react';

import { config } from './config';
import { DropdownProps } from './elviaDropdown.types';
import {
  warnDeprecatedProps,
  FormFieldLabel,
  useConnectedOverlay,
  useInputModeDetection,
} from '@elvia/elvis-toolbox';
import { Icon } from '@elvia/elvis-icon/react';
import { DropdownInput } from './dropdown-input/dropdownInput';
import { DropdownContainer, DropdownInputContainer, IconRotator } from './styledComponents';
import { DropdownError } from './error/dropdownError';
import { useWebComponentState } from '@elvia/elvis-toolbox';
import { DropdownOverlay } from './dropdown-overlay/dropdownOverlay';
import { getTreeDepth } from './dropdownListUtils';

const Dropdown: React.FC<DropdownProps> = ({
  items = [],
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
  selectAllOption = 'Alle',
  noOptionsMessage = 'Ingen tilgjengelige valg',
  valueOnChange,
  hasLoadMoreItemsButton,
  onLoadMoreItems,
  isLoadingMoreItems,
  className,
  inlineStyle,
  webcomponent,
  ...rest
}) => {
  warnDeprecatedProps(config, rest);

  const [filter, setFilter] = useState('');
  const { isMouse: inputIsMouse } = useInputModeDetection();
  const [currentVal, setCurrentVal] = useWebComponentState(value, 'value', webcomponent, valueOnChange);
  const [filteredItems, setFilteredItems] = useState(items);
  const [pressedKey, setPressedKey] = useState<ReactKeyboardEvent<HTMLInputElement>>();
  const [focusedOverlayLevel, setFocusedOverlayLevel] = useState(0);

  const connectedElementRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const { isShowing, setIsShowing } = useConnectedOverlay(connectedElementRef, popoverRef, {
    offset: 8,
    horizontalPosition: 'center',
    verticalPosition: menuPosition === 'top' ? 'top' : 'bottom',
    alignWidths: true,
  });

  const setSelectedItem = (values: string[]): void => {
    if (isMulti) {
      const arrayCopy = Array.isArray(currentVal) ? currentVal.slice() : currentVal ? [currentVal] : [];
      values.forEach((value) => {
        const existingIndex = arrayCopy.indexOf(value);
        if (existingIndex === -1) {
          arrayCopy.push(value);
        } else {
          arrayCopy.splice(existingIndex, 1);
        }
      });
      setCurrentVal(arrayCopy);
    } else {
      setCurrentVal(values[0]);
    }
  };

  const emitLoadMoreItems = (): void => {
    if (!webcomponent && onLoadMoreItems) {
      onLoadMoreItems();
    } else if (webcomponent) {
      webcomponent.triggerEvent('onLoadMoreItems');
    }
  };

  const updateFocusedOverlayLevel = (newLevel: number): void => {
    // Clamp overlay level between 0 and max tree depth
    setFocusedOverlayLevel(Math.min(Math.max(0, newLevel), getTreeDepth(items)));
  };

  useEffect(() => {
    if (!isShowing) {
      return;
    }

    const closeOnEsc = (ev: KeyboardEvent) => {
      if (ev.code === 'Escape') {
        setIsShowing(false);
      }
    };

    window.addEventListener('keydown', closeOnEsc);
    return () => window.removeEventListener('keydown', closeOnEsc);
  }, [isShowing]);

  useEffect(() => {
    const filterItems = () => {
      if (!filter) {
        setFilteredItems(items);
      } else {
        setFilteredItems(items.filter((item) => item.label.toLowerCase().includes(filter.toLowerCase())));
      }
    };
    filterItems();
  }, [filter]);

  useEffect(() => {
    setTimeout(() => setFilteredItems(items)); //TODO: Can we get rid of it
  }, [items]);

  return (
    <>
      <DropdownContainer
        isCompact={isCompact}
        className={className ?? ''}
        style={{ ...inlineStyle }}
        fullWidth={isFullWidth}
        data-testid="wrapper"
        aria-haspopup="true"
      >
        {!!label && <FormFieldLabel data-testid="label">{label}</FormFieldLabel>}
        <DropdownInputContainer
          ref={connectedElementRef}
          isDisabled={isDisabled}
          isActive={isShowing}
          isInvalid={!!errorMessage}
          isCompact={isCompact}
          data-testid="input-container"
        >
          <DropdownInput
            placeholder={placeholder}
            placeholderIcon={placeholderIcon}
            allOptionsSelectedLabel={allOptionsSelectedLabel}
            editable={isSearchable}
            onChange={(value) => setFilter(value)}
            dropdownIsOpen={isShowing}
            isDisabled={isDisabled}
            items={items}
            onOpenDropdown={() => setIsShowing(true)}
            onKeyPress={setPressedKey}
            currentVal={currentVal}
          />

          <IconRotator isRotated={isShowing}>
            <Icon
              name="arrowDownBold"
              color={isDisabled ? 'disabled' : 'black'}
              size={isCompact ? 'xs' : 'sm'}
            />
          </IconRotator>
        </DropdownInputContainer>
        {!!errorMessage && <DropdownError errorText={errorMessage} />}
      </DropdownContainer>
      {isShowing && (
        <DropdownOverlay
          ref={popoverRef}
          noItemsText={noOptionsMessage}
          isMulti={isMulti}
          onItemSelect={setSelectedItem}
          isCompact={isCompact}
          onClose={() => setIsShowing(false)}
          filteredItems={filteredItems}
          inputIsMouse={inputIsMouse}
          allItems={items}
          pressedKey={pressedKey}
          currentVal={currentVal}
          level={0}
          focusedLevel={focusedOverlayLevel}
          onLevelFocusChange={updateFocusedOverlayLevel}
          selectAllOption={hasSelectAllOption && isMulti ? selectAllOption : undefined}
          hasLoadMoreItemsButton={hasLoadMoreItemsButton}
          onLoadMoreItems={emitLoadMoreItems}
          isLoadingMoreItems={isLoadingMoreItems}
        />
      )}
    </>
  );
};

export default Dropdown;
