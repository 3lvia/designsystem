import { Tooltip } from '@elvia/elvis-tooltip/react';
import React, { useMemo, useRef } from 'react';
import { DropdownItem } from '../publicApi.public';
import { DropdownItemValue, TooltipContainer, TooltipTextContainer } from './dropdownItemStyles';

interface Props {
  item: DropdownItem;
  focusedValue?: DropdownItem;
  isRootOverlay?: boolean;
}

export const ItemValue: React.FC<Props> = ({ item, focusedValue, isRootOverlay }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isOverflowing = useMemo(() => {
    const { current } = containerRef;
    if (current) {
      return current.scrollWidth > current.offsetWidth;
    }
    return false;
  }, [item.label, containerRef?.current]);

  return (
    <TooltipContainer noRightContent={!item.status && !item.children} isRootOverlay={isRootOverlay}>
      {isOverflowing && !item.isDisabled && focusedValue?.value === item.value ? (
        <Tooltip
          trigger={
            <TooltipTextContainer ref={containerRef}>
              <DropdownItemValue>{item.label}</DropdownItemValue>
            </TooltipTextContainer>
          }
          content={item.label}
          display="inline"
        />
      ) : (
        <TooltipTextContainer ref={containerRef}>
          <DropdownItemValue>{item.label}</DropdownItemValue>
        </TooltipTextContainer>
      )}
    </TooltipContainer>
  );
};
