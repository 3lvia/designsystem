import { Dispatch, RefObject, SetStateAction, useEffect, useState } from 'react';

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

export const useConnectedOverlay = (
  connectedElement: RefObject<HTMLElement>,
  overlayContainer: RefObject<HTMLElement>,
  options?: Partial<Options>,
): [boolean, Dispatch<SetStateAction<boolean>>] => {
  const opts: Options = { ...defaultOptions, ...options };
  const [isShowing, setIsShowing] = useState(false);

  /** Get screen dimensions based on device */
  const getScreenDimensions = (): WindowRect | null => {
    if (typeof window === 'undefined' || typeof navigator === 'undefined') {
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
    opts: Options,
    scrollOffsetY: number,
    overlayRect: DOMRect,
    windowRect: WindowRect,
  ): void => {
    const alignBottom = () => {
      overlay.top = `${hostRect.bottom + opts.offset + scrollOffsetY}px`;
    };

    const alignTop = () => {
      overlay.top = `${hostRect.top - opts.offset - overlayRect.height + scrollOffsetY}px`;
    };

    if (opts.verticalPosition === 'bottom') {
      hostRect.bottom + opts.offset + overlayRect.height < windowRect.height ? alignBottom() : alignTop();
    } else {
      hostRect.top - opts.offset - overlayRect.height > 0 ? alignTop() : alignBottom();
    }
  };

  const alignHorizontally = (overlay: CSSStyleDeclaration, hostRect: DOMRect): void => {
    // Extend useEffect to support horizontal positioning
    overlay.left = `${hostRect.left}px`;
  };

  const alignOverlayWithConnectedElement = (): void => {
    if (!isShowing) {
      return;
    }

    const overlay = overlayContainer.current?.style;
    const overlayRect = overlayContainer.current?.getBoundingClientRect();
    const hostRect = connectedElement.current?.getBoundingClientRect();
    const windowRect = getScreenDimensions();
    const scrollOffsetY = window.scrollY;

    if (overlay && overlayRect && hostRect && windowRect) {
      alignVertically(overlay, hostRect, opts, scrollOffsetY, overlayRect, windowRect);
      alignHorizontally(overlay, hostRect);

      if (opts.alignWidths) {
        overlay.width = `${hostRect.width}px`;
      }
    }
  };

  useEffect(() => {
    if (isShowing) {
      alignOverlayWithConnectedElement();
      window.addEventListener('scroll', alignOverlayWithConnectedElement);
      window.addEventListener('resize', alignOverlayWithConnectedElement);
    } else {
      window.removeEventListener('scroll', alignOverlayWithConnectedElement);
      window.removeEventListener('resize', alignOverlayWithConnectedElement);
    }
  }, [isShowing]);

  useEffect(() => {
    return () => {
      window.removeEventListener('scroll', alignOverlayWithConnectedElement);
      window.removeEventListener('resize', alignOverlayWithConnectedElement);
    };
  }, []);

  return [isShowing, setIsShowing];
};
