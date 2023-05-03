import React, { FC } from 'react';
import { useWebComponentState, BaseProps } from '@elvia/elvis-toolbox';
import { RadioFilterGroup } from './styledComponents';
import { RadioFilterItem } from './RadioFilterItem';

export interface Option {
  label: string;
  value: string;
}

export interface RadioFilterProps extends BaseProps {
  name: string;
  items: Option[];
  value: string;
  ariaLabel?: string;
  groupAriaLabel?: string;
  valueOnChange?: (value: string) => void;
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
