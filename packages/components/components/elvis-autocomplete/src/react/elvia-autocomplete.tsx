import React from 'react';
import { AutocompleteProps } from './elvia-autocomplete.types';
import {
  FormFieldContainer,
  FormFieldLabel,
  FormFieldInputContainer,
  FormFieldInput,
  useWebComponentState,
} from '@elvia/elvis-toolbox';

export const Autocomplete: React.FC<AutocompleteProps> = function ({
  className,
  hasOptionalText = false,
  inlineStyle,
  isDisabled = false,
  isFullWidth = false,
  items = [],
  label,
  placeholder,
  webcomponent,
  size = 'medium',
  valueOnChange,
  value = '',
  ...rest
}) {
  const [currentValue, setCurrentValue] = useWebComponentState(value, 'value', webcomponent, valueOnChange);

  const handleChange = (event: { target: { value: React.SetStateAction<string | null> } }) => {
    setCurrentValue(event.target.value);
  };

  return (
    <>
      <FormFieldContainer
        size={size}
        isFullWidth={isFullWidth}
        isDisabled={isDisabled}
        className={className ?? ''}
        style={{ ...inlineStyle }}
        {...rest}
      >
        {(!!label || !!hasOptionalText) && (
          <FormFieldLabel hasOptionalText={hasOptionalText}>{label}</FormFieldLabel>
        )}
        <FormFieldInputContainer>
          <FormFieldInput
            placeholder={placeholder}
            disabled={isDisabled}
            onChange={handleChange}
            value={currentValue ?? ''}
          />
        </FormFieldInputContainer>
      </FormFieldContainer>
      {true && (
        <>
          <br />
          <span>
            jeg er en overlay med {items.length} elementer {currentValue}
          </span>
        </>
      )}
    </>
  );
};

export default Autocomplete;
