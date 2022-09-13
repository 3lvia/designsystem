import styled, { css, keyframes } from 'styled-components';

import { getColor } from '@elvia/elvis-colors';
import { getTypographyCss } from '@elvia/elvis-typography';
import { TooltipPosition } from './elviaTooltip.types';

export const arrowSize = 6;

export const colors = {
  tooltipText: getColor('white'),
  tooltipBg: getColor('grey-80'),
};

export const TooltipFadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.8)
  }
  
  to {
    opacity: 1;
    transform: scale(1)
  }
  `;

export const TooltipFadeOut = keyframes`
  from {
    opacity: 1;
    transform: scale(1)
  }
  
  to {
    opacity: 0;
    transform: scale(0.7)
  }
`;

export const TriggerContainer = styled.span`
  display: inline;
`;

export interface TooltipPopupProps {
  position: TooltipPosition;
  fadeOut: boolean;
}

export const TooltipPopup = styled.div<TooltipPopupProps>`
  ${getTypographyCss('text-sm')}
  color: ${colors.tooltipText};
  background: ${colors.tooltipBg};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 0.625rem;
  border-radius: 0.25rem;
  position: absolute;
  animation: ${TooltipFadeIn} 200ms 1ms forwards;
  opacity: 0;

  &::after {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
  }

  ${(props) => {
    switch (props.position) {
      case 'top': {
        return css`
          transform-origin: center bottom;

          &::after {
            border-left: ${arrowSize}px solid transparent;
            border-right: ${arrowSize}px solid transparent;
            border-top: ${arrowSize}px solid ${colors.tooltipBg};
            top: 100%;
          }
        `;
      }
      case 'left': {
        return css`
          transform-origin: right center;

          &::after {
            border-top: ${arrowSize}px solid transparent;
            border-bottom: ${arrowSize}px solid transparent;
            border-left: ${arrowSize}px solid ${colors.tooltipBg};
            left: 100%;
          }
        `;
      }
      case 'right': {
        return css`
          transform-origin: left center;

          &::after {
            border-top: ${arrowSize}px solid transparent;
            border-bottom: ${arrowSize}px solid transparent;
            border-right: ${arrowSize}px solid ${colors.tooltipBg};
            right: 100%;
          }
        `;
      }
      default: {
        return css`
          transform-origin: center top;

          &::after {
            border-left: ${arrowSize}px solid transparent;
            border-right: ${arrowSize}px solid transparent;
            border-bottom: ${arrowSize}px solid ${colors.tooltipBg};
            bottom: 100%;
          }
        `;
      }
    }
  }}

  ${(props) => {
    if (props.fadeOut) {
      return css`
        animation: ${TooltipFadeOut} 200ms ease;
      `;
    }
    return '';
  }}
`;
