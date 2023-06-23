import React from 'react';
import { TooltipPopup, TooltipWrapper } from './tooltipStyles';
import { BothSliders, Sides } from '../elvia-slider.types';
import { FormFieldSizes } from '@elvia/elvis-toolbox';

interface Props {
  value: BothSliders<number>;
  position: number;
  side?: Sides;
  unit?: string;
  size: FormFieldSizes;
}

export const Tooltip: React.FC<Props> = ({ side = 'left', position, value, unit, size }) => {
  const getTooltipContent = (side: Sides = 'left') => {
    const content = side === 'left' ? value.left.toLocaleString() : value.right.toLocaleString();

    return unit ? `${content} ${unit}` : content;
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
