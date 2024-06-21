import arrowDownBold from '@elvia/elvis-assets-icons/dist/icons/arrowDownBold';
import {
  ErrorOptions,
  FormFieldContainer,
  FormFieldInputContainer,
  FormFieldLabel,
  IconWrapper,
  useBreakpoint,
  useConnectedOverlay,
  useInputModeDetection,
  useWebComponentState,
  warnDeprecatedProps,
} from '@elvia/elvis-toolbox';
import React, { KeyboardEvent as ReactKeyboardEvent, useEffect, useMemo, useRef, useState } from 'react';

import { config } from './config';
import { DropdownInput } from './dropdown-input/dropdownInput';
import { DropdownOverlay } from './dropdown-overlay/dropdownOverlay';
import { flattenTree, getValueAsList } from './dropdownListUtils';
import { DropdownProps, ErrorType } from './elviaDropdown.types';
import { DropdownError } from './error/dropdownError';
import { getInternalErrorText } from './getInternalErrorText';
import { DropdownItem, DropdownValueType } from './publicApi.public';
import { IconRotator } from './styledComponents';

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
const defaultErrorOptions = {
  isErrorState: false,
  hasErrorPlaceholder: true,
} satisfies Partial<ErrorOptions>;

export const Dropdown: React.FC<DropdownProps> = ({
  items = [],
  value,
  size = 'medium',
  isDisabled = false,
  isFullWidth = false,
  isSearchable = false,
  isRequired = false,
  allOptionsSelectedLabel = 'Alle',
  label = '',
  errorOptions,
  menuPosition = 'auto',
  placeholder = '',
  placeholderIcon,
  isMulti = false,
  hasSelectAllOption = false,
  selectAllOption = 'Alle',
  noOptionsMessage = 'Ingen tilgjengelige valg',
  valueOnChange,
  errorOnChange,
  onItemHover,
  hasLoadMoreItemsButton,
  onLoadMoreItems,
  isLoadingMoreItems,
  labelTransformation,
  className,
  inlineStyle,
  webcomponent,
  ariaLabel,
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
  const [error, setError] = useState<ErrorType | undefined>(undefined);
  const [touched, setTouched] = useState(false);

  const filteredItems = useMemo(() => filterItems(items, filter), [items, filter]);

  const connectedElementRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const { isShowing, setIsShowing } = useConnectedOverlay(connectedElementRef, popoverRef, {
    offset: 8,
    horizontalPosition: 'center',
    verticalPosition: menuPosition === 'top' ? 'top' : 'bottom',
    alignWidths: true,
    allowHorizontalGrowth: true,
  });

  const mergedErrorOptions: Partial<ErrorOptions> = { ...defaultErrorOptions, ...errorOptions };

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

  const validateDropdownValue = () => {
    if (touched && isRequired && !currentVal) {
      onError('required');
    } else {
      onError();
    }
  };

  const onError = (newError?: ErrorType) => {
    if (newError === error) {
      return;
    }
    setError(newError);

    const errorText = getInternalErrorText(newError, label);
    errorOnChange?.(errorText);
    webcomponent?.triggerEvent('errorOnChange', errorText);
  };

  const openDropdown = () => {
    setTouched(true);
    setIsShowing(true);
  };

  useEffect(() => {
    validateDropdownValue();
  }, [isRequired]);

  useEffect(() => {
    if (!isShowing) {
      validateDropdownValue();
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

  return (
    <>
      <FormFieldContainer
        size={size}
        className={className ?? ''}
        style={{ width: '100%', maxWidth: isFullWidth ? 'unset' : '448px', ...inlineStyle }}
        isFullWidth={isFullWidth}
        isDisabled={isDisabled}
        hasErrorPlaceholder={!!mergedErrorOptions.hasErrorPlaceholder || !!mergedErrorOptions.text || !!error}
        isActive={isShowing}
        isInvalid={!!mergedErrorOptions.text || !!mergedErrorOptions.isErrorState || !!error}
        data-testid="wrapper"
        aria-haspopup="true"
      >
        {!!label && <FormFieldLabel>{label}</FormFieldLabel>}
        <FormFieldInputContainer
          style={{ width: '100%', cursor: isDisabled ? 'not-allowed' : 'pointer' }}
          ref={connectedElementRef}
        >
          <DropdownInput
            placeholder={placeholder}
            placeholderIcon={placeholderIcon}
            size={size}
            isRequired={isRequired}
            allOptionsSelectedLabel={allOptionsSelectedLabel}
            isEditable={isSearchable}
            onChange={(value) => setFilter(value)}
            dropdownIsOpen={isShowing}
            isDisabled={isDisabled}
            items={items}
            onOpenDropdown={openDropdown}
            onKeyPress={setPressedKey}
            currentVal={currentVal}
            focusedItem={focusedItem}
            labelTransformation={labelTransformation}
            id={id}
            ariaLabel={ariaLabel}
          />

          <IconRotator isRotated={isShowing} size={size}>
            <IconWrapper
              icon={arrowDownBold}
              color={isDisabled ? 'text-disabled-1' : 'text-1'}
              size={size === 'small' ? 'xs' : 'sm'}
            />
          </IconRotator>
        </FormFieldInputContainer>
        {!!(mergedErrorOptions.text || error) && (
          <DropdownError errorText={mergedErrorOptions.text ?? getInternalErrorText(error, label)} />
        )}
      </FormFieldContainer>
      {isShowing && (
        <DropdownOverlay
          id={id}
          ref={popoverRef}
          isRootOverlay
          isGtMobile={isGtMobile}
          noItemsText={noOptionsMessage}
          isMulti={isMulti}
          onItemSelect={setSelectedItem}
          size={size}
          onClose={() => setIsShowing(false)}
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
