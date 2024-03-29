import { useConnectedOverlay, useFocusTrap, useSlot, useUpdateEffect } from '@elvia/elvis-toolbox';
import React, { useEffect, useRef, useState } from 'react';

import { ContextMenuOverlay } from './contextMenuOverlay';
import { ContextMenuProps } from './elviaContextMenu.types';
import { mapPositionToHorizontalPosition } from './mapPosition';
import { TriggerContainer } from './styledComponents';

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

    // Sync internal state with prop, if the context menu is only toggled
    // through the prop (and not through a regular click on the trigger element.)
    if (isShowing) {
      setFadeOut(false);
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
      <TriggerContainer
        onClick={toggleVisibility}
        ref={triggerRef}
        triggerDisplay={display}
        isShowing={isOverlayShowing}
      >
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
