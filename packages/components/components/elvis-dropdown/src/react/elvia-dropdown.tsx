import React, { KeyboardEvent as ReactKeyboardEvent, useEffect, useRef, useState } from 'react';

import { config } from './config';
import { DropdownItem, DropdownProps } from './elviaDropdown.types';
import {
  warnDeprecatedProps,
  FormFieldLabel,
  useConnectedOverlay,
  useInputModeDetection,
  useBreakpoint,
  useWebComponentState,
} from '@elvia/elvis-toolbox';
import { Icon } from '@elvia/elvis-icon/react';
import { DropdownInput } from './dropdown-input/dropdownInput';
import { DropdownContainer, DropdownInputContainer, IconRotator } from './styledComponents';
import { DropdownError } from './error/dropdownError';
import { DropdownOverlay } from './dropdown-overlay/dropdownOverlay';
import { flattenTree } from './dropdownListUtils';

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
  onItemHover,
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
  const isGtMobile = useBreakpoint('gt-mobile');
  const [currentVal, setCurrentVal] = useWebComponentState(value, 'value', webcomponent, valueOnChange);
  const [filteredItems, setFilteredItems] = useState<DropdownItem[]>([]);
  const [pressedKey, setPressedKey] = useState<ReactKeyboardEvent<HTMLInputElement>>();
  const [focusedItem, setFocusedItem] = useState<DropdownItem>();
  const [hoveredItem, setHoveredItem] = useState<DropdownItem>();

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
      let arrayCopy: string[] = [];

      if (Array.isArray(currentVal)) {
        arrayCopy = currentVal.slice();
      } else if (currentVal) {
        arrayCopy = [currentVal];
      }

      values.forEach((value) => {
        const existingIndex = arrayCopy.indexOf(value);
        if (existingIndex === -1) {
          arrayCopy.push(value);
        } else {
          arrayCopy.splice(existingIndex, 1);
        }
      });
      setCurrentVal(arrayCopy);
      setFilter('');
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

  const emitHoveredItem = (item?: DropdownItem): void => {
    if (!webcomponent && onItemHover) {
      onItemHover(item?.value);
    } else if (webcomponent) {
      webcomponent.triggerEvent('onItemHover', item?.value);
    }
  };

  const updateHoveredItem = (item?: DropdownItem): void => {
    emitHoveredItem(item);
    if (item?.value !== hoveredItem?.value) {
      setHoveredItem(item);
    }
  };

  const updateFocusedItem = (item?: DropdownItem): void => {
    if (item?.value !== focusedItem?.value) {
      setFocusedItem(item);
    }
  };

  useEffect(() => {
    if (!isShowing) {
      setFilter('');
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
        const flatList = flattenTree(items).filter((item) => !item.children);
        const filteredItems = flatList.filter((item) =>
          item.label.toLowerCase().includes(filter.toLowerCase()),
        );
        setFilteredItems(filteredItems);
      }
    };
    filterItems();
  }, [filter]);

  useEffect(() => {
    if (items?.length && filteredItems !== items) {
      setFilteredItems(items);
    }
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
            focusedItem={focusedItem}
            isMulti={isMulti}
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
          isRootOverlay
          isGtMobile={isGtMobile}
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
          selectAllOption={hasSelectAllOption && isMulti ? selectAllOption : undefined}
          hasLoadMoreItemsButton={hasLoadMoreItemsButton}
          onLoadMoreItems={emitLoadMoreItems}
          isLoadingMoreItems={isLoadingMoreItems}
          focusedItem={focusedItem}
          setFocusedItem={updateFocusedItem}
          setHoveredItem={updateHoveredItem}
          isSearchMode={!!filter}
        />
      )}
    </>
  );
};

export default Dropdown;
