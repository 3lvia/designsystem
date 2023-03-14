import { getThemeColor } from '@elvia/elvis-colors';
import { IconButton } from '@elvia/elvis-toolbox';
import { getTypographyCss } from '@elvia/elvis-typography';
import styled, { css, keyframes } from 'styled-components';
import { ToastType } from './elviaToast.types';

export const animationDuration = 200;

const fadeIn = (gtMobile: boolean) => keyframes`
  from {
    transform: ${gtMobile ? 'translateX(50%)' : 'translateY(50%)'};
    opacity: 0;
  }
  
  to {
    opacity: 1;
  }
  `;

const fadeOut = (gtMobile: boolean) => keyframes`
  from {
    opacity: 1;
  }
  
  to {
    transform: ${gtMobile ? 'translateX(50%)' : 'translateY(50%)'};
    opacity: 0;
  }
`;

export const ToastPosition = styled.div<{ gtMobile: boolean }>`
  position: fixed;
  bottom: 16px;
  left: 16px;
  right: 16px;
  z-index: 999999;

  ${({ gtMobile }) =>
    gtMobile &&
    css`
      bottom: unset;
      left: unset;
      top: 16px;
      right: 16px;
    `}
`;

export const ToastContainer = styled.output<{
  fade: boolean;
  toastType: ToastType;
  gtMobile: boolean;
  index: number;
}>`
  position: absolute;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  gap: 16px;
  border: 2px solid ${getThemeColor('state-on')};
  border-radius: 8px;
  background: ${getThemeColor('background-primary')};
  text-align: left;
  padding: 16px;
  animation: ${({ gtMobile }) => fadeIn(gtMobile)} ${animationDuration}ms cubic-bezier(0, 0.57, 0.31, 1);
  box-shadow: 0 0 40px rgb(0 0 0 / 0.06);
  color: ${getThemeColor('text-primary')};
  transform-origin: bottom center;
  transition: all 300ms ease;

  ${({ toastType }) => {
    if (toastType === 'informative') {
      return css`
        border-color: ${getThemeColor('text-primary')};
      `;
    }

    return '';
  }};

  ${({ gtMobile }) => {
    if (gtMobile) {
      return css`
        min-width: 270px;
        max-width: 400px;
        width: max-content;
        right: 0;
      `;
    }

    return css`
      width: 100%;
    `;
  }};

  ${({ fade, gtMobile }) =>
    fade &&
    css`
      animation: ${fadeOut(gtMobile)} ${animationDuration}ms forwards cubic-bezier(0.6, 0, 1, 0.9);
    `};

  ${({ index, gtMobile }) => {
    return css`
      top: ${gtMobile ? `${index * 3}px` : 'unset'};
      bottom: ${gtMobile ? 'unset' : `${index * -3}px`};
      scale: ${1 - index * 0.1};
      z-index: ${5 - index};
    `;
  }};
`;

export const TextContent = styled.div`
  flex: 1;
`;

export const ToastTitle = styled.h1`
  ${getTypographyCss('text-sm-strong')};
  margin: 0;
  text-align: left;
`;

export const ToastBody = styled.div`
  ${getTypographyCss('text-sm')};
  text-align: left;
`;

export const CloseButton = styled(IconButton)`
  align-self: flex-start;
`;
