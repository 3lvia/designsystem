import React, { FC } from 'react';
import { RadioFilterGroup, RadioFilterInput ,RadioFilterLabel, RadioFilterTitle } from './styledComponents';

export interface Option {
  label: string;
}

export interface BaseRadioFilterProps {
  name: string;
  items: Option[];
  value: string;
  ariaLabel?: string;
  valueOnChange?: (value: string) => void;
  webcomponent?: any;
}

export const RadioFilter: FC<BaseRadioFilterProps> = ({
  ariaLabel,
  name,
  items,
  value,
  valueOnChange,
  webcomponent,
}) => {

  const updateValue = (value: string) => {
    if (!webcomponent) {
      valueOnChange && valueOnChange(value);
    } else if (webcomponent) {
      // True -> Prevents rerender
      webcomponent.setProps({ value: value}, true);
    }
  };

  return (
    <RadioFilterGroup role="radiogroup">
      {items && items.map(({label}) => (
        <RadioFilterLabel key={label} isSelected={label === value}>
          <RadioFilterInput
            type="radio"
            name={name}
            aria-label={ariaLabel ? ariaLabel : label}
            aria-checked={label === value}
            checked={label === value}
            onChange={() => 
              updateValue(label)
            }
          ></RadioFilterInput>
          <RadioFilterTitle>
            {label}
          </RadioFilterTitle>
        </RadioFilterLabel>
          ))}
        </RadioFilterGroup>
      );
};

export default RadioFilter;
