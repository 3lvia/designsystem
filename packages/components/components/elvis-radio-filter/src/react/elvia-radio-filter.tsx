import React, { FC } from 'react';
import * as styledRadioFilter from './styledComponents';

export interface Option {
  label: string;
  value: string;
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
      webcomponent.setProps({ value: value }, true);
    }
  };

  return (
    <styledRadioFilter.RadioFilterGroup role="radiogroup">
      {items && items.map(({label, value: optionsValue}) => (
        <styledRadioFilter.RadioFilterLabel key={optionsValue} isSelected={optionsValue === value}>
          <styledRadioFilter.RadioFilterInput
            type="radio"
            name={name}
            aria-label={ariaLabel ? ariaLabel : label}
            aria-checked={optionsValue === value}
            checked={optionsValue === value}
            onChange={() => 
              updateValue(optionsValue)
            }
          ></styledRadioFilter.RadioFilterInput>
          <styledRadioFilter.RadioFilterTitle>
            {label}
          </styledRadioFilter.RadioFilterTitle>
        </styledRadioFilter.RadioFilterLabel>
          ))}
        </styledRadioFilter.RadioFilterGroup>
      );
};

export default RadioFilter;
