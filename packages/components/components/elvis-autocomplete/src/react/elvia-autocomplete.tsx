import React, { useEffect, useMemo, useRef, useState } from 'react';
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

export const Autocomplete: React.FC<AutocompleteProps> = function ({
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
  onOpen,
  placeholder,
  size = 'medium',
  value = '',
  valueOnChange,
  webcomponent,
  ...rest
}) {
  const [currentValue, setCurrentValue] = useState<string | null>(value);
  const [fadeOut, setFadeOut] = useState(false);
  const [touched, setTouched] = useState(false);
  const [error, setError] = useState<ErrorType | undefined>(undefined);

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

  const filteredItems = useMemo(() => filterItems(items, currentValue), [items, currentValue]);

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
    setCurrentValue(item.label);
    emitValueOnChange(item.value);
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
            autoComplete="off"
            disabled={isDisabled}
            onBlur={handleOnBlur}
            onChange={handleOnChange}
            onFocus={handleOnInputFocus}
            placeholder={placeholder}
            required={isRequired}
            value={currentValue ?? ''}
          />
        </FormFieldInputContainer>
        {((error && !mergedErrorOptions.hideText) || !!mergedErrorOptions.text) && (
          <AutocompleteError label={label} errorType={error} errorOptions={mergedErrorOptions} id={'1'} />
        )}
      </FormFieldContainer>
      {isShowing && (
        <AutocompleteOverlay
          fadeOut={fadeOut}
          filteredItems={filteredItems}
          onClose={closePopup}
          onItemSelect={handleOnItemSelect}
          ref={popoverRef}
          setFadeOut={setFadeOut}
          size={size}
        ></AutocompleteOverlay>
      )}
    </>
  );
};

export default Autocomplete;
