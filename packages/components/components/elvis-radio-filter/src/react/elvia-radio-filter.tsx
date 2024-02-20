import React, { ComponentPropsWithoutRef, FC } from 'react';

import { BaseProps, useWebComponentState } from '@elvia/elvis-toolbox';

import { RadioFilterItem } from './RadioFilterItem';
import { RadioFilterGroup } from './styledComponents';

export interface Option {
  label: string;
  value: string;
}

export interface BaseRadioFilterProps extends BaseProps {
  name: string;
  items: Option[];
  value: string;
  ariaLabel?: string;
  groupAriaLabel?: string;
  valueOnChange?: (value: string) => void;
}

export interface RadioFilterProps extends BaseRadioFilterProps, ComponentPropsWithoutRef<'div'> {}

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
  const [selectedValue, setSelectedValue] = useWebComponentState(value, 'value', webcomponent, valueOnChange);

  return (
    <RadioFilterGroup
      role="radiogroup"
      className={className}
      style={inlineStyle}
      data-testid="radio-filter-group"
      aria-label={groupAriaLabel}
      {...rest}
    >
      {items &&
        items.map(({ label, value: optionsValue }) => (
          <RadioFilterItem
            key={optionsValue}
            label={label}
            optionsValue={optionsValue}
            selectedValue={selectedValue}
            setSelectedValue={setSelectedValue}
            name={name}
            ariaLabel={ariaLabel}
          />
        ))}
    </RadioFilterGroup>
  );
};

export default RadioFilter;
