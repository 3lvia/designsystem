import { useIsOverflowing } from '@elvia/elvis-toolbox';
import { Tooltip } from '@elvia/elvis-tooltip/react';
import React from 'react';
import { DropdownItem } from '../elviaDropdown.types';
import { DropdownItemValue, TooltipContainer, TooltipTextContainer } from './dropdownItemStyles';

interface Props {
  item: DropdownItem;
  focusedValue?: DropdownItem;
}

export const ItemValue: React.FC<Props> = ({ item, focusedValue }) => {
  const { isOverflowing, ref: containerRef } = useIsOverflowing<HTMLDivElement>();

  return (
    <TooltipContainer noRightContent={!item.status && !item.children}>
      <Tooltip
        trigger={
          <TooltipTextContainer ref={containerRef}>
            <DropdownItemValue>{item.label}</DropdownItemValue>
          </TooltipTextContainer>
        }
        content={item.label}
        isDisabled={!isOverflowing.horizontal || focusedValue?.value !== item.value}
        display="inline"
      />
    </TooltipContainer>
  );
};
