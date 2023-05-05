import { Icon, IconName } from '@elvia/elvis-icon/react';
import React, { KeyboardEvent, useEffect, useState } from 'react';
import { DropdownItem, DropdownValue } from '../elviaDropdown.types';
import { flattenTree, getDropdownItemId } from '../dropdownListUtils';
import { getThemeColor } from '@elvia/elvis-colors';

import { Input } from './dropdownInputStyles';

interface Props {
  placeholder?: string;
  placeholderIcon?: IconName;
  allOptionsSelectedLabel: string;
  isEditable: boolean;
  isDisabled: boolean;
  items: DropdownItem[];
  onChange: (query: string) => void;
  onKeyPress: (ev?: KeyboardEvent<HTMLInputElement>) => void;
  dropdownIsOpen: boolean;
  onOpenDropdown: () => void;
  currentVal?: DropdownValue | null;
  focusedItem?: DropdownItem;
  id?: string;
  ariaLabel?: string;
}

export const DropdownInput: React.FC<Props> = ({
  placeholder,
  placeholderIcon,
  allOptionsSelectedLabel,
  isEditable,
  onChange,
  isDisabled,
  items,
  onKeyPress,
  dropdownIsOpen,
  onOpenDropdown,
  currentVal,
  focusedItem,
  id,
  ariaLabel,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [currentValIcon, setCurrentValIcon] = useState<IconName>();

  const onInputChange = (inputValue: string): void => {
    onChange(inputValue);
    setInputValue(inputValue);
  };

  const onKeyDown = (ev: KeyboardEvent<HTMLInputElement>): void => {
    if (dropdownIsOpen) {
      onKeyPress(ev);
    } else if (['Space', 'Enter', 'ArrowUp', 'ArrowDown'].includes(ev.code)) {
      ev.preventDefault();
      onOpenDropdown();
    }
  };

  const updateCurrentValIcon = (): void => {
    if (typeof currentVal === 'string') {
      setCurrentValIcon(flattenTree(items).find((item) => item.value === currentVal)?.icon);
    } else {
      setCurrentValIcon(undefined);
    }
  };

  useEffect(() => {
    const updateInputValue = () => {
      const selectedItems = flattenTree(items).filter((item) => {
        if (Array.isArray(currentVal)) {
          return currentVal.includes(item.value);
        }
        return currentVal === item.value;
      });

      if (isEditable && dropdownIsOpen) {
        setInputValue('');
      } else {
        if (
          Array.isArray(currentVal) &&
          currentVal.length === flattenTree(items).filter((item) => !item.isDisabled && !item.children).length
        ) {
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
    updateCurrentValIcon();
  }, [currentVal, items, dropdownIsOpen]);

  return (
    <>
      {placeholderIcon && !inputValue && (
        <Icon
          name={placeholderIcon}
          size="xs"
          color={isDisabled ? getThemeColor('text-disabled-1') : getThemeColor('text-3')}
        />
      )}
      {!!currentValIcon && (
        <Icon
          name={currentValIcon}
          color={isDisabled ? getThemeColor('text-disabled-1') : getThemeColor('text-1')}
        />
      )}
      <Input
        aria-activedescendant={focusedItem ? getDropdownItemId(focusedItem.value) : undefined}
        disabled={isDisabled}
        placeholder={placeholder}
        onChange={(ev) => onInputChange(ev.target.value ?? '')}
        value={inputValue}
        onClick={() => onOpenDropdown()}
        onKeyDown={onKeyDown}
        onKeyUp={() => onKeyPress(undefined)}
        readOnly={!isEditable || !dropdownIsOpen}
        role="combobox"
        aria-autocomplete="none"
        aria-haspopup="true"
        aria-expanded={dropdownIsOpen}
        aria-disabled={isDisabled}
        aria-controls={id}
        aria-label={ariaLabel}
      />
    </>
  );
};
