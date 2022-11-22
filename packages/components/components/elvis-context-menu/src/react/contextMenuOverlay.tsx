import { BaseProps, useSlot } from '@elvia/elvis-toolbox';
import React, { useEffect, useRef } from 'react';
import { ContextMenuContent, ItemList } from './styledComponents';
import { useRovingFocus } from './useRovingFocus';

interface Props extends BaseProps {
  content?: string | JSX.Element;
  disableAutoClose: boolean;
  onClose: () => void;
  hasDivider: boolean;
  isSelectable: boolean;
}

export const ContextMenuOverlay = React.forwardRef<HTMLDivElement, Props>(
  (
    {
      content,
      disableAutoClose,
      onClose,
      hasDivider,
      isSelectable,
      className,
      inlineStyle,
      webcomponent,
      ...rest
    },
    ref,
  ) => {
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
        data-testid="popover-content"
        {...rest}
      >
        <ItemList
          onClick={() => !disableAutoClose && onClose()}
          hasDivider={hasDivider}
          isSelectable={isSelectable}
          ref={contentRef}
        >
          {content}
        </ItemList>
      </ContextMenuContent>
    );
  },
);

ContextMenuOverlay.displayName = 'ContextMenuOverlayComponent';
