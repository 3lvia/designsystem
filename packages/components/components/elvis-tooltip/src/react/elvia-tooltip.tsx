import { TooltipPopup, isSsr, useSlot } from '@elvia/elvis-toolbox';
import { FloatingPortal, autoUpdate, flip, offset, shift, useFloating } from '@floating-ui/react';
import React, { useEffect, useRef, useState } from 'react';

import { TooltipPosition, TooltipProps } from './elviaTooltip.types';
import { TooltipContent, TriggerContainer } from './styledComponents';

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
  // We use this ref for delay, since delay is used within an event listener.
  // The regular prop would not receive an updated value inside the event listener.
  const delayAmount = useRef(showDelay);
  const isDestroyed = useRef(false);
  const { ref: triggerRef } = useSlot<HTMLDivElement>('trigger', webcomponent);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [fadeOut, setFadeOut] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const { refs, floatingStyles, placement } = useFloating({
    placement: position,
    open: isOpen,
    onOpenChange: setIsOpen,
    elements: {
      reference: triggerRef.current,
    },
    middleware: [offset({ mainAxis: 14 }), flip(), shift()],
    whileElementsMounted: autoUpdate,
    transform: false,
  });

  useSlot('content', webcomponent, {
    useEffectDependencies: [isOpen],
    ref: overlayRef,
  });

  const onOpen = (delay = true): void => {
    if (isSsr()) {
      setFadeOut(false);
      setIsOpen(true);
    } else {
      window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(
        () => {
          if (!isDestroyed.current) {
            setFadeOut(false);
            setIsOpen(true);
          }
        },
        delay ? delayAmount.current : 0,
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
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const triggerArea = triggerAreaRef?.current ?? triggerRef.current;
    if (!triggerArea) {
      return;
    }

    const onHover = () => onOpen();
    const onFocus = () => onOpen(false);
    const close = () => onClose();

    triggerArea.addEventListener('mouseenter', onHover);
    triggerArea.addEventListener('mouseleave', close);
    triggerArea.addEventListener('focusin', onFocus);
    triggerArea.addEventListener('focusout', close);

    return () => {
      triggerArea.removeEventListener('mouseenter', onHover);
      triggerArea.removeEventListener('mouseleave', close);
      triggerArea.removeEventListener('focusin', onFocus);
      triggerArea.removeEventListener('focusout', close);
    };
  }, [triggerAreaRef, triggerAreaRef?.current, triggerRef, triggerRef?.current]);

  useEffect(() => {
    delayAmount.current = showDelay;
  }, [showDelay]);

  useEffect(() => {
    isDestroyed.current = false;
    return () => {
      isDestroyed.current = true;
    };
  }, []);

  return (
    <>
      <TriggerContainer style={{ display: display }} ref={triggerRef}>
        {trigger}
      </TriggerContainer>

      {isOpen && !isDisabled && (
        <FloatingPortal>
          <TooltipPopup
            aria-live="polite"
            className={className ?? ''}
            fadeOut={fadeOut}
            onAnimationEnd={onAnimationEnd}
            position={placement as TooltipPosition}
            ref={refs.setFloating}
            style={{ ...floatingStyles, ...inlineStyle }}
          >
            <TooltipContent ref={overlayRef}>{content}</TooltipContent>
          </TooltipPopup>
        </FloatingPortal>
      )}
    </>
  );
};
