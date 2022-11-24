import { BaseProps, useSlot } from '@elvia/elvis-toolbox';
import React, { useEffect, useRef } from 'react';
import { ContextMenuContent, ItemList } from './styledComponents';
import { useRovingFocus } from './useRovingFocus';

interface Props extends BaseProps {
  content?: string | JSX.Element;
  isSelectable: boolean;
  onClose: () => void;
}

export const ContextMenuOverlay = React.forwardRef<HTMLDivElement, Props>(
  ({ content, onClose, isSelectable, className, inlineStyle, webcomponent, ...rest }, ref) => {
    const contentRef = useRef<HTMLDivElement>(null);
    useSlot('content', webcomponent, { ref: contentRef });
    useRovingFocus(contentRef);

    useEffect(() => {
      const onEscape = (keydown: KeyboardEvent) => keydown.key === 'Escape' && onClose();
      document.addEventListener('keydown', onEscape);

      return () => document.removeEventListener('keydown', onEscape, false);
    }, []);

    return (
      <ContextMenuContent
        className={className}
        style={{ ...inlineStyle }}
        ref={ref}
        aria-modal="true"
        {...rest}
      >
        <ItemList onClick={() => onClose()} isSelectable={isSelectable} ref={contentRef}>
          {content}
        </ItemList>
      </ContextMenuContent>
    );
  },
);

ContextMenuOverlay.displayName = 'ContextMenuOverlayComponent';
