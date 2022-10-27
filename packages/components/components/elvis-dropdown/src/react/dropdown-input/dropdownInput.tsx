import { Icon, IconName } from '@elvia/elvis-icon/react';
import React, { useEffect, useRef, useState } from 'react';
import { DropdownValue } from '../elviaDropdown.types';

import { Input, ReadonlyInput } from './dropdownInputStyles';

interface Props {
  disabled?: boolean;
  placeholder?: string;
  placeholderIcon?: IconName;
  allOptionsSelectedLabel: string;
  allOptionsAreSelected: boolean;
  editable: boolean;
  isCompact: boolean;
  value: DropdownValue;
  onChange: (query: string) => void;
}

export const DropdownInput: React.FC<Props> = ({
  disabled,
  placeholder,
  placeholderIcon,
  allOptionsSelectedLabel,
  allOptionsAreSelected,
  editable,
  isCompact,
  value,
  onChange,
}) => {
  const [displayValue, setDisplayValue] = useState('');
  const inputElement = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (Array.isArray(value)) {
      if (allOptionsAreSelected) {
        setDisplayValue(allOptionsSelectedLabel);
      } else if (value.length >= 2) {
        setDisplayValue(`${value.length} valgte`);
      } else {
        setDisplayValue(value[0].label);
      }
    } else if (value) {
      setDisplayValue(value.label);
    }
  }, [value]);

  return (
    <>
      {editable ? (
        <Input
          ref={inputElement}
          disabled={disabled}
          placeholder={placeholder}
          onChange={() => onChange(inputElement.current?.value ?? '')}
          value={displayValue}
          data-testid="input"
        />
      ) : (
        <ReadonlyInput isCompact={isCompact}>
          {placeholderIcon && <Icon name={placeholderIcon} size="xs"></Icon>}
          {displayValue}
        </ReadonlyInput>
      )}
    </>
  );
};
