import { useLanguage } from '@elvia/elvis-toolbox';
import DOMPurify from 'dompurify';
import React, { FC, useEffect, useRef, useState } from 'react';

import { RadioFilterInput, RadioFilterLabel, RadioFilterTitle } from './styledComponents';

interface RadioFilterItemProps {
  label: string;
  optionsValue: string;
  selectedValue: string;
  setSelectedValue: (value: string) => void;
  name: string;
  ariaLabel?: string;
}

export const RadioFilterItem: FC<RadioFilterItemProps> = ({
  label,
  optionsValue,
  selectedValue,
  setSelectedValue,
  name,
  ariaLabel,
}) => {
  const lang = useLanguage();
  // Use the innerText of an item to create an aria-label that doesn't include any HTML tags (e.g. icons)
  const titleRef = useRef<HTMLSpanElement>(null);
  const [defaultAriaLabel, setDefaultAriaLabel] = useState('');
  useEffect(() => {
    if (titleRef.current?.innerText) {
      const localizedLabel = lang === 'no' ? ' filtrering valgt' : ' filter selected';
      setDefaultAriaLabel(titleRef.current?.innerText + localizedLabel);
    }
  }, [titleRef, titleRef.current]);

  return (
    <RadioFilterLabel
      key={optionsValue}
      isSelected={optionsValue === selectedValue}
      data-testid="radio-button"
    >
      <RadioFilterInput
        type="radio"
        name={name}
        aria-label={ariaLabel ?? defaultAriaLabel}
        aria-checked={optionsValue === selectedValue}
        checked={optionsValue === selectedValue}
        onChange={() => setSelectedValue(optionsValue)}
      />
      <RadioFilterTitle
        ref={titleRef}
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
