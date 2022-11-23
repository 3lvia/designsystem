import React, { MouseEvent, useEffect, useState } from 'react';
import { Checkbox } from '../checkbox/checkbox';
import { DropdownItemStyles } from '../dropdown-item/dropdownItemStyles';
import { flattenTree, getValueAsList } from '../dropdownListUtils';
import { DropdownItem, DropdownValue, ValueType } from '../elviaDropdown.types';
import { Divider } from './dropdownOverlayStyles';

interface SelectAllOptionProps {
  item: DropdownItem;
  focusedValue?: ValueType;
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

  const preventInputElementBlur = (ev: MouseEvent<HTMLDivElement>): void => {
    ev.preventDefault();
  };

  const getSelectableItems = (): DropdownItem[] => {
    return flattenTree(items).filter((item) => !item.isDisabled && !item.children);
  };

  useEffect(() => {
    const valueList = getValueAsList(selectedItems);

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
        onMouseDown={preventInputElementBlur}
        isFocused={focusedValue === item.value}
        isCompact={isCompact}
        id={`ewc-dropdown-item-${item.value}`}
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
