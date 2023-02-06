import React from 'react';

import { TooltipPopup, TooltipWrapper } from './tooltipStyles';

import { Sides } from '../elvia-slider.types';

interface Props {
  side?: Sides;
  position: number;
  content: string;
}

export const Tooltip: React.FC<Props> = ({ side = 'left', position, content }) => {
  return (
    <TooltipWrapper
      side={side}
      style={{
        [side]: `${position}px`,
      }}
    >
      <TooltipPopup data-testid={`${side}-tooltip-popup`} position="top" fadeOut={false}>
        {content}
      </TooltipPopup>
    </TooltipWrapper>
  );
};
