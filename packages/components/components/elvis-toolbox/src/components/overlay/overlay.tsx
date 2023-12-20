import React, { forwardRef, ReactNode, useEffect, useRef, useState } from 'react';
import { createPortal, flushSync } from 'react-dom';
import { useCurrentTheme } from '../../hooks/useCurrentTheme';
import { Backdrop } from '../backdrop/backdrop';
import { exitDuration, OverlayContainer, OverlayDOMPosition } from './overlayStyles';

interface OverlayProps {
  onClose: () => void;
  center?: boolean;
  startFade?: boolean;
  hasBackdrop?: boolean;
  hasAnimation?: boolean;
  useGlobalTheme?: boolean;
  children: ReactNode;
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
  (
    {
      onClose,
      startFade = false,
      hasBackdrop = true,
      hasAnimation = true,
      center = false,
      useGlobalTheme,
      children,
    },
    ref,
  ) => {
    const [fadeOut, setFadeOut] = useState(false);
    const isDestroyed = useRef(false);
    const overlayDOMPositionRef = useRef<HTMLDivElement>(null);

    const { themeClass } = useCurrentTheme(overlayDOMPositionRef);

    const animateOut = (): void => {
      setFadeOut(true);
      setTimeout(
        () => {
          if (!isDestroyed.current) {
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
      isDestroyed.current = false;
      const closeOnEsc = (ev: KeyboardEvent) => ev.code === 'Escape' && animateOut();

      window.addEventListener('keydown', closeOnEsc);

      return () => {
        window.removeEventListener('keydown', closeOnEsc);
        isDestroyed.current = true;
      };
    }, []);

    return (
      <OverlayDOMPosition ref={overlayDOMPositionRef}>
        {createPortal(
          <>
            {hasBackdrop && <Backdrop onClick={() => animateOut()} data-testid="backdrop" />}
            <OverlayContainer
              ref={ref}
              fadeOut={fadeOut}
              noAnimation={!hasAnimation}
              center={center}
              className={!useGlobalTheme ? themeClass : ''}
            >
              {children}
            </OverlayContainer>
          </>,
          document.body,
        )}
      </OverlayDOMPosition>
    );
  },
);

Overlay.displayName = 'OverlayComponent';
