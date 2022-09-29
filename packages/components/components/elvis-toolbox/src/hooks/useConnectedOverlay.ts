import { Dispatch, RefObject, SetStateAction, useEffect, useState } from 'react';
import { isSsr } from '../isSsr';

interface WindowRect {
  height: number;
  width: number;
  innerWidth: number;
}

export type OverlayVerticalPosition = 'bottom' | 'center' | 'top';
export type OverlayHorizontalPosition = 'left' | 'center' | 'right';

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
    if (isSsr()) {
      return null;
    }
    if (navigator.userAgent.toLowerCase().includes('android') && window.visualViewport) {
      return {
        height: window.visualViewport.height,
        width: window.visualViewport.width,
        innerWidth: window.visualViewport.width,
      };
    } else {
      return { height: window.innerHeight, width: window.innerWidth, innerWidth: document.body.clientWidth };
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
      setVerticalPosition('bottom');
    };

    const alignCenter = () => {
      overlay.top = `${hostRect.top + (hostRect.height - overlayRect.height) / 2 + scrollOffsetY}px`;
      setVerticalPosition('center');
    };

    const alignTop = () => {
      overlay.top = `${hostRect.top - opts.offset - overlayRect.height + scrollOffsetY}px`;
      setVerticalPosition('top');
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
    overlayWidth: number,
    window: WindowRect,
  ): void => {
    const alignLeft = () => {
      overlay.left = `${hostRect.left - opts.offset - overlayWidth + scrollOffsetX}px`;
      setHorizontalPosition('left');
    };

    const alignCenter = () => {
      const overlayLeft = hostRect.left + (hostRect.width - overlayWidth) / 2 + scrollOffsetX;
      if (overlayLeft <= windowPadding) {
        overlay.left = `${windowPadding}px`;
      } else if (overlayLeft + overlayWidth >= window.innerWidth - windowPadding) {
        overlay.left = `${window.innerWidth - overlayWidth - windowPadding}px`;
      } else {
        overlay.left = `${hostRect.left + (hostRect.width - overlayWidth) / 2 + scrollOffsetX}px`;
      }
      setHorizontalPosition('center');
    };

    const alignRight = () => {
      overlay.left = `${hostRect.right + opts.offset + scrollOffsetX}px`;
      setHorizontalPosition('right');
    };

    if (opts.horizontalPosition === 'left') {
      hostRect.left - opts.offset - overlayWidth > 0 ? alignLeft() : alignRight();
    } else if (opts.horizontalPosition === 'center') {
      alignCenter();
    } else {
      hostRect.right + opts.offset + overlayWidth < window.width ? alignRight() : alignLeft();
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
      if (opts.alignWidths) {
        overlayStyle.width = `${hostRect.width}px`;
      }

      alignVertically(overlayStyle, hostRect, scrollOffsetY, overlayRect, windowRect);
      alignHorizontally(
        overlayStyle,
        hostRect,
        scrollOffsetX,
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

  return { isShowing, setIsShowing, verticalPosition, horizontalPosition, updatePreferredPosition };
};
