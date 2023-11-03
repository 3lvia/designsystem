import { Dispatch, RefObject, SetStateAction, useLayoutEffect, useState } from 'react';

interface WindowRect {
  height: number;
  width: number;
  innerWidth: number;
  scrollX: number;
  scrollY: number;
}

export type OverlayVerticalPosition = 'top' | 'top-inside' | 'center' | 'bottom-inside' | 'bottom';
export type OverlayHorizontalPosition = 'left' | 'left-inside' | 'center' | 'right-inside' | 'right';

interface Options {
  offset: number;
  alignWidths: boolean;
  verticalPosition: OverlayVerticalPosition;
  horizontalPosition: OverlayHorizontalPosition;
}

const defaultOptions: Options = {
  offset: 8,
  alignWidths: true,
  verticalPosition: 'bottom',
  horizontalPosition: 'center',
};

interface OverlayApi {
  isShowing: boolean;
  setIsShowing: Dispatch<SetStateAction<boolean>>;
  verticalPosition: OverlayVerticalPosition;
  horizontalPosition: OverlayHorizontalPosition;
  updatePreferredPosition: (
    verticalPosition?: OverlayVerticalPosition,
    horizontalPosition?: OverlayHorizontalPosition,
  ) => void;
}

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
 *   const { isShowing, setIsShowing } = useConnectedOverlay(connectedElementRef, popoverRef);
 *   ...
 * }
 *
 * @since 2.1.0
 */
