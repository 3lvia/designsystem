import DOMPurify from 'dompurify';
import React, { FC } from 'react';

import { RadioFilterContent, RadioFilterInput, RadioFilterLabel } from './styledComponents';

interface RadioFilterItemProps {
  label: string;
  optionsValue: string;
  selectedValue: string;
  setSelectedValue: (value: string) => void;
  name: string;
}

export const RadioFilterItem: FC<RadioFilterItemProps> = ({
  label,
  optionsValue,
  selectedValue,
  setSelectedValue,
  name,
}) => {
  return (
    <RadioFilterLabel
      key={optionsValue}
      isSelected={optionsValue === selectedValue}
      data-testid="radio-button"
    >
      <RadioFilterInput
        type="radio"
        name={name}
        checked={optionsValue === selectedValue}
        onChange={() => setSelectedValue(optionsValue)}
      />
      <RadioFilterContent
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(label, {
            CUSTOM_ELEMENT_HANDLING: {
              tagNameCheck: /^e-icon$/,
            },
          }),
        }}
      />
    </RadioFilterLabel>
  );
};
