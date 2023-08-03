import React, { useEffect, useMemo, useRef, useState, KeyboardEvent } from 'react';
import { AutocompleteItem, AutocompleteProps, ErrorType } from './elvia-autocomplete.types';
import {
  FormFieldContainer,
  FormFieldLabel,
  FormFieldInputContainer,
  FormFieldInput,
  useConnectedOverlay,
  ErrorOptions,
} from '@elvia/elvis-toolbox';
import { AutocompleteOverlay } from './autocomplete-overlay/autocompleteOverlay';
import { filterItems } from './utils/filterItems';
import { AutocompleteError } from './error/autocompleteError';
import { useOutsideClickListener } from './utils/useOutsideClick';
import { getInternalErrorText } from './utils/getInternalErrorText';

const defaultErrorOptions = {
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
  items = [],
  label,
  menuPosition = 'auto',
  onClose,
  onFocus,
  onItemSelect,
  onOpen,
  placeholder,
  size = 'medium',
  useBuiltInFilter = true,
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
  const { isShowing, setIsShowing } = useConnectedOverlay(connectedElementRef, popoverRef, {
    offset: 8,
    horizontalPosition: 'center',
    verticalPosition: menuPosition === 'top' ? 'top' : 'bottom',
    alignWidths: true,
  });

  useOutsideClickListener([connectedElementRef, popoverRef], () => {
    setFadeOut(isShowing);
  });

  const filteredItems = useMemo(() => {
    return useBuiltInFilter ? filterItems(items, currentValue) : items;
  }, [filterItems, items, currentValue, useBuiltInFilter]);

  const mergedErrorOptions: Partial<ErrorOptions> = { ...defaultErrorOptions, ...errorOptions };

  const handleOnChange = (event: { target: { value: string | null } }) => {
    setCurrentValue(event.target.value);
    emitValueOnChange(event.target.value);
    if (event.target.value) {
      openPopup();
    } else {
      setFadeOut(true);
    }
  };

  const handleOnItemSelect = (item: AutocompleteItem) => {
    setCurrentValue(item.value);
    emitOnItemSelect(item.value);
    setFadeOut(true);
  };

  const emitValueOnChange = (valueToEmit: string | null) => {
    webcomponent?.setProps({ value: valueToEmit }, true);
    webcomponent?.triggerEvent('valueOnChange', valueToEmit);
    valueOnChange?.(valueToEmit);
  };

  const emitOnClose = () => {
    onClose?.();
    webcomponent?.triggerEvent('onClose');
  };

  const emitOnItemSelect = (selectedValue: string | null) => {
    onItemSelect?.(selectedValue);
    webcomponent?.triggerEvent('onItemSelect', selectedValue);
  };

  const emitOnOpen = () => {
    onOpen?.();
    webcomponent?.triggerEvent('onOpen');
  };

  const emitOnFocus = () => {
    onFocus?.();
    webcomponent?.triggerEvent('onFocus');
  };

  const handleOnInputFocus = () => {
    if (currentValue) {
      openPopup();
    }
    setTouched(true);
    emitOnFocus();
  };

  const openPopup = () => {
    if (!isDisabled && !isShowing) {
      setFadeOut(false);
      setIsShowing(true);
      emitOnOpen();
    }
    setFadeOut(false);
  };

  const closePopup = () => {
    setIsShowing(false);
    emitOnClose();
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
    validateInputValue(currentValue);
    setFadeOut(true);
  };

  const handleOverlayKeyboardNavigation = (ev: KeyboardEvent<HTMLInputElement>): void => {
    if (filteredItems.length === 0) {
      return;
    }

    const currentIndex = filteredItems.findIndex((item) => item.value === focusedItem?.value);

    if (['Enter', 'Tab'].includes(ev.code)) {
      if (focusedItem) {
        handleOnItemSelect(focusedItem);
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

  return (
    <>
      <FormFieldContainer
        className={className}
        hasErrorPlaceholder={!!error || !!mergedErrorOptions.hasErrorPlaceholder || !!mergedErrorOptions.text}
        isDisabled={isDisabled}
        isFullWidth={isFullWidth}
        isInvalid={!!error || !!mergedErrorOptions.text || !!mergedErrorOptions.isErrorState}
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
            aria-expanded={isShowing}
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
      {isShowing && (
        <AutocompleteOverlay
          id={id}
          popupId={popupId}
          fadeOut={fadeOut}
          filteredItems={filteredItems}
          onClose={closePopup}
          onItemSelect={handleOnItemSelect}
          ref={popoverRef}
          setFadeOut={setFadeOut}
          size={size}
          focusedItem={focusedItem}
          setFocusedItem={setFocusedItem}
        ></AutocompleteOverlay>
      )}
    </>
  );
};

export default Autocomplete;
