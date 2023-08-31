import React, { MouseEvent, useEffect, useState } from 'react';
import { Checkbox } from '../checkbox/checkbox';
import { DropdownItemStyles } from '../dropdown-item/dropdownItemStyles';
import { flattenTree, getDropdownItemId, getValueAsList } from '../dropdownListUtils';
import { DropdownItem, DropdownValue, DropdownValueType } from '../elviaDropdown.types';
import { Divider } from './dropdownOverlayStyles';
import { FormFieldSizes } from '@elvia/elvis-toolbox';

interface SelectAllOptionProps {
  item: DropdownItem;
  focusedValue?: DropdownValueType;
  size?: FormFieldSizes;
  items: DropdownItem[];
  selectedItems: DropdownValue;
  onClick: () => void;
  onHover: (item: DropdownItem) => void;
}

type CheckboxState = 'checked' | 'indeterminate' | 'none';

export const SelectAllOption: React.FC<SelectAllOptionProps> = ({
  item,
  focusedValue,
  size,
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
        size={size}
        id={getDropdownItemId(item.value)}
      >
        <Checkbox
          size={size}
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
