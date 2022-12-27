import React, { forwardRef, ReactNode, useEffect, useState } from 'react';
import { createPortal, flushSync } from 'react-dom';
import { Backdrop } from '../backdrop/backdrop';
import { exitDuration, OverlayContainer } from './overlayStyles';

interface OverlayProps {
  onClose: () => void;
  startFade?: boolean;
  hasBackdrop?: boolean;
  hasAnimation?: boolean;
  children: ReactNode;
  id?: string;
}

/**
 * A HOC that can be used with the useConnectedOverlay hook to create positioned connected overlays.
 * To enable fade out when the overlay is removed from the DOM, use the `onClose` prop to set the visible
 * state, and start fade out by setting the `startFade` prop to `true`.
 *
 * @example
 * export const Component: FC<Props> = () => {
 *   const connectedElementRef = useRef<HTMLDivElement>(null);
 *   const popoverRef = useRef<HTMLDivElement>(null);
 *   const { isShowing, setIsShowing } = useConnectedOverlay(connectedElementRef, popoverRef);
 *   const [ fadeOut, setFadeOut ] = useState(false);
 *   ...
 *
 *   return (
 *     ...
 *     { isShowing && (
 *       <Overlay onClose={() => setIsShowing(false)} startFade={fadeOut}>
 *         ...
 *         <button onClick={() => setFadeOut(true)}>Close overlay</button>
 *         ...
 *       </Overlay>
 *     )}
 *   )
 * }
 *
 * @since 2.1.0
 */
export const Overlay = forwardRef<HTMLDivElement, OverlayProps>(
  ({ onClose, startFade = false, hasBackdrop = true, hasAnimation = true, id, children }, ref) => {
    const [fadeOut, setFadeOut] = useState(false);
    const [isDestroyed, setIsDestroyed] = useState(false);

    const animateOut = (): void => {
      setFadeOut(true);
      setTimeout(
        () => {
          if (!isDestroyed) {
            flushSync(() => onClose());
          }
        },
        hasAnimation ? exitDuration : 0,
      );
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
        {hasBackdrop && <Backdrop onClick={() => animateOut()} data-testid="backdrop" />}
        <OverlayContainer ref={ref} fadeOut={fadeOut} noAnimation={!hasAnimation} id={id}>
          {children}
        </OverlayContainer>
      </>,
      document.body,
    );
  },
);

Overlay.displayName = 'OverlayComponent';
