import { Tooltip } from '@elvia/elvis-tooltip/react';
import React, { useEffect, useRef, useState } from 'react';
import { DropdownItemValue } from './dropdownItemStyles';

interface Props {
  text: string;
}

export const ItemValue: React.FC<Props> = ({ text }) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      const { current } = elementRef;
      if (current) {
        setIsOverflowing(current.scrollWidth > current.offsetWidth);
      }
    });
  }, [text]);

  return (
    <DropdownItemValue ref={elementRef}>
      <Tooltip
        triggerAreaRef={elementRef}
        trigger={text}
        content={text}
        isDisabled={!isOverflowing}
        display="inline"
      />
    </DropdownItemValue>
  );
};
