import { useIsOverflowing } from '@elvia/elvis-toolbox';
import { Tooltip } from '@elvia/elvis-tooltip/react';
import React from 'react';
import { DropdownItem } from '../elviaDropdown.types';
import { DropdownItemValue, TooltipContainer, TooltipTextContainer } from './dropdownItemStyles';

interface Props {
  item: DropdownItem;
}

export const ItemValue: React.FC<Props> = ({ item }) => {
  const { isOverflowing, ref: containerRef } = useIsOverflowing<HTMLDivElement>();

  return (
    <TooltipContainer paddingRight={item.status || item.children ? 0 : 16}>
      <Tooltip
        trigger={
          <TooltipTextContainer ref={containerRef}>
            <DropdownItemValue>{item.label}</DropdownItemValue>
          </TooltipTextContainer>
        }
        content={item.label}
        isDisabled={!isOverflowing.horizontal}
        display="inline"
      />
    </TooltipContainer>
  );
};
