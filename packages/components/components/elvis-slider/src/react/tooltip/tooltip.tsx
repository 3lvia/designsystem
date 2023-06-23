import React from 'react';
import { TooltipPopup, TooltipWrapper } from './tooltipStyles';
import { BothSliders, Sides } from '../elvia-slider.types';
import { FormFieldSizes } from '@elvia/elvis-toolbox';

interface Props {
  value: BothSliders<number>;
  position: number;
  side?: Sides;
  suffix?: string;
  unit?: string;
  size: FormFieldSizes;
}

export const Tooltip: React.FC<Props> = ({ side = 'left', position, value, unit, suffix, size }) => {
  const getTooltipContent = (side: Sides = 'left') => {
    const content = side === 'left' ? value.left.toLocaleString() : value.right.toLocaleString();

    if (unit) {
      return `${content}${unit}`;
    } else if (suffix) {
      return `${content} ${suffix}`;
    } else {
      return content;
    }
  };

  return (
    <TooltipWrapper
      $side={side}
      $size={size}
      style={{
        [side]: `${position}px`,
      }}
    >
      <TooltipPopup data-testid={`${side}-tooltip-popup`} position="top" fadeOut={false}>
        {getTooltipContent(side)}
      </TooltipPopup>
    </TooltipWrapper>
  );
};
