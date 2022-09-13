import { useConnectedOverlay } from '@elvia/elvis-toolbox';
import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { TooltipPosition, TooltipProps } from './elviaTooltip.types';
import { TooltipPopup, TriggerContainer } from './styledComponents';

export const Tooltip: React.FC<TooltipProps> = ({
  className,
  disabled = false,
  inlineStyle,
  message = '',
  position = 'top',
  trigger,
  webcomponent,
}) => {
  const triggerRef = useRef<HTMLSpanElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [isShowing, setIsShowing, updatePosition] = useConnectedOverlay(triggerRef, overlayRef, {
    alignWidths: false,
    verticalPosition: position === 'bottom' ? 'bottom' : position === 'top' ? 'top' : 'center',
    horizontalPosition: position === 'left' ? 'left' : position === 'right' ? 'right' : 'center',
  });

  const onMouseEnter = (): void => {
    setIsShowing(true);
  };

  const onMouseLeave = (): void => {
    setIsShowing(false);
  };

  /** Get all slots and place them correctly */
  useEffect(() => {
    if (!webcomponent) {
      return;
    }
    if (triggerRef.current && webcomponent.getSlot('trigger')) {
      triggerRef.current.innerHTML = '';
      triggerRef.current.appendChild(webcomponent.getSlot('trigger'));
    }
  }, [webcomponent]);

  useEffect(() => {
    const newPosition: TooltipPosition = position || 'top';
    updatePosition(
      newPosition === 'bottom' ? 'bottom' : newPosition === 'top' ? 'top' : 'center',
      newPosition === 'left' ? 'left' : newPosition === 'right' ? 'right' : 'center',
    );
  }, [position]);

  return (
    <>
      <TriggerContainer onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} ref={triggerRef}>
        {trigger}
      </TriggerContainer>
      {isShowing &&
        !disabled &&
        createPortal(
          <TooltipPopup
            position={position}
            ref={overlayRef}
            className={className ?? ''}
            style={{ ...inlineStyle }}
          >
            {message}
          </TooltipPopup>,
          document.body,
        )}
    </>
  );
};

export default Tooltip;
