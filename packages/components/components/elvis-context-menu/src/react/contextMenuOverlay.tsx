import { BaseProps, useSlot, useRovingFocus, Overlay } from '@elvia/elvis-toolbox';
import React, { useState } from 'react';
import { ContextMenuContent, ItemList } from './styledComponents';

interface Props extends BaseProps {
  content?: string | JSX.Element;
  isSelectable: boolean;
  onClose: () => void;
}

export const ContextMenuOverlay = React.forwardRef<HTMLDivElement, Props>(
  ({ content, onClose, isSelectable, className, inlineStyle, webcomponent, ...rest }, ref) => {
    const [fadeOut, setFadeOut] = useState(false);
    const { ref: contentRef } = useRovingFocus<HTMLDivElement>({ dir: 'vertical' });
    useSlot('content', webcomponent, { ref: contentRef });

    const handleKeyDown = (ev: React.KeyboardEvent<HTMLElement>): void => {
      if (['Enter', 'Space', 'Tab'].includes(ev.code)) {
        ev.preventDefault();
        setFadeOut(true);
      }
    };

    return (
      <Overlay ref={ref} onClose={onClose} startFade={fadeOut}>
        <ContextMenuContent className={className} style={{ ...inlineStyle }} {...rest}>
          <ItemList
            onClick={() => setFadeOut(true)}
            onKeyDown={handleKeyDown}
            isSelectable={isSelectable}
            ref={contentRef}
            role="menu"
          >
            {content}
          </ItemList>
        </ContextMenuContent>
      </Overlay>
    );
  },
);

ContextMenuOverlay.displayName = 'ContextMenuOverlayComponent';
