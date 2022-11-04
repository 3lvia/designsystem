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
    if (text.includes('Norge')) {
      setTimeout(() => {
        console.log(elementRef.current?.scrollWidth);
        console.log(elementRef.current?.offsetWidth);
      }, 1000);
    }
  }, [text]);

  return (
    <DropdownItemValue ref={elementRef}>
      <Tooltip trigger={text} content={text} isDisabled={!isOverflowing} />
    </DropdownItemValue>
  );
};
