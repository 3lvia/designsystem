import React, { KeyboardEvent, useEffect, useState } from 'react';
import { DropdownItem, DropdownValue } from '../publicApi.public';
import { flattenTree, getDropdownItemId } from '../dropdownListUtils';
import DOMPurify from 'dompurify';

import { Input } from './dropdownInputStyles';
import { DropdownIconContainer } from '../styledComponents';

interface Props {
  placeholder?: string;
  placeholderIcon?: string;
  required: boolean;
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
  required,
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
  const [currentValIcon, setCurrentValIcon] = useState<string>();

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
          // A value of null is specifically used when a dropdown item is used as a
          // "no item selected"-option. It should therefore set the input value to empty.
          if (selectedItems[0].value === null) {
            setInputValue('');
          } else {
            setInputValue(selectedItems[0].label);
          }
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
        <DropdownIconContainer
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(placeholderIcon) }}
        ></DropdownIconContainer>
      )}
      {!!currentValIcon && (
        <DropdownIconContainer
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(currentValIcon) }}
        ></DropdownIconContainer>
      )}
      <Input
        required={required}
        aria-activedescendant={focusedItem ? getDropdownItemId(focusedItem.value) : undefined}
        disabled={isDisabled}
        placeholder={placeholder}
        onChange={(ev) => onInputChange(ev.target.value ?? '')}
        value={inputValue}
        onClick={() => onOpenDropdown()}
        onKeyDown={onKeyDown}
        onKeyUp={() => onKeyPress(undefined)}
        readOnly={!isEditable || !dropdownIsOpen}
        $isEditable={isEditable}
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
