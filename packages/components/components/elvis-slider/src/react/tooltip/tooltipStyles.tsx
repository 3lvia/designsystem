import styled from 'styled-components';
import { FormFieldSizes, TooltipPopup as TooltipPopupBase } from '@elvia/elvis-toolbox';
import { Sides } from '../elvia-slider.types';

interface TooltipWrapperProps {
  side: Sides;
  $inputMode: string;
  size: FormFieldSizes;
}

export const TooltipWrapper = styled.span<TooltipWrapperProps>`
  position: absolute;
  top: -36px;
  top: ${({ $inputMode, size }) => (size === 'small' && $inputMode === 'touch' ? '-44px' : '-36px')};
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
