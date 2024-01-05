import styled, { css, keyframes } from 'styled-components';

export const exitDuration = 200;

const fadeInAnimation = keyframes`
  0% {
    opacity: 0;
    transform: translate(0 -4px);
  }
  
  100% {
    opacity: 1;
    transform: translate(0);
  }
`;

const fadeOutAnimation = keyframes`
  0% {
    opacity: 1;
    transform: scale(1);
  }
  
  100% {
    transform: scale(0.9);
    opacity: 0;
  }
`;

export const OverlayContainer = styled.div<{ fadeOut: boolean; noAnimation: boolean; center: boolean }>`
  position: absolute;
  top: 0;
  z-index: 99999;
  animation: ${fadeInAnimation} 300ms ease;
  max-width: calc(100% - 16px);

  ${({ fadeOut }) =>
    fadeOut &&
    css`
      animation: ${fadeOutAnimation} ${exitDuration}ms ease forwards;
    `};

  ${({ noAnimation }) =>
    noAnimation &&
    css`
      animation-duration: 0ms;
    `};

  ${({ center }) =>
    center &&
    css`
      position: fixed;
      max-width: unset;
      top: 50%;
      left: 50%;
      translate: -50% -50%;
    `}
`;

export const OverlayDOMPosition = styled.div`
  display: none;
`;
