import { BaseProps, useRovingFocus, useSlot } from '@elvia/elvis-toolbox';
import React from 'react';

import { ItemList } from './styledComponents';

interface Props extends BaseProps {
  content: React.ReactNode;
  isSelectable: boolean;
  toggleVisibility: () => void;
}

export const ContextMenuContent = ({
  content,
  isSelectable,
  toggleVisibility,
  className,
  inlineStyle,
  webcomponent,
  ...rest
}: Props) => {
  const { ref: contentRef } = useRovingFocus<HTMLDivElement>({ dir: 'vertical' });
  useSlot('content', webcomponent, { ref: contentRef });

  return (
    <ItemList
      className={className}
      style={{ ...inlineStyle }}
      onKeyDown={(ev) => {
        if (['Enter', 'Space', 'Tab'].includes(ev.code)) {
          ev.preventDefault();
          toggleVisibility();
        }
      }}
      onClick={() => toggleVisibility()}
      isSelectable={isSelectable}
      ref={contentRef}
      role="menu"
      {...rest}
    >
      {content}
    </ItemList>
  );
};
