import { Icon, IconName } from '@elvia/elvis-icon/react';
import React, { KeyboardEvent, useEffect, useState } from 'react';
import { DropdownContext } from '../elvia-dropdown';

import { Input } from './dropdownInputStyles';

interface Props {
  placeholder?: string;
  placeholderIcon?: IconName;
  allOptionsSelectedLabel: string;
  editable: boolean;
  onChange: (query: string) => void;
  onFocusChange: (hasFocus: boolean) => void;
}

export const DropdownInput: React.FC<Props> = ({
  placeholder,
  placeholderIcon,
  allOptionsSelectedLabel,
  editable,
  onChange,
  onFocusChange,
}) => {
  const [inputValue, setInputValue] = useState('');
  const { isDisabled, currentVal, items, focusedIndex, setFocusedIndex, isOpen } =
    React.useContext(DropdownContext);

  const onInputChange = (inputValue: string): void => {
    onChange(inputValue);
    setInputValue(inputValue);
  };

  const onKeyDown = (ev: KeyboardEvent<HTMLInputElement>): void => {
    if (focusedIndex != null && ['Space', 'Enter'].includes(ev.code)) {
      ev.preventDefault();
      // TODO: Select with index
    } else if (ev.code === 'ArrowUp') {
      if (focusedIndex - 1 < 0) {
        setFocusedIndex(items.length - 1);
      } else {
        setFocusedIndex(focusedIndex - 1);
      }
      ev.preventDefault();
    } else if (ev.code === 'ArrowDown') {
      if (focusedIndex + 1 > items.length - 1) {
        setFocusedIndex(0);
      } else {
        setFocusedIndex(focusedIndex + 1);
      }
      ev.preventDefault();
    }
  };

  useEffect(() => {
    const updateInputValue = () => {
      const selectedItems = items.filter((item) => {
        if (Array.isArray(currentVal)) {
          return currentVal.includes(item.value);
        }
        return currentVal === item.value;
      });

      if (editable && isOpen) {
        setInputValue('');
      } else {
        if (Array.isArray(currentVal) && currentVal.length === items.length) {
          setInputValue(allOptionsSelectedLabel);
        } else if (selectedItems.length >= 2) {
          setInputValue(`${selectedItems.length} valgte`);
        } else if (selectedItems.length === 1) {
          setInputValue(selectedItems[0].label);
        } else {
          setInputValue('');
        }
      }
    };

    updateInputValue();
  }, [currentVal, items, isOpen]);

  return (
    <>
      {placeholderIcon && (
        <Icon name={placeholderIcon} size="xs" color={isDisabled ? 'disabled' : 'elvia-off'} />
      )}
      <Input
        disabled={isDisabled}
        placeholder={placeholder}
        onChange={(ev) => onInputChange(ev.target.value ?? '')}
        value={inputValue}
        onFocus={() => onFocusChange(true)}
        onKeyDown={onKeyDown}
        readOnly={!editable}
        data-testid="input"
      />
    </>
  );
};
