import { useBreakpoint } from '@elvia/elvis-toolbox';
import { RefObject, useEffect } from 'react';

interface Props {
  overlayRef: RefObject<HTMLElement>;
  isModalOpen: boolean;
}

export const usePositioning = ({ overlayRef, isModalOpen }: Props) => {
  const isGtMobile = useBreakpoint('gt-mobile');

  useEffect(() => {
    const positionOverlay = () => {
      const { current } = overlayRef;
      if (!current) {
        return;
      }
      current.style.position = 'fixed';
      current.style.maxWidth = 'unset';
      if (!isGtMobile) {
        current.style.top = '0';
        current.style.left = '0';
        current.style.right = '0';
        current.style.bottom = '0';
      } else {
        const { height, width } = current.getBoundingClientRect();

        current.style.top = `calc(50% - ${height / 2}px)`;
        current.style.left = `calc(50% - ${width / 2}px)`;
        current.style.right = 'unset';
        current.style.bottom = 'unset';
      }
    };
    positionOverlay();

    const { current } = overlayRef;
    if (!current) {
      return;
    }

    const mo = new MutationObserver(positionOverlay);
    const ro = new ResizeObserver(positionOverlay);
    mo.observe(current, { childList: true, subtree: true });
    ro.observe(document.body);

    return () => {
      mo.disconnect();
      ro.disconnect();
    };
  }, [isModalOpen, isGtMobile]);
};
