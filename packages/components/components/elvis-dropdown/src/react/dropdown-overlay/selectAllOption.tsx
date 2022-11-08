import React, { useEffect, useState } from 'react';
import { Checkbox } from '../checkbox/checkbox';
import { DropdownItemStyles } from '../dropdown-item/dropdownItemStyles';
import { flattenTree } from '../dropdownListUtils';
import { DropdownItem, DropdownValue } from '../elviaDropdown.types';
import { Divider } from './dropdownOverlayStyles';

interface SelectAllOptionProps {
  item: DropdownItem;
  focusedValue?: string;
  isCompact?: boolean;
  items: DropdownItem[];
  selectedItems: DropdownValue;
  onClick: () => void;
  onHover: (item: DropdownItem) => void;
}

type CheckboxState = 'checked' | 'indeterminate' | 'none';

export const SelectAllOption: React.FC<SelectAllOptionProps> = ({
  item,
  focusedValue,
  isCompact,
  items,
  selectedItems,
  onClick,
  onHover,
}) => {
  const [checkboxState, setCheckboxState] = useState<CheckboxState>('none');

  const getSelectableItems = (): DropdownItem[] => {
    return flattenTree(items).filter((item) => !item.isDisabled && !item.children);
  };

  useEffect(() => {
    const valueList = Array.isArray(selectedItems) ? selectedItems : selectedItems ? [selectedItems] : [];
    if (valueList.length === 0) {
      setCheckboxState('none');
    } else if (valueList.length === getSelectableItems().length) {
      setCheckboxState('checked');
    } else {
      setCheckboxState('indeterminate');
    }
  }, [items, selectedItems]);

  return (
    <>
      <DropdownItemStyles
        onClick={() => onClick()}
        onMouseEnter={() => onHover(item)}
        isFocused={focusedValue === item.value}
        isCompact={isCompact}
      >
        <Checkbox
          isCompact={isCompact}
          isChecked={checkboxState === 'checked'}
          isIndeterminate={checkboxState === 'indeterminate'}
          isFocused={focusedValue === item.value}
        />
        {item.label}
      </DropdownItemStyles>
      <Divider />
    </>
  );
};
