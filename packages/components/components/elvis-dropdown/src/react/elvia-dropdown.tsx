import React, { KeyboardEvent as ReactKeyboardEvent, useEffect, useMemo, useRef, useState } from 'react';

import { config } from './config';
import { DropdownItem, DropdownProps, DropdownValueType } from './elviaDropdown.types';
import {
  warnDeprecatedProps,
  FormFieldLabel,
  useConnectedOverlay,
  useInputModeDetection,
  useBreakpoint,
  useWebComponentState,
  IconWrapper,
} from '@elvia/elvis-toolbox';
import arrowDownBold from '@elvia/elvis-assets-icons/dist/icons/arrowDownBold';
import { DropdownInput } from './dropdown-input/dropdownInput';
import { DropdownContainer, DropdownInputContainer, IconRotator } from './styledComponents';
import { DropdownError } from './error/dropdownError';
import { DropdownOverlay } from './dropdown-overlay/dropdownOverlay';
import { flattenTree, getValueAsList } from './dropdownListUtils';
import { flushSync } from 'react-dom';

const filterItems = (items: DropdownItem[], filter: string): DropdownItem[] => {
  if (!filter) {
    return items;
  } else {
    const flatList = flattenTree(items).filter((item) => !item.children);
    const filteredItems = flatList.filter((item) => item.label.toLowerCase().includes(filter.toLowerCase()));
    return filteredItems;
  }
};

let uniqueDropdownId = 0;

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
  const { inputMode } = useInputModeDetection();
  const isGtMobile = useBreakpoint('gt-mobile');
  const [currentVal, setCurrentVal] = useWebComponentState(value, 'value', webcomponent, valueOnChange);
  const [pressedKey, setPressedKey] = useState<ReactKeyboardEvent<HTMLInputElement>>();
  const [focusedItem, setFocusedItem] = useState<DropdownItem>();
  const [id] = useState(`ewc-dropdown-overlay-${uniqueDropdownId++}`);

  const filteredItems = useMemo(() => filterItems(items, filter), [items, filter]);

  const connectedElementRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const { isShowing, setIsShowing } = useConnectedOverlay(connectedElementRef, popoverRef, {
    offset: 8,
    horizontalPosition: 'center',
    verticalPosition: menuPosition === 'top' ? 'top' : 'bottom',
    alignWidths: true,
  });

  const focusOnSelectedValue = (): void => {
    if (focusedItem || !currentVal) {
      return;
    }

    if (isMulti) {
      setFocusedItem(filteredItems[0]);
    } else if (!Array.isArray(currentVal)) {
      const currentValInList = filteredItems.find((item) => item.value === currentVal);
      if (currentValInList) {
        setFocusedItem(currentValInList);
      }
    }
  };

  const setSelectedItem = (values: DropdownValueType[]): void => {
    if (isMulti) {
      const arrayCopy = getValueAsList(currentVal);

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

    focusOnSelectedValue();
  };

  const emitLoadMoreItems = (): void => {
    onLoadMoreItems?.();
    webcomponent?.triggerEvent('onLoadMoreItems');
  };

  const emitHoveredItem = (item?: DropdownItem): void => {
    onItemHover?.(item?.value);
    webcomponent?.triggerEvent('onItemHover', item?.value);
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
        flushSync(() => setIsShowing(false));
      }
    };

    window.addEventListener('keydown', closeOnEsc);
    return () => window.removeEventListener('keydown', closeOnEsc);
  }, [isShowing]);

  return (
    <>
      <DropdownContainer
        isCompact={isCompact}
        className={className ?? ''}
        style={{ ...inlineStyle }}
        isFullWidth={isFullWidth}
        isDisabled={isDisabled}
        isActive={isShowing}
        isInvalid={!!errorMessage}
        data-testid="wrapper"
        aria-haspopup="true"
      >
        {!!label && <FormFieldLabel>{label}</FormFieldLabel>}
        <DropdownInputContainer ref={connectedElementRef}>
          <DropdownInput
            placeholder={placeholder}
            placeholderIcon={placeholderIcon}
            allOptionsSelectedLabel={allOptionsSelectedLabel}
            isEditable={isSearchable}
            onChange={(value) => setFilter(value)}
            dropdownIsOpen={isShowing}
            isDisabled={isDisabled}
            items={items}
            onOpenDropdown={() => flushSync(() => setIsShowing(true))}
            onKeyPress={setPressedKey}
            currentVal={currentVal}
            focusedItem={focusedItem}
            id={id}
          />

          <IconRotator isRotated={isShowing}>
            <IconWrapper
              icon={arrowDownBold}
              color={isDisabled ? 'disabled' : 'black'}
              size={isCompact ? 'xs' : 'sm'}
            />
          </IconRotator>
        </DropdownInputContainer>
        {!!errorMessage && <DropdownError errorText={errorMessage} />}
      </DropdownContainer>
      {isShowing && (
        <DropdownOverlay
          id={id}
          ref={popoverRef}
          isRootOverlay
          isGtMobile={isGtMobile}
          noItemsText={noOptionsMessage}
          isMulti={isMulti}
          onItemSelect={setSelectedItem}
          isCompact={isCompact}
          onClose={() => flushSync(() => setIsShowing(false))}
          filteredItems={filteredItems}
          inputIsKeyboard={inputMode === 'keyboard'}
          allItems={items}
          pressedKey={pressedKey}
          currentVal={currentVal}
          selectAllOption={hasSelectAllOption && isMulti ? selectAllOption : undefined}
          hasLoadMoreItemsButton={hasLoadMoreItemsButton}
          onLoadMoreItems={emitLoadMoreItems}
          isLoadingMoreItems={isLoadingMoreItems}
          focusedItem={focusedItem}
          setFocusedItem={updateFocusedItem}
          setHoveredItem={emitHoveredItem}
          isSearchMode={!!filter}
        />
      )}
    </>
  );
};

export default Dropdown;
