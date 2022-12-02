import React, { forwardRef, ReactNode, useEffect, useState } from 'react';
import { createPortal, flushSync } from 'react-dom';
import { Backdrop } from '../backdrop/backdrop';
import { OverlayContainer } from './overlayStyles';

interface OverlayProps {
  onClose: () => void;
  startFade?: boolean;
  hasBackdrop?: boolean;
  children: ReactNode;
}

export const Overlay = forwardRef<HTMLDivElement, OverlayProps>(
  ({ onClose, startFade = false, hasBackdrop = true, children, ...rest }, ref) => {
    const [fadeOut, setFadeOut] = useState(false);

    const onAnimationEnd = () => {
      if (fadeOut) {
        flushSync(() => onClose());
      }
    };

    useEffect(() => {
      if (fadeOut !== startFade) {
        setFadeOut(startFade);
      }
    }, [startFade]);

    useEffect(() => {
      const closeOnEsc = (ev: KeyboardEvent) => {
        if (ev.key === 'Escape') {
          setFadeOut(true);
        }
      };

      window.addEventListener('keydown', closeOnEsc);

      return () => {
        window.removeEventListener('keydown', closeOnEsc);
      };
    }, []);

    return createPortal(
      <>
        {hasBackdrop && <Backdrop onClick={() => setFadeOut(true)} />}
        <OverlayContainer ref={ref} fadeOut={fadeOut} onAnimationEnd={onAnimationEnd} {...rest}>
          {children}
        </OverlayContainer>
      </>,
      document.body,
    );
  },
);

Overlay.displayName = 'OverlayComponent';
