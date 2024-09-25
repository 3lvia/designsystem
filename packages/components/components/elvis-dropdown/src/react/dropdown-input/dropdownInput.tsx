import { FormFieldInput, FormFieldSizes, LanguageCode } from '@elvia/elvis-toolbox';
import DOMPurify from 'dompurify';
import React, { KeyboardEvent, useEffect, useState } from 'react';

import { flattenTree, getDropdownItemId } from '../dropdownListUtils';
import { DropdownProps } from '../elviaDropdown.types';
import { DropdownItem, DropdownValue } from '../publicApi.public';
import { DropdownIconContainer } from '../styledComponents';

interface Props {
  placeholder?: string;
  placeholderIcon?: string;
  size?: FormFieldSizes;
  isRequired: boolean;
  allOptionsSelectedLabel: string;
  isEditable: boolean;
  isDisabled: boolean;
  items: DropdownItem[];
  onChange: (query: string) => void;
  onKeyPress: (ev?: KeyboardEvent<HTMLInputElement>) => void;
  dropdownIsOpen: boolean;
  onOpenDropdown: () => void;
  lang: LanguageCode;
  currentVal?: DropdownValue | null;
  focusedItem?: DropdownItem;
  id?: string;
  ariaLabel?: string;
  labelTransformation?: DropdownProps['labelTransformation'];
}

export const DropdownInput: React.FC<Props> = ({
  placeholder,
  placeholderIcon,
  size,
  isRequired,
  allOptionsSelectedLabel,
  isEditable,
  onChange,
  isDisabled,
  items,
  onKeyPress,
  dropdownIsOpen,
  onOpenDropdown,
  labelTransformation,
  currentVal,
  focusedItem,
  id,
  ariaLabel,
  lang,
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
    if (typeof currentVal === 'string' || typeof currentVal === 'number') {
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
          setInputValue(`${selectedItems.length + (lang === 'no' ? ' valgte' : ' selected')}`);
        } else if (selectedItems.length === 1) {
          // A value of null is specifically used when a dropdown item is used as a
          // "no item selected"-option. It should therefore set the input value to empty.
          if (selectedItems[0].value === null) {
            setInputValue('');
          } else {
            setInputValue(labelTransformation?.(selectedItems[0].value) ?? selectedItems[0].label);
          }
        } else {
          setInputValue('');
        }
      }
    };

    updateInputValue();
    updateCurrentValIcon();
  }, [currentVal, items, dropdownIsOpen, allOptionsSelectedLabel]);

  return (
    <>
      {placeholderIcon && !inputValue && (
        <DropdownIconContainer
          size={size}
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(placeholderIcon, {
              CUSTOM_ELEMENT_HANDLING: {
                tagNameCheck: /^e-icon$/,
              },
            }),
          }}
        ></DropdownIconContainer>
      )}
      {!!currentValIcon && (
        <DropdownIconContainer
          size={size}
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(currentValIcon, {
              CUSTOM_ELEMENT_HANDLING: {
                tagNameCheck: /^e-icon$/,
              },
            }),
          }}
        ></DropdownIconContainer>
      )}
      <FormFieldInput
        style={{
          flex: 1,
          textOverflow: 'ellipsis',
        }}
        required={isRequired}
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
