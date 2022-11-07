import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useConnectedOverlay, isSsr, TooltipPopup, useSlot } from '@elvia/elvis-toolbox';
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

  const onOpen = (delay = true): void => {
    if (isSsr()) {
      setFadeOut(false);
      setIsShowing(true);
    } else {
      window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(
        () => {
          setFadeOut(false);
          setIsShowing(true);
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

  /** If triggerAreaRef is provided, add mouseEnter and mouseLeave listeners and use them to
   * open and close the tooltip */
  useEffect(() => {
    const triggerArea = triggerAreaRef?.current;
    if (!triggerArea) {
      return;
    }

    const onMouseEnter = () => onOpen();
    const onMouseLeave = () => onClose();

    triggerArea.addEventListener('mouseenter', onMouseEnter);
    triggerArea.addEventListener('mouseleave', onMouseLeave);
    return () => {
      triggerArea.removeEventListener('mouseenter', onMouseEnter);
      triggerArea.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [triggerAreaRef, triggerAreaRef?.current]);

  /* Update on position change and content change */
  const updatePositionOnChange = (): MutationObserver => {
    const observer = new MutationObserver(() => {
      const newPosition: TooltipPosition = position || 'top';
      updatePreferredPosition(
        mapPositionToVerticalPosition(newPosition),
        mapPositionToHorizontalPosition(newPosition),
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
    const observer = updatePositionOnChange();
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

  return (
    <>
      <TriggerContainer
        style={{ display: display }}
        onMouseEnter={() => !triggerAreaRef?.current && onOpen(true)}
        onMouseLeave={() => !triggerAreaRef?.current && onClose()}
        onFocus={() => !triggerAreaRef?.current && onOpen(false)}
        onBlur={() => !triggerAreaRef?.current && onClose()}
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
            aria-live="polite"
          >
            {content}
          </TooltipPopup>,
          document.body,
        )}
    </>
  );
};

export default Tooltip;
