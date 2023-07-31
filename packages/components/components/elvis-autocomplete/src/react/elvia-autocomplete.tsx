import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AutocompleteItem, AutocompleteProps } from './elvia-autocomplete.types';
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

const defaultErrorOptions = {
  isErrorState: false,
  hasErrorPlaceholder: true,
} satisfies Partial<ErrorOptions>;

export const Autocomplete: React.FC<AutocompleteProps> = function ({
  className,
  hasOptionalText = false,
  inlineStyle,
  isDisabled = false,
  isFullWidth = false,
  items = [],
  label,
  menuPosition = 'auto',
  placeholder,
  size = 'medium',
  value = '',
  valueOnChange,
  webcomponent,
  errorOptions,
  ...rest
}) {
  const [currentValue, setCurrentValue] = useState<string | null>(value);
  const [fadeOut, setFadeOut] = useState(false);

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
      setIsShowing(true);
      setFadeOut(false);
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

  const openPopup = () => {
    if (!isDisabled && currentValue) {
      setFadeOut(false);
      setIsShowing(true);
    }
  };

  const closePopup = () => {
    setIsShowing(false);
  };

  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  return (
    <>
      <FormFieldContainer
        className={className}
        hasErrorPlaceholder={!!mergedErrorOptions.hasErrorPlaceholder || !!mergedErrorOptions.text}
        isDisabled={isDisabled}
        isFullWidth={isFullWidth}
        isInvalid={!!mergedErrorOptions.text || !!mergedErrorOptions.isErrorState}
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
            onChange={handleOnChange}
            onClick={openPopup}
            placeholder={placeholder}
            value={currentValue ?? ''}
          />
        </FormFieldInputContainer>
        {!!mergedErrorOptions.text && <AutocompleteError errorText={mergedErrorOptions.text} />}
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
