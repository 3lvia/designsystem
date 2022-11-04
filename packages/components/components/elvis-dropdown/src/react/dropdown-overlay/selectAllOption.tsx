import React, { useEffect, useState } from 'react';
import { Checkbox } from '../checkbox/checkbox';
import { DropdownItemStyles } from '../dropdown-item/dropdownItemStyles';
import { flattenTree } from '../dropdownListUtils';
import { DropdownItem, DropdownValue } from '../elviaDropdown.types';
import { Divider } from './dropdownOverlayStyles';

interface SelectAllOptionProps {
  text: string;
  isCompact?: boolean;
  isFocused: boolean;
  items: DropdownItem[];
  selectedItems: DropdownValue;
  onClick: () => void;
}

type CheckboxState = 'checked' | 'indeterminate' | 'none';

export const SelectAllOption: React.FC<SelectAllOptionProps> = ({
  text,
  isCompact,
  isFocused,
  items,
  selectedItems,
  onClick,
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
      <DropdownItemStyles onClick={() => onClick()} isFocused={isFocused} isCompact={isCompact}>
        <Checkbox
          isCompact={isCompact}
          isChecked={checkboxState === 'checked'}
          isIndeterminate={checkboxState === 'indeterminate'}
          isFocused={isFocused}
        />
        {text}
      </DropdownItemStyles>
      <Divider />
    </>
  );
};
