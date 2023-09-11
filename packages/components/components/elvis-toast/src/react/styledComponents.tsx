import { getShadow, getThemeColor } from '@elvia/elvis-colors';
import { IconButton, device } from '@elvia/elvis-toolbox';
import { getTypographyCss } from '@elvia/elvis-typography';
import styled, { css, keyframes } from 'styled-components';
import { ToastType } from './elviaToast.types';

export const animationDuration = 200;

const fadeIn = keyframes`
  from {
    transform: var(--entryPosition);
    opacity: 0;
  }
  
  to {
    opacity: 1;
  }
  `;

export const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  
  to {
    transform: var(--entryPosition);
    opacity: 0;
  }
`;

export const ToastPosition = styled.div`
  position: fixed;
  z-index: 99999;
  inset: auto 16px 16px;

  @media ${device.gtMobile} {
    inset: 16px 16px auto auto;
  }
`;

export const ToastContainer = styled.output<{
  $fade: boolean;
  $toastType: ToastType;
  $index: number;
}>`
  --entryPosition: translateY(50%);
  box-shadow: ${getShadow('medium')};
  position: absolute;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  gap: 8px;
  border: 2px solid ${getThemeColor('signal-positive')};
  border-radius: 8px;
  background: ${getThemeColor('background-overlay-1')};
  text-align: left;
  padding: 6px; // -2px because of border thickness
  animation: ${fadeIn} ${animationDuration}ms cubic-bezier(0, 0.57, 0.31, 1);
  color: ${getThemeColor('text-1')};
  transform-origin: bottom center;
  transition: all 300ms ease;
  width: 100%;

  ${({ $toastType }) =>
    $toastType === 'informative' &&
    css`
      border-color: ${getThemeColor('border-1')};
    `};

  ${({ $index }) => {
    return css`
      bottom: ${`${$index * -3}px`};
      scale: ${1 - $index * 0.1};
      z-index: ${5 - $index};
    `;
  }};

  ${({ $fade }) =>
    $fade &&
    css`
      animation: ${fadeOut} ${animationDuration}ms forwards cubic-bezier(0.6, 0, 1, 0.9);
    `};

  @media ${device.gtMobile} {
    --entryPosition: translateX(50%);
    width: 350px;
    right: 0;

    ${({ $index }) => {
      return css`
        top: ${`${$index * 3}px`};
        bottom: unset;
      `;
    }};
  }
`;

export const TextContent = styled.div`
  flex: 1;
  margin: 8px 0;
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

export const IconContainer = styled.div`
  margin: 8px;
`;

export const CloseButton = styled(IconButton)`
  align-self: flex-start;
`;
