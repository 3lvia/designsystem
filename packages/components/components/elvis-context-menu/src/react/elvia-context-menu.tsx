import React, { useEffect, useRef, useState } from 'react';
import { useConnectedOverlay, useSlot, useFocusTrap, useUpdateEffect } from '@elvia/elvis-toolbox';
import { ContextMenuProps } from './elviaContextMenu.types';
import { TriggerContainer } from './styledComponents';
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
  const [prevFocusedElement, setPrevFocusedElement] = useState<HTMLElement>();
  const [fadeOut, setFadeOut] = useState(false);

  useSlot('trigger', webcomponent, { ref: triggerRef });

  const { isShowing: isOverlayShowing = false, setIsShowing: setIsOverlayShowing } = useConnectedOverlay(
    triggerRef,
    popoverRef,
    {
      horizontalPosition: mapPositionToHorizontalPosition(horizontalPosition),
      verticalPosition: verticalPosition,
      alignWidths: false,
    },
  );

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

  const toggleVisibility = (): void => {
    if (!isOverlayShowing) {
      setIsOverlayShowing(true);
      setFadeOut(false);
    } else {
      setFadeOut(true);
    }
  };

  useEffect(() => {
    if (isShowing !== isOverlayShowing) {
      setIsOverlayShowing(isShowing);
    }
  }, [isShowing]);

  useUpdateEffect(() => {
    if (isOverlayShowing) {
      setPrevFocusedElement(document.activeElement as HTMLElement);
      handleOnOpen();
    } else {
      handleOnClose();
      prevFocusedElement?.focus();
      setPrevFocusedElement(undefined);
    }
  }, [isOverlayShowing]);

  return (
    <>
      <TriggerContainer onClick={toggleVisibility} ref={triggerRef} isShowing={isOverlayShowing}>
        {trigger}
      </TriggerContainer>

      {isOverlayShowing && (
        <ContextMenuOverlay
          content={content}
          isSelectable={isSelectable}
          ref={popoverRef}
          onClose={() => setIsOverlayShowing(false)}
          fadeOut={fadeOut}
          setFadeOut={setFadeOut}
          className={className}
          inlineStyle={inlineStyle}
          webcomponent={webcomponent}
          {...rest}
        />
      )}
    </>
  );
};

export default ContextMenu;
