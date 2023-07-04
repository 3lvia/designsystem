import styled from 'styled-components';
import { FormFieldSizes, TooltipPopup as TooltipPopupBase } from '@elvia/elvis-toolbox';
import { Side } from '../elvia-slider.types';

interface TooltipWrapperProps {
  $side: Side;
  $size: FormFieldSizes;
}

export const TooltipWrapper = styled.span<TooltipWrapperProps>`
  position: absolute;
  top: ${({ $size }) => {
    if ($size === 'small') {
      return '-40px';
    } else {
      return '-32px';
    }
  }};
  transform: ${({ $side }) => ($side === 'left' ? 'translateX(-50%)' : 'translateX(50%)')};
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
