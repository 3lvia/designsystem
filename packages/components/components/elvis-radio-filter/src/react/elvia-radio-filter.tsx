import { ElvisComponentWrapper } from '@elvia/elvis-component-wrapper/src/elvia-component';
import React, { CSSProperties, FC } from 'react';
import { RadioFilterGroup, RadioFilterInput, RadioFilterLabel, RadioFilterTitle } from './styledComponents';

export interface Option {
  label: string;
  value: string;
}

export interface BaseRadioFilterProps {
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

export const RadioFilter: FC<BaseRadioFilterProps> = ({
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
  const updateValue = (value: string) => {
    if (!webcomponent) {
      valueOnChange && valueOnChange(value);
    } else if (webcomponent) {
      webcomponent.setProps({ value: value }, true);
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
          <RadioFilterLabel key={optionsValue} isSelected={optionsValue === value}>
            <RadioFilterInput
              type="radio"
              name={name}
              aria-label={ariaLabel ? ariaLabel : label + ' filtrering valgt'}
              aria-checked={optionsValue === value}
              checked={optionsValue === value}
              onChange={() => updateValue(optionsValue)}
            ></RadioFilterInput>
            <RadioFilterTitle>{label}</RadioFilterTitle>
          </RadioFilterLabel>
        ))}
    </RadioFilterGroup>
  );
};

export default RadioFilter;
