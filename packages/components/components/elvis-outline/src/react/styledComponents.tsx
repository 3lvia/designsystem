import { getColor } from '@elvia/elvis-colors';
import styled, { createGlobalStyle, css } from 'styled-components';

export const StyledOutline = styled.div<{ animate: boolean }>`
  border: 2px solid ${getColor('focus-outline')};
  pointer-events: none;
  position: fixed;
  top: 0;
  left: 0;
  transition: all 0s ease;
  z-index: 999999;

  ${({ animate }) =>
    animate &&
    css`
      transition-duration: 0.1s;

      @media (prefers-reduced-motion) {
        transition-duration: 0s;
      }
    `}
`;

export const GlobalOutlineReset = createGlobalStyle`
  *:focus,
  *:focus ~ *,
  *:focus-visible,
  *:focus-within,
  *:focus-visible::before {
    outline: none !important;
  }
`;
