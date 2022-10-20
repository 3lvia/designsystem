import type { ElvisComponentWrapper } from '@elvia/elvis-component-wrapper';
import React, { CSSProperties, FC, useEffect, useState } from 'react';
import { RadioFilterGroup, RadioFilterInput, RadioFilterLabel, RadioFilterTitle } from './styledComponents';

export interface Option {
  label: string;
  value: string;
}

export interface RadioFilterProps {
  name: string;
  items: Option[];
  value: string;
  ariaLabel?: string;
  groupAriaLabel?: string;
  valueOnChange?: (value: string) => void;
  className?: string;
  inlineStyle?: CSSProperties;
  webcomponent?: ElvisComponentWrapper;
}

export const RadioFilter: FC<RadioFilterProps> = ({
  ariaLabel,
  name,
  items,
  value,
  groupAriaLabel = 'Filtreringsknapper',
  valueOnChange,
  className,
  inlineStyle,
  webcomponent,
  ...rest
}) => {
  const [valueState, setValueState] = useState(value);

  useEffect(() => {
    setValueState(value);
  }, [value]);

  const updateValue = (newValue: string) => {
    setValueState(newValue);

    if (!webcomponent) {
      valueOnChange && valueOnChange(newValue);
    } else if (webcomponent) {
      webcomponent.setProps({ value: newValue }, true);
      webcomponent.triggerEvent('valueOnChange', newValue);
    }
  };

  return (
    <RadioFilterGroup
      role="radiogroup"
      className={`${className ? className : ''}`}
      style={inlineStyle}
      data-testid="radio-filter-group"
      aria-label={groupAriaLabel}
      {...rest}
    >
      {items &&
        items.map(({ label, value: optionsValue }) => (
          <RadioFilterLabel
            key={optionsValue}
            isSelected={optionsValue === valueState}
            data-testid="radio-button"
          >
            <RadioFilterInput
              type="radio"
              name={name}
              aria-label={ariaLabel ? ariaLabel : label + ' filtrering valgt'}
              aria-checked={optionsValue === valueState}
              checked={optionsValue === valueState}
              onChange={() => updateValue(optionsValue)}
            ></RadioFilterInput>
            <RadioFilterTitle>{label}</RadioFilterTitle>
          </RadioFilterLabel>
        ))}
    </RadioFilterGroup>
  );
};

export default RadioFilter;
