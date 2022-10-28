import { Icon, IconName } from '@elvia/elvis-icon/react';
import React, { useRef } from 'react';
import { DropdownContext } from '../elvia-dropdown';
import { DropdownValue } from '../elviaDropdown.types';

import { Input, ReadonlyInput } from './dropdownInputStyles';

interface Props {
  placeholder?: string;
  placeholderIcon?: IconName;
  allOptionsSelectedLabel: string;
  allOptionsAreSelected: boolean;
  editable: boolean;
  onChange: (query: string) => void;
}

export const DropdownInput: React.FC<Props> = ({
  placeholder,
  placeholderIcon,
  allOptionsSelectedLabel,
  allOptionsAreSelected,
  editable,
  onChange,
}) => {
  const inputElement = useRef<HTMLInputElement>(null);

  const getDisplayValue = (item: DropdownValue): string => {
    console.log('Value in input: ', item);
    if (Array.isArray(item)) {
      if (allOptionsAreSelected) {
        return allOptionsSelectedLabel;
      } else if (item.length >= 2) {
        return `${item.length} valgte`;
      } else {
        return item[0];
      }
    }

    return item || '';
  };

  return (
    <DropdownContext.Consumer>
      {({ currentVal, isDisabled, isCompact }) => {
        <>
          {editable ? (
            <Input
              ref={inputElement}
              disabled={isDisabled}
              placeholder={placeholder}
              onChange={() => onChange(inputElement.current?.value ?? '')}
              value={getDisplayValue(currentVal)}
              data-testid="input"
            />
          ) : (
            <ReadonlyInput isCompact={isCompact ?? false}>
              {placeholderIcon && <Icon name={placeholderIcon} size="xs"></Icon>}
              {getDisplayValue(currentVal)}
            </ReadonlyInput>
          )}
        </>;
      }}
    </DropdownContext.Consumer>
  );
};