export const useConnectedOverlay = (
  connectedElement: RefObject<HTMLElement>,
  overlayContainer: RefObject<HTMLElement>,
  options?: Partial<Options>,
): OverlayApi => {
  const windowPadding = 8;
  const opts: Options = { ...defaultOptions, ...options };
  const [verticalPosition, setVerticalPosition] = useState<OverlayVerticalPosition>(opts.verticalPosition);
  const [horizontalPosition, setHorizontalPosition] = useState<OverlayHorizontalPosition>(
    opts.horizontalPosition,
  );
  const [isShowing, setIsShowing] = useState(false);

  /** Get screen dimensions based on device */
  const getScreenDimensions = (): WindowRect | null => {
    if (navigator.userAgent.toLowerCase().includes('android') && window.visualViewport) {
      return {
        height: window.visualViewport.height,
        width: window.visualViewport.width,
        innerWidth: window.visualViewport.width,
        scrollX: window.scrollX,
        scrollY: window.scrollY,
      };
    } else {
      return {
        height: window.innerHeight,
        width: window.innerWidth,
        innerWidth: document.body.clientWidth,
        scrollX: window.scrollX,
        scrollY: window.scrollY,
      };
    }
  };

  const alignVertically = (
    overlay: CSSStyleDeclaration,
    hostRect: DOMRect,
    overlayRect: DOMRect,
    windowRect: WindowRect,
  ): void => {
    const clampVertically = (overlayTop: number): number => {
      if (overlayTop <= windowPadding + windowRect.scrollY) {
        return Math.min(windowPadding + windowRect.scrollY, hostRect.top + windowRect.scrollY);
      } else if (overlayTop + overlayRect.height >= windowRect.height + windowRect.scrollY - windowPadding) {
        return Math.max(
          windowRect.height + windowRect.scrollY - overlayRect.height - windowPadding,
          hostRect.bottom + windowRect.scrollY - overlayRect.height,
        );
      }

      return overlayTop;
    };

    const setTop = (value: number): void => {
      overlay.top = `${value}px`;
      overlay.bottom = 'unset';
    };

    const setBottom = (value: number): void => {
      overlay.top = 'unset';
      overlay.bottom = `${value}px`;
    };

    const alignTop = () => {
      setBottom(windowRect.height - hostRect.top + opts.offset - windowRect.scrollY);
      setVerticalPosition('top');
    };

    const alignTopInside = () => {
      const overlayTop = hostRect.top + windowRect.scrollY;
      setTop(clampVertically(overlayTop));
      setVerticalPosition('top-inside');
    };

    const alignCenter = () => {
      const overlayTop = hostRect.top + (hostRect.height - overlayRect.height) / 2 + windowRect.scrollY;
      setTop(clampVertically(overlayTop));
      setVerticalPosition('center');
    };

    const alignBottomInside = () => {
      const overlayTop = hostRect.bottom - overlayRect.height + windowRect.scrollY;
      setTop(clampVertically(overlayTop));
      setVerticalPosition('bottom');
    };

    const alignBottom = () => {
      setTop(hostRect.bottom + opts.offset + windowRect.scrollY);
      setVerticalPosition('bottom');
    };

    const alignMostVisible = () => {
      const overflowTop = hostRect.top - opts.offset - overlayRect.height;
      const overflowBottom = windowRect.height - (hostRect.bottom + opts.offset + overlayRect.height);

      overflowBottom < overflowTop ? alignTop() : alignBottom();
    };

    if (opts.verticalPosition === 'top') {
      hostRect.top - opts.offset - overlayRect.height > 0 ? alignTop() : alignMostVisible();
    } else if (opts.verticalPosition === 'top-inside') {
      alignTopInside();
    } else if (opts.verticalPosition === 'center') {
      alignCenter();
    } else if (opts.verticalPosition === 'bottom-inside') {
      alignBottomInside();
    } else {
      hostRect.bottom + opts.offset + overlayRect.height < windowRect.height
        ? alignBottom()
        : alignMostVisible();
    }
  };

  const alignHorizontally = (
    overlay: CSSStyleDeclaration,
    hostRect: DOMRect,
    overlayWidth: number,
    windowRect: WindowRect,
  ): void => {
    const clampHorizontally = (overlayLeft: number): number => {
      if (overlayLeft <= windowPadding + windowRect.scrollX) {
        return Math.min(windowPadding + windowRect.scrollX, hostRect.left + windowRect.scrollX);
      } else if (overlayLeft + overlayWidth >= windowRect.innerWidth + windowRect.scrollX - windowPadding) {
        return Math.max(
          windowRect.innerWidth + windowRect.scrollX - overlayWidth - windowPadding,
          hostRect.right + windowRect.scrollX - overlayWidth,
        );
      }

      return overlayLeft;
    };

    const setLeft = (value: number): void => {
      overlay.left = `${value}px`;
      overlay.right = 'unset';
    };

    const setRight = (value: number): void => {
      overlay.left = 'unset';
      overlay.right = `${value}px`;
    };

    const alignLeft = () => {
      setRight(windowRect.innerWidth - hostRect.left + opts.offset - windowRect.scrollX);
      setHorizontalPosition('left');
    };

    const alignLeftInside = () => {
      const overlayLeft = hostRect.left + windowRect.scrollX;
      setLeft(clampHorizontally(overlayLeft));
      setHorizontalPosition('left-inside');
    };

    const alignCenter = () => {
      const overlayLeft = hostRect.left + (hostRect.width - overlayWidth) / 2 + windowRect.scrollX;
      setLeft(clampHorizontally(overlayLeft));
      setHorizontalPosition('center');
    };

    const alignRightInside = () => {
      const overlayLeft = hostRect.right - overlayWidth + windowRect.scrollX;
      setLeft(clampHorizontally(overlayLeft));
      setHorizontalPosition('right-inside');
    };

    const alignRight = () => {
      setLeft(hostRect.right + opts.offset + windowRect.scrollX);
      setHorizontalPosition('right');
    };

    const alignMostVisible = () => {
      const overflowLeft = hostRect.left - opts.offset - overlayWidth;
      const overflowRight = windowRect.width - (hostRect.right + opts.offset + overlayWidth);

      overflowRight < overflowLeft ? alignLeft() : alignRight();
    };

    if (opts.horizontalPosition === 'left') {
      hostRect.left - opts.offset - overlayWidth > 0 ? alignLeft() : alignMostVisible();
    } else if (opts.horizontalPosition === 'left-inside') {
      alignLeftInside();
    } else if (opts.horizontalPosition === 'center') {
      alignCenter();
    } else if (opts.horizontalPosition === 'right-inside') {
      alignRightInside();
    } else {
      hostRect.right + opts.offset + overlayWidth < windowRect.width ? alignRight() : alignMostVisible();
    }
  };

  const positionPopover = (): void => {
    const overlayStyle = overlayContainer.current?.style;
    const overlayRect = overlayContainer.current?.getBoundingClientRect();
    const hostRect = connectedElement.current?.getBoundingClientRect();
    const windowRect = getScreenDimensions();

    if (overlayStyle && overlayRect && hostRect && windowRect) {
      if (opts.alignWidths) {
        overlayStyle.width = `${hostRect.width}px`;
      }

      alignVertically(overlayStyle, hostRect, overlayRect, windowRect);
      alignHorizontally(
        overlayStyle,
        hostRect,
        opts.alignWidths ? hostRect.width : overlayRect.width,
        windowRect,
      );
    }
  };

  const updatePreferredPosition = (
    verticalPosition?: OverlayVerticalPosition,
    horizontalPosition?: OverlayHorizontalPosition,
  ): void => {
    if (verticalPosition) {
      opts.verticalPosition = verticalPosition;
    }
    if (horizontalPosition) {
      opts.horizontalPosition = horizontalPosition;
    }
    positionPopover();
  };

  useLayoutEffect(() => {
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

    /**
     * Perform initial alignment on the next render cycle,
     * so that we allow the content of the overlay to stabilize.
     * Web components passed as slots may in some cases get injected
     * into the DOM a bit later than native HTML. This causes the width
     * and height of the overlay to be incorrect when positioning the overlay.
     */
    setTimeout(() => {
      alignOverlayWithConnectedElement();
    });

    window.addEventListener('resize', alignOverlayWithConnectedElement);
    window.addEventListener('scroll', alignOverlayWithConnectedElement);

    return () => {
      window.removeEventListener('resize', alignOverlayWithConnectedElement);
      window.removeEventListener('scroll', alignOverlayWithConnectedElement);
    };
  }, [isShowing]);

  return {
    isShowing,
    setIsShowing,
    verticalPosition,
    horizontalPosition,
    updatePreferredPosition,
  };
};
