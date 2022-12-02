import React, { forwardRef, ReactNode, useEffect, useState } from 'react';
import { createPortal, flushSync } from 'react-dom';
import { Backdrop } from '../backdrop/backdrop';
import { exitDuration, OverlayContainer } from './overlayStyles';

interface OverlayProps {
  onClose: () => void;
  startFade?: boolean;
  hasBackdrop?: boolean;
  children: ReactNode;
}

export const Overlay = forwardRef<HTMLDivElement, OverlayProps>(
  ({ onClose, startFade = false, hasBackdrop = true, children }, ref) => {
    const [fadeOut, setFadeOut] = useState(false);
    const [isDestroyed, setIsDestroyed] = useState(false);

    const animateOut = (): void => {
      setFadeOut(true);
      setTimeout(() => {
        if (!isDestroyed) {
          flushSync(() => onClose());
        }
      }, exitDuration);
    };

    useEffect(() => {
      if (startFade) {
        animateOut();
      }
    }, [startFade]);

    useEffect(() => {
      const closeOnEsc = (ev: KeyboardEvent) => ev.code === 'Escape' && animateOut();

      window.addEventListener('keydown', closeOnEsc);

      return () => {
        window.removeEventListener('keydown', closeOnEsc);
        setIsDestroyed(true);
      };
    }, []);

    return createPortal(
      <>
        {hasBackdrop && <Backdrop onClick={() => animateOut()} />}
        <OverlayContainer ref={ref} fadeOut={fadeOut}>
          {children}
        </OverlayContainer>
      </>,
      document.body,
    );
  },
);

Overlay.displayName = 'OverlayComponent';
