import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useConnectedOverlay, useSlot, useFocusTrap } from '@elvia/elvis-toolbox';
import { ContextMenuProps } from './elviaContextMenu.types';
import { Backdrop, TriggerContainer } from './styledComponents';
import { mapPositionToHorizontalPosition } from './mapPosition';
import { ContextMenuOverlay } from './contextMenuOverlay';

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
  className,
  webcomponent,
  ...rest
}) => {
  const popoverRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const { trapFocus, releaseFocusTrap } = useFocusTrap();

  useSlot('trigger', webcomponent, { ref: triggerRef });

  const {
    isShowing: isOverlayShowing,
    setIsShowing: setIsOverlayShowing,
    updatePreferredPosition,
  } = useConnectedOverlay(triggerRef, popoverRef, {
    horizontalPosition: mapPositionToHorizontalPosition(horizontalPosition),
    verticalPosition: verticalPosition,
    alignWidths: false,
  });

  useEffect(() => {
    if (isShowing !== isOverlayShowing) {
      setIsOverlayShowing(isShowing);
    }
  }, [isShowing]);

  /* Saving the original focused element before the popover is opened, and then returning focus to that
  element when the popover is closed. */
  useEffect(() => {
    const originalFocusedElement = document.activeElement as HTMLElement;

    if (isOverlayShowing) {
      handleOnOpen();
      setTimeout(() => updatePreferredPosition());
    } else if (!isOverlayShowing) {
      handleOnClose();
    }

    return () => originalFocusedElement?.focus();
  }, [isOverlayShowing]);

  const handleOnOpen = () => {
    onOpen?.();
    webcomponent?.triggerEvent('onOpen');

    trapFocus(popoverRef);
  };

  const handleOnClose = () => {
    onClose?.();
    webcomponent?.triggerEvent('onClose');

    releaseFocusTrap();
  };

  return (
    <>
      <TriggerContainer
        onClick={() => setIsOverlayShowing(!isOverlayShowing)}
        overlayIsOpen={isOverlayShowing}
        ref={triggerRef}
      >
        {trigger}
      </TriggerContainer>

      {isOverlayShowing &&
        createPortal(
          <>
            <Backdrop onClick={() => setIsOverlayShowing(false)} />
            <ContextMenuOverlay
              content={content}
              isSelectable={isSelectable}
              ref={popoverRef}
              onClose={() => setIsOverlayShowing(false)}
              className={className}
              inlineStyle={inlineStyle}
              webcomponent={webcomponent}
              {...rest}
            />
          </>,
          document.body,
        )}
    </>
  );
};

export default ContextMenu;
