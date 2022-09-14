import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useConnectedOverlay } from '@elvia/elvis-toolbox';
import { TooltipPosition, TooltipProps } from './elviaTooltip.types';
import { arrowSize, TooltipPopup, TriggerContainer } from './styledComponents';

export const Tooltip: React.FC<TooltipProps> = ({
  className,
  isDisabled = false,
  inlineStyle,
  content = '',
  position = 'top',
  showDelay = 400,
  trigger,
  webcomponent,
}) => {
  let timeoutId = 0;
  const triggerRef = useRef<HTMLSpanElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [fadeOut, setFadeOut] = useState(false);
  const [actualPosition, setActualPosition] = useState<TooltipPosition>(position);
  const [isShowing, setIsShowing, verticalPosition, horizontalPosition, updatePosition] = useConnectedOverlay(
    triggerRef,
    overlayRef,
    {
      alignWidths: false,
      verticalPosition: position === 'bottom' ? 'bottom' : position === 'top' ? 'top' : 'center',
      horizontalPosition: position === 'left' ? 'left' : position === 'right' ? 'right' : 'center',
      offset: 8 + arrowSize,
    },
  );

  const onOpen = (delay = true): void => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(
      () => {
        setFadeOut(false);
        setIsShowing(true);
      },
      delay ? showDelay : 0,
    );
  };

  const onClose = (): void => {
    window.clearTimeout(timeoutId);
    setFadeOut(true);
  };

  const onAnimationEnd = () => {
    if (fadeOut) {
      setIsShowing(false);
    }
  };

  /** Get trigger slot */
  useEffect(() => {
    if (!webcomponent) {
      return;
    }
    if (triggerRef.current && webcomponent.getSlot('trigger')) {
      triggerRef.current.innerHTML = '';
      triggerRef.current.appendChild(webcomponent.getSlot('trigger'));
    }
  }, [webcomponent]);

  /** Update position from new position-prop */
  useEffect(() => {
    const newPosition: TooltipPosition = position || 'top';
    setActualPosition(newPosition);
    updatePosition(
      newPosition === 'bottom' ? 'bottom' : newPosition === 'top' ? 'top' : 'center',
      newPosition === 'left' ? 'left' : newPosition === 'right' ? 'right' : 'center',
    );
  }, [position]);

  /** Get content slot when the overlayRef is populated */
  useEffect(() => {
    if (isShowing && overlayRef.current && webcomponent?.getSlot('content')) {
      overlayRef.current.innerHTML = '';
      overlayRef.current.appendChild(webcomponent.getSlot('content'));

      /** We need to update the position, because the dimensions of the
       * overlay has changed.
       */
      updatePosition();
    }
  }, [isShowing]);

  /** Update arrow position when overlay hook adjusts position */
  useEffect(() => {
    setActualPosition(
      verticalPosition === 'bottom'
        ? 'bottom'
        : horizontalPosition === 'left'
        ? 'left'
        : horizontalPosition === 'right'
        ? 'right'
        : 'top',
    );
  }, [verticalPosition, horizontalPosition]);

  return (
    <>
      <TriggerContainer
        onMouseEnter={() => onOpen(true)}
        onMouseLeave={onClose}
        onFocus={() => onOpen(false)}
        onBlur={onClose}
        ref={triggerRef}
      >
        {trigger}
      </TriggerContainer>
      {isShowing &&
        !isDisabled &&
        createPortal(
          <TooltipPopup
            position={actualPosition}
            ref={overlayRef}
            className={className ?? ''}
            style={{ ...inlineStyle }}
            fadeOut={fadeOut}
            onAnimationEnd={onAnimationEnd}
          >
            {content}
          </TooltipPopup>,
          document.body,
        )}
    </>
  );
};

export default Tooltip;
