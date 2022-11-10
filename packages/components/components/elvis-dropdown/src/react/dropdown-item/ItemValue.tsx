import { Tooltip } from '@elvia/elvis-tooltip/react';
import React, { useEffect, useRef, useState } from 'react';
import { DropdownItem } from '../elviaDropdown.types';
import { DropdownItemValue, TooltipContainer, TooltipTextContainer } from './dropdownItemStyles';

interface Props {
  item: DropdownItem;
}

export const ItemValue: React.FC<Props> = ({ item }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      const { current } = containerRef;
      if (current) {
        setIsOverflowing(current.scrollWidth > current.offsetWidth);
      }
    });
  }, [item.label]);

  return (
    <TooltipContainer paddingRight={item.status || item.children ? 0 : 16}>
      <Tooltip
        triggerAreaRef={containerRef}
        trigger={
          <TooltipTextContainer ref={containerRef}>
            <DropdownItemValue>{item.label}</DropdownItemValue>
          </TooltipTextContainer>
        }
        content={item.label}
        isDisabled={!isOverflowing}
        display="inline"
      />
    </TooltipContainer>
  );
};
