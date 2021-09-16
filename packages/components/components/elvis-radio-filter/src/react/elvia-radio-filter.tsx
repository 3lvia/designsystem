import React, { FC } from 'react';
import { RadioFilterGroup, RadioFilterInput ,RadioFilterLabel, RadioFilterTitle } from './styledComponents';

export interface Option {
  name: string;
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
    <RadioFilterGroup>
      {items && items.map(({name: optionName}) => (
        <RadioFilterLabel key={optionName} isSelected={optionName === value}>
          <RadioFilterInput
            type="radio"
            name={name}
            aria-label={ariaLabel ? ariaLabel : optionName}
            aria-checked={optionName === value}
            checked={optionName === value}
            onChange={() => 
              updateValue(optionName)
            }
          ></RadioFilterInput>
          <RadioFilterTitle>
            {optionName}
          </RadioFilterTitle>
        </RadioFilterLabel>
          ))}
        </RadioFilterGroup>
      );
};

export default RadioFilter;
