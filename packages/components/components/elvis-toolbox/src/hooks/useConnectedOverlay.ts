import { Dispatch, RefObject, SetStateAction, useEffect, useState } from 'react';
import { isSsr } from '../isSsr';

interface WindowRect {
  height: number;
  width: number;
}

type VerticalPosition = 'bottom' | 'center' | 'top';
type HorizontalPosition = 'left' | 'center' | 'right';

interface Options {
  offset: number;
  alignWidths: boolean;
  verticalPosition: VerticalPosition;
  horizontalPosition: HorizontalPosition;
}

const defaultOptions: Options = {
  offset: 8,
  alignWidths: true,
  verticalPosition: 'bottom',
  horizontalPosition: 'center',
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
): [
  boolean,
  Dispatch<SetStateAction<boolean>>,
  (verticalPosition: VerticalPosition, horizontalPosition: HorizontalPosition) => void,
] => {
  const opts: Options = { ...defaultOptions, ...options };
  const [isShowing, setIsShowing] = useState(false);

  /** Get screen dimensions based on device */
  const getScreenDimensions = (): WindowRect | null => {
    if (isSsr()) {
      return null;
    }
    if (navigator.userAgent.toLowerCase().includes('android') && window.visualViewport) {
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

    const alignCenter = () => {
      overlay.top = `${hostRect.top + (hostRect.height - overlayRect.height) / 2 + scrollOffsetY}px`;
    };

    const alignTop = () => {
      overlay.top = `${hostRect.top - opts.offset - overlayRect.height + scrollOffsetY}px`;
    };

    if (opts.verticalPosition === 'bottom') {
      hostRect.bottom + opts.offset + overlayRect.height < window.height ? alignBottom() : alignTop();
    } else if (opts.verticalPosition === 'center') {
      alignCenter();
    } else {
      hostRect.top - opts.offset - overlayRect.height > 0 ? alignTop() : alignBottom();
    }
  };

  const alignHorizontally = (
    overlay: CSSStyleDeclaration,
    hostRect: DOMRect,
    scrollOffsetX: number,
    overlayRect: DOMRect,
    window: WindowRect,
  ): void => {
    const alignLeft = () => {
      overlay.left = `${hostRect.left - opts.offset - overlayRect.width + scrollOffsetX}px`;
    };

    const alignCenter = () => {
      overlay.left = `${hostRect.left + (hostRect.width - overlayRect.width) / 2 + scrollOffsetX}px`;
    };

    const alignRight = () => {
      overlay.left = `${hostRect.right + opts.offset + scrollOffsetX}px`;
    };

    if (opts.horizontalPosition === 'left') {
      hostRect.left - opts.offset - overlayRect.width > 0 ? alignLeft() : alignRight();
    } else if (opts.horizontalPosition === 'center') {
      alignCenter();
    } else {
      hostRect.right + opts.offset + overlayRect.width < window.width ? alignRight() : alignLeft();
    }
  };

  const positionPopover = (): void => {
    const overlayStyle = overlayContainer.current?.style;
    const overlayRect = overlayContainer.current?.getBoundingClientRect();
    const hostRect = connectedElement.current?.getBoundingClientRect();
    const windowRect = getScreenDimensions();
    const scrollOffsetY = window.scrollY;
    const scrollOffsetX = window.scrollX;

    if (overlayStyle && overlayRect && hostRect && windowRect) {
      alignVertically(overlayStyle, hostRect, scrollOffsetY, overlayRect, windowRect);
      alignHorizontally(overlayStyle, hostRect, scrollOffsetX, overlayRect, windowRect);

      if (opts.alignWidths) {
        overlayStyle.width = `${hostRect.width}px`;
      }
    }
  };

  const updatePosition = (
    verticalPosition: VerticalPosition,
    horizontalPosition: HorizontalPosition,
  ): void => {
    opts.verticalPosition = verticalPosition;
    opts.horizontalPosition = horizontalPosition;
    positionPopover();
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

      positionPopover();
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

  return [isShowing, setIsShowing, updatePosition];
};
