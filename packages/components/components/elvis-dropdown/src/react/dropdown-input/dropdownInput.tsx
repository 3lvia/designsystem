import { Icon, IconName } from '@elvia/elvis-icon/react';
import React, { KeyboardEvent, useEffect, useState } from 'react';
import { DropdownItem, DropdownValue } from '../elviaDropdown.types';

import { Input } from './dropdownInputStyles';

interface Props {
  placeholder?: string;
  placeholderIcon?: IconName;
  allOptionsSelectedLabel: string;
  editable: boolean;
  isDisabled: boolean;
  items: DropdownItem[];
  onChange: (query: string) => void;
  focusedIndex: number;
  setFocusedIndex: (newIndex: number) => void;
  dropdownIsOpen: boolean;
  onOpenDropdown: () => void;
  currentVal?: DropdownValue | null;
  onItemSelect: (value: string) => void;
}

export const DropdownInput: React.FC<Props> = ({
  placeholder,
  placeholderIcon,
  allOptionsSelectedLabel,
  editable,
  onChange,
  isDisabled,
  items,
  focusedIndex,
  setFocusedIndex,
  dropdownIsOpen,
  onOpenDropdown,
  currentVal,
  onItemSelect,
}) => {
  const [inputValue, setInputValue] = useState('');

  const onInputChange = (inputValue: string): void => {
    onChange(inputValue);
    setInputValue(inputValue);
  };

  const handleOpenKeyboardNavigation = (ev: KeyboardEvent<HTMLInputElement>): void => {
    if (focusedIndex != null && ['Space', 'Enter', 'Tab'].includes(ev.code)) {
      ev.preventDefault();
      const selectedItem = items[focusedIndex];
      onItemSelect(selectedItem.value);
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

  const onKeyDown = (ev: KeyboardEvent<HTMLInputElement>): void => {
    if (dropdownIsOpen) {
      handleOpenKeyboardNavigation(ev);
    } else if (['Space', 'Enter', 'ArrowUp', 'ArrowDown'].includes(ev.code)) {
      onOpenDropdown();
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

      if (editable && dropdownIsOpen) {
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
  }, [currentVal, items, dropdownIsOpen]);

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
        onClick={() => onOpenDropdown()}
        onKeyDown={onKeyDown}
        readOnly={!editable}
        data-testid="input"
      />
    </>
  );
};
