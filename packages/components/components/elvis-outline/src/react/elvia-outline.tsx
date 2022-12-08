import { useInputModeDetection } from '@elvia/elvis-toolbox';
import React, { useEffect, useState } from 'react';

import { OutlineProps } from './elviaOutline.types';
import { GlobalOutlineReset, StyledOutline } from './styledComponents';

export const Outline: React.FC<OutlineProps> = ({ inlineStyle, className }) => {
  const [domRect, setDomRect] = useState<DOMRect>();
  const [borderRadius, setBorderRadius] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const { isMouse: usingMouse } = useInputModeDetection();

  const setPosition = () => {
    const pos = document.activeElement?.getBoundingClientRect();

    if (pos) {
      setDomRect(pos);
    }
  };

  const calculateBorderRadius = () => {
    let radius = getComputedStyle(document.activeElement as HTMLElement).borderRadius;
    radius = radius.substring(0, radius.length - 2);
    setBorderRadius(Math.max(4, +radius));
  };

  useEffect(() => {
    const onFocus = (): void => {
      setIsScrolling(false);
      setPosition();
      calculateBorderRadius();
    };

    const removeOutline = (ev?: Event | FocusEvent) => {
      if (ev instanceof FocusEvent && ev?.relatedTarget) {
        return;
      }

      setDomRect(undefined);
    };

    const onScroll = (): void => {
      setPosition();
      setIsScrolling(true);
    };

    document.addEventListener('focus', onFocus, true);
    document.addEventListener('blur', removeOutline, true);
    document.addEventListener('scroll', onScroll, true);
    window.addEventListener('resize', removeOutline);

    return () => {
      document.removeEventListener('focus', onFocus, true);
      document.removeEventListener('blur', removeOutline, true);
      document.removeEventListener('scroll', onScroll, true);
      window.removeEventListener('resize', removeOutline);
    };
  }, []);

  return (
    <>
      <GlobalOutlineReset />
      {!usingMouse && domRect && (
        <StyledOutline
          data-testid="outline"
          className={className}
          animate={!isScrolling}
          style={{
            ...inlineStyle,
            transform: `translate(${domRect.left}px, ${domRect.top}px)`,
            width: `${domRect.width}px`,
            height: `${domRect.height}px`,
            borderRadius: `${borderRadius}px`,
          }}
        />
      )}
    </>
  );
};

export default Outline;
