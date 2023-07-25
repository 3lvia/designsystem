import { getThemeColor } from '@elvia/elvis-colors';
import { getTypographyCss } from '@elvia/elvis-typography';
import styled, { css, keyframes } from 'styled-components';

const arrowSize = 6;

const TooltipFadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.8)
  }
  
  to {
    opacity: 1;
    transform: scale(1)
  }
  `;

const TooltipFadeOut = keyframes`
  from {
    opacity: 1;
    transform: scale(1)
  }
  
  to {
    opacity: 0;
    transform: scale(0.7)
  }
`;

export type TooltipPosition = 'bottom' | 'top' | 'left' | 'right';

export interface TooltipPopupProps {
  position: TooltipPosition;
  fadeOut: boolean;
}

export const TooltipPopup = styled.div<TooltipPopupProps>`
  ${getTypographyCss('text-sm')}
  white-space: pre-wrap;
  color: ${getThemeColor('text-4')};
  background: ${getThemeColor('background-overlay-2')};
  display: grid;
  place-items: center;
  padding: 8px 10px;
  border-radius: 4px;
  position: absolute;
  animation: ${TooltipFadeIn} 200ms 1ms forwards;
  max-width: min(350px, calc(100% - 8px));
  width: max-content;
  opacity: 0;
  z-index: 99999;
  pointer-events: none;

  &::after {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
  }

  ${({ position }) => {
    switch (position) {
      case 'top': {
        return css`
          transform-origin: center bottom;

          &::after {
            border-left: ${arrowSize}px solid transparent;
            border-right: ${arrowSize}px solid transparent;
            border-top: ${arrowSize}px solid ${getThemeColor('background-overlay-2')};
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
            border-left: ${arrowSize}px solid ${getThemeColor('background-overlay-2')};
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
            border-right: ${arrowSize}px solid ${getThemeColor('background-overlay-2')};
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
            border-bottom: ${arrowSize}px solid ${getThemeColor('background-overlay-2')};
            bottom: 100%;
          }
        `;
      }
    }
  }}

  ${({ fadeOut }) => {
    if (fadeOut) {
      return css`
        animation: ${TooltipFadeOut} 200ms ease;
      `;
    }
    return '';
  }}
`;
