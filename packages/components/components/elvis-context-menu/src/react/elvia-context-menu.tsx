import { useSlot } from '@elvia/elvis-toolbox';
import {
  FloatingOverlay,
  FloatingPortal,
  autoUpdate,
  flip,
  offset,
  shift,
  useFloating,
  useTransitionStyles,
} from '@floating-ui/react';
import React, { useEffect, useRef, useState } from 'react';

import { ContextMenuContent } from './ContextMenuContent';
import { ContextMenuProps } from './elviaContextMenu.types';
import { mapPosition } from './mapPosition';
import { TriggerContainer } from './styledComponents';
import { useCloseOnEsc } from './useCloseOnEsc';
import { useFocusTrap } from './useFocusTrap';

export const ContextMenu: React.FC<ContextMenuProps> = ({
  content = '',
  horizontalPosition = 'left',
  verticalPosition = 'bottom',
  isSelectable = false,
  isShowing = false,
  onClose,
  onOpen,
  trigger,
  inlineStyle,
  display = 'inline-block',
  anchorPosition,
  className,
  webcomponent,
  ...rest
}) => {
  const triggerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(isShowing);

  useSlot('trigger', webcomponent, { ref: triggerRef });

  const { refs, floatingStyles, context } = useFloating({
    placement: mapPosition(verticalPosition, horizontalPosition),
    open: isOpen,
    onOpenChange: setIsOpen,
    elements: {
      reference: triggerRef.current,
    },
    middleware: [offset({ mainAxis: 8 }), flip(), shift()],
    whileElementsMounted: autoUpdate,
    transform: false,
  });

  const { isMounted, styles: transitionStyles } = useTransitionStyles(context, {
    duration: 300,
    common: {
      transitionTimingFunction: 'ease',
      zIndex: 99999,
      maxWidth: 'calc(100% - 16px)',
    },
    close: {
      opacity: 0,
      transform: 'scale(.9)',
    },
    open: {
      opacity: 1,
      transform: 'scale(1)',
    },
  });

  const handleOnOpen = () => {
    onOpen?.();
    webcomponent?.triggerEvent('onOpen');
  };

  const handleOnClose = () => {
    onClose?.();
    webcomponent?.triggerEvent('onClose');
  };

  useEffect(() => {
    if (isShowing !== isOpen) {
      setIsOpen(isShowing);
    }
  }, [isShowing]);

  const toggleVisibility = () => {
    if (isOpen) {
      setIsOpen(false);
      handleOnClose();
    } else {
      setIsOpen(true);
      handleOnOpen();
    }
  };

  useCloseOnEsc({ isOpen, setIsOpen, handleOnClose });
  useFocusTrap(refs.floating, isOpen);

  return (
    <>
      <TriggerContainer
        onClick={toggleVisibility}
        ref={triggerRef}
        triggerDisplay={display}
        isShowing={isMounted}
      >
        {trigger}
      </TriggerContainer>

      {isMounted && (
        <FloatingPortal preserveTabOrder={false}>
          <FloatingOverlay onClick={toggleVisibility} />
          <div
            style={{
              ...floatingStyles,
              ...transitionStyles,
              ...(anchorPosition
                ? {
                    top: anchorPosition.top,
                    left: anchorPosition.left,
                  }
                : {}),
            }}
            ref={refs.setFloating}
          >
            <ContextMenuContent
              content={content}
              isSelectable={isSelectable}
              toggleVisibility={toggleVisibility}
              className={className}
              inlineStyle={inlineStyle}
              webcomponent={webcomponent}
              {...rest}
            />
          </div>
        </FloatingPortal>
      )}
    </>
  );
};
