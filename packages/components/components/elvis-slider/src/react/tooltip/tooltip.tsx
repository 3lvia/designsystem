import { FormFieldSizes } from '@elvia/elvis-toolbox';
import React from 'react';

import { BothSliders, Side } from '../elvia-slider.types';
import { TooltipPopup, TooltipWrapper } from './tooltipStyles';

interface Props {
  value: BothSliders<number>;
  position: number;
  side?: Side;
  unit?: string;
  size: FormFieldSizes;
}

export const Tooltip: React.FC<Props> = ({ side = 'left', position, value, unit, size }) => {
  const getTooltipContent = (side: Side = 'left') => {
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
      <TooltipPopup data-testid={`${side}-tooltip-popup`} position="top" role="tooltip" fadeOut={false}>
        {getTooltipContent(side)}
      </TooltipPopup>
    </TooltipWrapper>
  );
};
