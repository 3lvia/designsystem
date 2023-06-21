import styled from 'styled-components';
import { TooltipPopup as TooltipPopupBase } from '@elvia/elvis-toolbox';
import { Sides } from '../elvia-slider.types';

interface TooltipWrapperProps {
  side: Sides;
}

export const TooltipWrapper = styled.span<TooltipWrapperProps>`
  position: absolute;
  top: -36px;
  transform: ${({ side }) => (side === 'left' ? 'translateX(-50%)' : 'translateX(50%)')};
`;

export const TooltipPopup = styled(TooltipPopupBase).attrs(() => ({
  role: 'tooltip',
}))`
  && {
    max-width: unset;
    position: relative;
    user-select: none;
  }
`;
