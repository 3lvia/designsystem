import { Dispatch, RefObject, SetStateAction, useEffect, useState } from 'react';
import { isSsr } from '../isSsr';

interface WindowRect {
  height: number;
  width: number;
}

interface Options {
  offset: number;
  alignWidths: boolean;
  verticalPosition: 'bottom' | 'top'; // TODO: Make a single type for this for the whole repo
}

const defaultOptions: Options = {
  offset: 8,
  alignWidths: true,
  verticalPosition: 'bottom',
};

/**
 * A React hook that allows creating an overlay that is positioned relative to an element.
 * Should be used in combination with React portals.
 *
 * @param connectedElement The ref element that the overlay should be connected to.
 * @param overlayContainer The overlay element.
 * @param options An optional object for configuring the behavior of the overlay.
 *
 *
 * @example
 * export const Component: FC<Props> = () => {
 *   const connectedElementRef = useRef<HTMLDivElement>(null);
 *   const popoverRef = useRef<HTMLDivElement>(null);
 *   const [isShowing, setIsShowing] = useConnectedOverlay(connectedElementRef, popoverRef);
 *   ...
 * }
 *
 * @since 2.1.0
 */
export const useConnectedOverlay = (
  connectedElement: RefObject<HTMLElement>,
  overlayContainer: RefObject<HTMLElement>,
  options?: Partial<Options>,
): [boolean, Dispatch<SetStateAction<boolean>>] => {
  const opts: Options = { ...defaultOptions, ...options };
  const [isShowing, setIsShowing] = useState(false);

  /** Get screen dimensions based on device */
  const getScreenDimensions = (): WindowRect | null => {
    if (isSsr()) {
      return null;
    }
    if (navigator.userAgent.toLowerCase().includes('android')) {
      return { height: window.visualViewport.height, width: window.visualViewport.width };
    } else {
      return { height: window.innerHeight, width: window.innerWidth };
    }
  };

  const alignVertically = (
    overlay: CSSStyleDeclaration,
    hostRect: DOMRect,
    scrollOffsetY: number,
    overlayRect: DOMRect,
    window: WindowRect,
  ): void => {
    const alignBottom = () => {
      overlay.top = `${hostRect.bottom + opts.offset + scrollOffsetY}px`;
    };

    const alignTop = () => {
      overlay.top = `${hostRect.top - opts.offset - overlayRect.height + scrollOffsetY}px`;
    };

    if (opts.verticalPosition === 'bottom') {
      hostRect.bottom + opts.offset + overlayRect.height < window.height ? alignBottom() : alignTop();
    } else {
      hostRect.top - opts.offset - overlayRect.height > 0 ? alignTop() : alignBottom();
    }
  };

  const alignHorizontally = (overlay: CSSStyleDeclaration, hostRect: DOMRect): void => {
    // Extend useEffect to support horizontal positioning
    overlay.left = `${hostRect.left}px`;
  };

  useEffect(() => {
    if (!isShowing) {
      return;
    }

    // This method needs to be inside the useEffect for the removeEventListener to work
    const alignOverlayWithConnectedElement = (): void => {
      if (!isShowing) {
        return;
      }

      const overlayStyle = overlayContainer.current?.style;
      const overlayRect = overlayContainer.current?.getBoundingClientRect();
      const hostRect = connectedElement.current?.getBoundingClientRect();
      const windowRect = getScreenDimensions();
      const scrollOffsetY = window.scrollY;

      if (overlayStyle && overlayRect && hostRect && windowRect) {
        alignVertically(overlayStyle, hostRect, scrollOffsetY, overlayRect, windowRect);
        alignHorizontally(overlayStyle, hostRect);

        if (opts.alignWidths) {
          overlayStyle.width = `${hostRect.width}px`;
        }
      }
    };

    alignOverlayWithConnectedElement();

    if (isSsr()) {
      return;
    }

    window.addEventListener('resize', alignOverlayWithConnectedElement);
    window.addEventListener('scroll', alignOverlayWithConnectedElement);

    return () => {
      window.removeEventListener('resize', alignOverlayWithConnectedElement);
      window.removeEventListener('scroll', alignOverlayWithConnectedElement);
    };
  }, [isShowing]);

  return [isShowing, setIsShowing];
};
