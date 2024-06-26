import { useSlot } from '@elvia/elvis-toolbox';
import {
  FloatingPortal,
  autoUpdate,
  flip,
  offset,
  shift,
  useClientPoint,
  useDismiss,
  useFloating,
  useInteractions,
  useTransitionStyles,
} from '@floating-ui/react';
import React, { useEffect, useRef, useState } from 'react';

import { ContextMenuContent } from './ContextMenuContent';
import { ContextMenuProps } from './elviaContextMenu.types';
import { mapPosition } from './mapPosition';
import { TriggerContainer } from './styledComponents';
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

  const updateOpenState = (newState: boolean) => {
    setIsOpen(newState);
    if (newState) {
      handleOnOpen();
    } else {
      handleOnClose();
    }
  };

  const { refs, floatingStyles, context, placement } = useFloating({
    placement: mapPosition(verticalPosition, horizontalPosition),
    open: isOpen,
    onOpenChange: updateOpenState,
    elements: {
      reference: triggerRef.current,
    },
    middleware: [offset({ mainAxis: 8 }), flip(), shift()],
    whileElementsMounted: autoUpdate,
    transform: false,
  });

  // This hook enables the floating element to be positioned based on the anchorPosition prop
  const clientPoint = useClientPoint(context, {
    enabled: !!(anchorPosition?.left && anchorPosition?.top),
    x: anchorPosition?.left,
    y: (anchorPosition?.top ?? 0) - window.scrollY, // Adjust for scroll position so the context menu is not positioned "fixed"
  });

  const dismiss = useDismiss(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([dismiss, clientPoint]);

  const { isMounted, styles: transitionStyles } = useTransitionStyles(context, {
    duration: 300,
    common: {
      transformOrigin: placement.includes('top') ? 'bottom' : 'top',
      transitionTimingFunction: 'ease',
      zIndex: 99999,
      maxWidth: 'calc(100% - 16px)',
    },
    initial: {
      opacity: 0,
      transform: 'scaleY(.9)',
    },
    close: {
      opacity: 0,
      transform: 'scaleY(.9)',
    },
    open: {
      opacity: 1,
      transform: 'scaleY(1)',
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

  useFocusTrap(refs.floating, isOpen);

  return (
    <>
      <TriggerContainer
        onClick={() => updateOpenState(!isOpen)}
        ref={triggerRef}
        triggerDisplay={display}
        {...getReferenceProps()}
      >
        {trigger}
      </TriggerContainer>

      {isMounted && (
        <FloatingPortal preserveTabOrder={false}>
          <div
            style={{
              ...floatingStyles,
              ...transitionStyles,
            }}
            ref={refs.setFloating}
            {...getFloatingProps()}
          >
            <ContextMenuContent
              content={content}
              isSelectable={isSelectable}
              toggleVisibility={() => updateOpenState(!isOpen)}
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
