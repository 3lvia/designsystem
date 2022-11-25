import { BaseProps, useSlot } from '@elvia/elvis-toolbox';
import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Backdrop, ContextMenuContent, ItemList } from './styledComponents';
import { useRovingFocus } from './useRovingFocus';

interface Props extends BaseProps {
  content?: string | JSX.Element;
  isSelectable: boolean;
  onClose: () => void;
}

export const ContextMenuOverlay = React.forwardRef<HTMLDivElement, Props>(
  ({ content, onClose, isSelectable, className, inlineStyle, webcomponent, ...rest }, ref) => {
    const contentRef = useRovingFocus<HTMLDivElement>();
    useSlot('content', webcomponent, { ref: contentRef });

    const handleKeyDown = (ev: React.KeyboardEvent<HTMLElement>): void => {
      if (['Enter', 'Space', 'Escape', 'Tab'].includes(ev.code)) {
        ev.preventDefault();
        onClose();
      }
    };

    useEffect(() => {
      if (contentRef.current) {
        const items = contentRef.current.querySelectorAll('button, a');
        if (items.length) {
          items.item(0)?.classList.add('ewc-context-menu__first-child');
          items.item(items.length - 1)?.classList.add('ewc-context-menu__last-child');
        }
      }
    }, [contentRef.current]);

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
