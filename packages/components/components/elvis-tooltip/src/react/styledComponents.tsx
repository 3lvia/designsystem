import styled, { css } from 'styled-components';

import { getColor } from '@elvia/elvis-colors';
import { getTypographyCss } from '@elvia/elvis-typography';
import { TooltipPosition } from './elviaTooltip.types';

const arrowSize = '5px';

export const colors = {
  tooltipText: getColor('white'),
  tooltipBg: getColor('grey-80'),
};

export const TriggerContainer = styled.span`
  display: inline;
`;

export interface TooltipPopupProps {
  position: TooltipPosition;
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
          &::after {
            border-left: ${arrowSize} solid transparent;
            border-right: ${arrowSize} solid transparent;
            border-top: ${arrowSize} solid ${colors.tooltipBg};
            top: 100%;
          }
        `;
      }
      case 'left': {
        return css`
          &::after {
            border-top: ${arrowSize} solid transparent;
            border-bottom: ${arrowSize} solid transparent;
            border-left: ${arrowSize} solid ${colors.tooltipBg};
            left: 100%;
          }
        `;
      }
      case 'right': {
        return css`
          &::after {
            border-top: ${arrowSize} solid transparent;
            border-bottom: ${arrowSize} solid transparent;
            border-right: ${arrowSize} solid ${colors.tooltipBg};
            right: 100%;
          }
        `;
      }
      default: {
        return css`
          &::after {
            border-left: ${arrowSize} solid transparent;
            border-right: ${arrowSize} solid transparent;
            border-bottom: ${arrowSize} solid ${colors.tooltipBg};
            bottom: 100%;
          }
        `;
      }
    }
  }}
`;
