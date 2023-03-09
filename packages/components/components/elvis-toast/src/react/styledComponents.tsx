import { getThemeColor } from '@elvia/elvis-colors';
import { IconButton } from '@elvia/elvis-toolbox';
import { getTypographyCss } from '@elvia/elvis-typography';
import styled, { css, keyframes } from 'styled-components';
import { ToastType } from './elviaToast.types';

export const animationDuration = 300;

const fadeIn = keyframes`
  from {
    transform: translateY(-8px);
    opacity: 0;
  }

  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    transform: translateY(0);
    opacity: 1;
  }

  to {
    transform: translateY(-8px);
    opacity: 0;
  }
`;

export const ToastPosition = styled.div<{ gtMobile: boolean }>`
  position: fixed;
  bottom: 16px;
  left: 16px;
  right: 16px;
  z-index: 99999;

  ${({ gtMobile }) =>
    gtMobile &&
    css`
      bottom: unset;
      left: unset;
      top: 16px;
      right: 16px;
      min-width: 270px;
      max-width: 400px;
    `}
`;

export const ToastContainer = styled.output<{
  fade: boolean;
  toastType: ToastType;
}>`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  gap: 16px;
  border: 2px solid ${getThemeColor('state-on')};
  border-radius: 8px;
  background: ${getThemeColor('background-primary')};
  text-align: left;
  padding: 16px;
  animation: ${fadeIn} ${animationDuration}ms;
  box-shadow: 0 0 40px rgb(0 0 0 / 0.06);

  ${({ toastType }) => {
    if (toastType === 'informative') {
      return css`
        border-color: ${getThemeColor('text-primary')};
      `;
    }

    return '';
  }}

  ${({ fade }) =>
    fade &&
    css`
      animation: ${fadeOut} ${animationDuration}ms forwards;
    `}
`;

export const ToastTitle = styled.h1`
  ${getTypographyCss('text-sm-strong')};
  margin: 0;
`;

export const ToastBody = styled.div`
  ${getTypographyCss('text-sm')};
`;

export const CloseButton = styled(IconButton)`
  align-self: flex-start;
`;
