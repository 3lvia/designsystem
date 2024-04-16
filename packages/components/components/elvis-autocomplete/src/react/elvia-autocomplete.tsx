import {
  ErrorOptions,
  FormFieldContainer,
  FormFieldInput,
  FormFieldInputContainer,
  FormFieldLabel,
  VisuallyHidden,
  useConnectedOverlay,
} from '@elvia/elvis-toolbox';
import React, { KeyboardEvent, useEffect, useMemo, useRef, useState } from 'react';

import { AutocompleteOverlay } from './autocomplete-overlay/autocompleteOverlay';
import { AutocompleteItem, AutocompleteProps, ErrorType } from './elvia-autocomplete.types';
import { AutocompleteError } from './error/autocompleteError';
import { filterItems } from './utils/filterItems';
import { getInternalErrorText } from './utils/getInternalErrorText';
import { getStatusForScreenReader } from './utils/statusMessage';
import { useOutsideClickListener } from './utils/useOutsideClick';

const defaultErrorOptions = {
  hideText: false,
  isErrorState: false,
  hasErrorPlaceholder: true,
} satisfies Partial<ErrorOptions>;

let [uniqueAutocompleteId, uniqueAutocompletePopupId, uniqueAutocompleteErrorId] = [0, 0, 0];

export const Autocomplete: React.FC<AutocompleteProps> = function ({
  ariaLabel,
  className,
  errorOnChange,
  errorOptions,
  hasOptionalText = false,
  inlineStyle,
  isDisabled = false,
  isFullWidth = false,
  isRequired = false,
  openOnFocus = false,
  items = [],
  label,
  menuPosition = 'auto',
  onSelectItem,
  onOpen,
  placeholder,
  size = 'medium',
  hasBuiltInFilter = true,
  value = '',
  valueOnChange,
  webcomponent,
  ...rest
}) {
  const [currentValue, setCurrentValue] = useState<string | null>(value);
  const [fadeOut, setFadeOut] = useState(false);
  const [touched, setTouched] = useState(false);
  const [error, setError] = useState<ErrorType | undefined>(undefined);
  const [id] = useState(`ewc-autocomplete-${uniqueAutocompleteId++}`);
  const [popupId] = useState(`ewc-autocomplete-popup-${uniqueAutocompletePopupId++}`);
  const [errorId] = useState(`ewc-autocomplete-error-${uniqueAutocompleteErrorId++}`);
  const [focusedItem, setFocusedItem] = useState<AutocompleteItem | undefined>(undefined);

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

  useOutsideClickListener([connectedElementRef, popoverRef], () => {
    setFadeOut(true);
  });

  const filteredItems = useMemo(() => {
    return hasBuiltInFilter ? filterItems(items, currentValue) : items;
  }, [items, currentValue, hasBuiltInFilter]);

  const valueIsEqualOnlyItem =
    filteredItems.length === 1 &&
    filteredItems[0].value?.toLowerCase() === currentValue?.toLowerCase().trim();

  const mergedErrorOptions: Partial<ErrorOptions> = { ...defaultErrorOptions, ...errorOptions };

  const handleOnChange = (event: { target: { value: string | null } }) => {
    setCurrentValue(event.target.value);
    emitValueOnChange(event.target.value);
    if (event.target.value) {
      openPopup();
    } else {
      if (openOnFocus) {
        return;
      }
      setFadeOut(true);
    }
  };

  const handleOnSelectItem = (item: AutocompleteItem) => {
    setCurrentValue(item.value);
    emitOnSelectItem(item.value);
    setFadeOut(true);
  };

  const emitValueOnChange = (valueToEmit: string | null) => {
    webcomponent?.setProps({ value: valueToEmit }, true);
    webcomponent?.triggerEvent('valueOnChange', valueToEmit);
    valueOnChange?.(valueToEmit);
  };

  const emitOnSelectItem = (selectedValue: string | null) => {
    onSelectItem?.(selectedValue);
    webcomponent?.triggerEvent('onSelectItem', selectedValue);
  };

  const emitOnOpen = () => {
    onOpen?.();
    webcomponent?.triggerEvent('onOpen');
  };

  const handleOnInputFocus = () => {
    if (currentValue || openOnFocus) {
      openPopup();
    }
    setTouched(true);
  };

  const openPopup = () => {
    if (!isDisabled && !isShowing && !valueIsEqualOnlyItem) {
      setIsShowing(true);
      emitOnOpen();
    }
    setFadeOut(false);
  };

  const closePopup = () => {
    setIsShowing(false);
  };

  const validateInputValue = (value: string | null) => {
    if (!value && isRequired && touched) {
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

  const handleOnBlur = () => {
    setFadeOut(true);
    setFocusedItem(undefined);
    validateInputValue(currentValue);
  };

  const handleOverlayKeyboardNavigation = (ev: KeyboardEvent<HTMLInputElement>): void => {
    if (filteredItems.length === 0) {
      return;
    }

    const currentIndex = filteredItems.findIndex((item) => item.value === focusedItem?.value);

    if (['Enter', 'Tab'].includes(ev.code)) {
      if (focusedItem) {
        handleOnSelectItem(focusedItem);
      }
    } else if (ev.code === 'ArrowUp') {
      ev.preventDefault();
      const newIndex = currentIndex - 1 < 0 ? filteredItems.length - 1 : currentIndex - 1;
      setFocusedItem(filteredItems[newIndex]);
    } else if (ev.code === 'ArrowDown') {
      ev.preventDefault();
      const newIndex = currentIndex + 1 > filteredItems.length - 1 ? 0 : currentIndex + 1;
      setFocusedItem(filteredItems[newIndex]);
    }
  };

  useEffect(() => {
    setCurrentValue(value);
    validateInputValue(value);
  }, [value]);

  useEffect(() => {
    validateInputValue(currentValue);
  }, [isRequired]);

  useEffect(() => {
    if (isShowing) {
      updatePreferredPosition();
    }
  }, [filteredItems, valueIsEqualOnlyItem]);

  return (
    <>
      <VisuallyHidden role="status">
        {getStatusForScreenReader(currentValue ? filteredItems.length : 0)}
      </VisuallyHidden>
      <FormFieldContainer
        data-testid="autocomplete-wrapper"
        className={className}
        hasErrorPlaceholder={!!error || !!mergedErrorOptions.hasErrorPlaceholder || !!mergedErrorOptions.text}
        isDisabled={isDisabled}
        isFullWidth={isFullWidth}
        isInvalid={!!error || !!mergedErrorOptions.text || !!mergedErrorOptions.isErrorState}
        isActive={isShowing && !valueIsEqualOnlyItem}
        size={size}
        style={{ ...inlineStyle }}
        {...rest}
      >
        {(!!label || !!hasOptionalText) && (
          <FormFieldLabel hasOptionalText={hasOptionalText}>{label}</FormFieldLabel>
        )}
        <FormFieldInputContainer ref={connectedElementRef}>
          <FormFieldInput
            aria-autocomplete="list"
            aria-controls={popupId}
            aria-expanded={isShowing && !valueIsEqualOnlyItem}
            aria-haspopup="listbox"
            aria-label={ariaLabel}
            aria-activedescendant={
              focusedItem?.value ? `ewc-autocomplete-item-${focusedItem?.value}` : undefined
            }
            aria-invalid={!!error || !!mergedErrorOptions.text || !!mergedErrorOptions.isErrorState}
            aria-errormessage={
              !!error || !!mergedErrorOptions.text || !!mergedErrorOptions.isErrorState ? errorId : undefined
            }
            autoComplete="off"
            disabled={isDisabled}
            id={id}
            onBlur={handleOnBlur}
            onChange={(e) => handleOnChange(e)}
            onFocus={handleOnInputFocus}
            onKeyDown={(e) => handleOverlayKeyboardNavigation(e)}
            placeholder={placeholder}
            required={isRequired}
            role="combobox"
            value={currentValue ?? ''}
          />
        </FormFieldInputContainer>
        {((error && !mergedErrorOptions.hideText) || !!mergedErrorOptions.text) && (
          <AutocompleteError label={label} errorType={error} errorOptions={mergedErrorOptions} id={errorId} />
        )}
      </FormFieldContainer>
      {isShowing && !valueIsEqualOnlyItem && (
        <AutocompleteOverlay
          id={id}
          popupId={popupId}
          fadeOut={fadeOut}
          filteredItems={filteredItems}
          onClose={closePopup}
          onSelectItem={handleOnSelectItem}
          ref={popoverRef}
          setFadeOut={setFadeOut}
          size={size}
          focusedItem={focusedItem}
          setFocusedItem={setFocusedItem}
        />
      )}
    </>
  );
};

export default Autocomplete;
