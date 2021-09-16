import React, { FC } from 'react';
import { RadioFilterGroup, RadioFilterInput ,RadioFilterLabel, RadioFilterTitle } from './styledComponents';

export interface Option {
  value: string;
  disabled?: boolean;
}

export interface BaseRadioFilterProps {
  name: string;
  options: Option[];
  state: string;
  ariaLabel?: string;
  onChange?: (value: string) => void;
  webcomponent?: any;
}

export const RadioFilter: FC<BaseRadioFilterProps> = ({
  ariaLabel,
  name,
  options,
  state,
  onChange,
  webcomponent,
}) => {

  const updateValue = (value: string) => {
    if (!webcomponent) {
      onChange && onChange(value);
    } else if (webcomponent) {
      // True -> Prevents rerender
      webcomponent.setProps({ value: value}, true);
    }
  };

  return (
    <RadioFilterGroup>
      {options?.map(({value}) => (
        <RadioFilterLabel key={value} isSelected={state === value}>
          <RadioFilterInput
            type="radio"
            name={name}
            aria-label={ariaLabel ?? state}
            aria-checked={state === value}
            checked={state === value}
            onChange={() => 
              updateValue(value)
            }
          ></RadioFilterInput>
          <RadioFilterTitle>
          {value}
          </RadioFilterTitle>
        </RadioFilterLabel>
          ))}
        </RadioFilterGroup>
      );
};

export default RadioFilter;
