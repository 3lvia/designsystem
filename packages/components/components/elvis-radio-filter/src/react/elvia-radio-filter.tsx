import { BaseProps, useLanguage, useWebComponentState } from '@elvia/elvis-toolbox';
import React, { ComponentPropsWithoutRef, FC } from 'react';

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
  groupAriaLabel,
  valueOnChange,
  className,
  inlineStyle,
  webcomponent,
  ...rest
}) => {
  const [selectedValue, setSelectedValue] = useWebComponentState(value, 'value', webcomponent, valueOnChange);
  const lang = useLanguage();
  const localizedGroupAriaLabel = groupAriaLabel ?? (lang === 'no' ? 'Filtreringsknapper' : 'Filter buttons');

  return (
    <RadioFilterGroup
      role="radiogroup"
      className={className}
      style={inlineStyle}
      data-testid="radio-filter-group"
      aria-label={localizedGroupAriaLabel}
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
