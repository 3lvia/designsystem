import { Tooltip } from '@elvia/elvis-tooltip/react';
import React, { useEffect, useRef, useState } from 'react';
import { DropdownItem } from '../elviaDropdown.types';
import { DropdownItemValue } from './dropdownItemStyles';

interface Props {
  item: DropdownItem;
}

export const ItemValue: React.FC<Props> = ({ item }) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      const { current } = elementRef;
      if (current) {
        setIsOverflowing(current.scrollWidth > current.offsetWidth);
      }
    });
  }, [item.label]);

  return (
    <DropdownItemValue ref={elementRef} paddingRight={item.status || item.children ? 0 : 16}>
      <Tooltip
        triggerAreaRef={elementRef}
        trigger={item.label}
        content={item.label}
        isDisabled={!isOverflowing}
        display="inline"
      />
    </DropdownItemValue>
  );
};
