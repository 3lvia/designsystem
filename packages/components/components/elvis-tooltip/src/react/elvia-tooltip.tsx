import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useConnectedOverlay, isSsr, TooltipPopup, useSlot, useCurrentTheme } from '@elvia/elvis-toolbox';
import { TooltipPosition, TooltipProps } from './elviaTooltip.types';
import { TriggerContainer } from './styledComponents';
import { mapPositionToHorizontalPosition, mapPositionToVerticalPosition } from './mapPosition';

export const Tooltip: React.FC<TooltipProps> = ({
  content = '',
  display = 'inline-block',
  isDisabled = false,
  position = 'top',
  showDelay = 400,
  trigger,
  triggerAreaRef,
  inlineStyle,
  className,
  webcomponent,
}) => {
  let timeoutId = 0;
  const [isDestroyed, setIsDestroyed] = useState(false);
  const { ref: triggerRef } = useSlot<HTMLDivElement>('trigger', webcomponent);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [fadeOut, setFadeOut] = useState(false);
  const [actualPosition, setActualPosition] = useState<TooltipPosition>(position);
  const { isShowing, setIsShowing, verticalPosition, horizontalPosition, updatePreferredPosition } =
    useConnectedOverlay(triggerRef, overlayRef, {
      alignWidths: false,
      verticalPosition: mapPositionToVerticalPosition(position),
      horizontalPosition: mapPositionToHorizontalPosition(position),
      offset: 14,
    });
  useSlot('content', webcomponent, {
    useEffectDependencies: [isShowing],
    ref: overlayRef,
  });
  const { currentTheme } = useCurrentTheme(overlayRef);

  const onOpen = (delay = true): void => {
    if (isSsr()) {
      setFadeOut(false);
      setIsShowing(true);
    } else {
      timeoutId = window.setTimeout(
        () => {
          if (!isDestroyed) {
            setFadeOut(false);
            setIsShowing(true);
          }
        },
        delay ? showDelay : 0,
      );
    }
  };

  const onClose = (): void => {
    if (!isSsr()) {
      window.clearTimeout(timeoutId);
    }
    setFadeOut(true);
  };

  const onAnimationEnd = () => {
    if (fadeOut) {
      setIsShowing(false);
    }
  };

  useEffect(() => {
    const triggerArea = triggerAreaRef?.current ? triggerAreaRef.current : triggerRef.current;
    if (!triggerArea) {
      return;
    }

    const onHover = () => onOpen();
    const onFocus = () => onOpen(false);
    const close = () => onClose();

    triggerArea.addEventListener('mouseenter', onHover);
    triggerArea.addEventListener('mouseleave', close);
    triggerArea.addEventListener('focus', onFocus);
    triggerArea.addEventListener('blur', close);

    return () => {
      triggerArea.removeEventListener('mouseenter', onHover);
      triggerArea.removeEventListener('mouseleave', close);
      triggerArea.removeEventListener('focus', onFocus);
      triggerArea.removeEventListener('blur', close);
    };
  }, [triggerAreaRef, triggerAreaRef?.current, triggerRef, triggerRef?.current]);

  /* Update on position change and content change */
  const getContentMutationObserver = (): MutationObserver => {
    const observer = new MutationObserver(() => {
      updatePreferredPosition(
        mapPositionToVerticalPosition(position),
        mapPositionToHorizontalPosition(position),
      );
    });
    if (overlayRef.current) {
      observer.observe(overlayRef.current, {
        childList: true,
        subtree: true,
        characterData: true,
        attributes: true,
      });
    }

    return observer;
  };

  useEffect(() => {
    if (!isShowing) {
      return;
    }
    const observer = getContentMutationObserver();
    updatePreferredPosition();
    return () => observer.disconnect();
  }, [isShowing, position]);

  /** Update arrow position when overlay hook adjusts position */
  useEffect(() => {
    let newActualPosition: TooltipPosition = 'top';
    if (horizontalPosition === 'left' || horizontalPosition === 'right') {
      newActualPosition = horizontalPosition;
    } else if (verticalPosition === 'bottom') {
      newActualPosition = verticalPosition;
    }
    setActualPosition(newActualPosition);
  }, [verticalPosition, horizontalPosition]);

  useEffect(() => () => setIsDestroyed(true), []);

  return (
    <>
      <TriggerContainer style={{ display: display }} ref={triggerRef}>
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
            aria-live="polite"
            theme={currentTheme}
          >
            {content}
          </TooltipPopup>,
          document.body,
        )}
    </>
  );
};

export default Tooltip;
