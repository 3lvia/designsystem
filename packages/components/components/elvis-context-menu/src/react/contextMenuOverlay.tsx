import { BaseProps, useSlot, useRovingFocus } from '@elvia/elvis-toolbox';
import React from 'react';
import { createPortal } from 'react-dom';
import { Backdrop, ContextMenuContent, ItemList } from './styledComponents';

interface Props extends BaseProps {
  content?: string | JSX.Element;
  isSelectable: boolean;
  onClose: () => void;
}

export const ContextMenuOverlay = React.forwardRef<HTMLDivElement, Props>(
  ({ content, onClose, isSelectable, className, inlineStyle, webcomponent, ...rest }, ref) => {
    const contentRef = useRovingFocus<HTMLDivElement>({ dir: 'vertical' });
    useSlot('content', webcomponent, { ref: contentRef });

    const handleKeyDown = (ev: React.KeyboardEvent<HTMLElement>): void => {
      if (['Enter', 'Space', 'Escape', 'Tab'].includes(ev.code)) {
        ev.preventDefault();
        onClose();
      }
    };

    return createPortal(
      <>
        <Backdrop onClick={() => onClose()} />
        <ContextMenuContent className={className} style={{ ...inlineStyle }} ref={ref} {...rest}>
          <ItemList
            onClick={() => onClose()}
            onKeyDown={handleKeyDown}
            isSelectable={isSelectable}
            ref={contentRef}
            role="menu"
          >
            {content}
          </ItemList>
        </ContextMenuContent>
      </>,
      document.body,
    );
  },
);

ContextMenuOverlay.displayName = 'ContextMenuOverlayComponent';
