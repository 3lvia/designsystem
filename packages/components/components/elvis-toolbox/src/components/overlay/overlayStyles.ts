import styled, { css, keyframes } from 'styled-components';

const fadeIn = keyframes`
  0% {
    opacity: 0;
    translate: 0 -4px;
  }
  
  100% {
    opacity: 1;
    translate: 0 0;
  }
`;

const fadeOut = keyframes`
  0% {
    opacity: 1;
    transform: scale(1);
  }
  
  100% {
    transform: scale(0.9);
    opacity: 0;
  }
`;

export const OverlayContainer = styled.div<{ fadeOut: boolean }>`
  position: absolute;
  z-index: 99999;
  animation: ${fadeIn} 300ms ease;

  ${(props) => {
    if (props.fadeOut) {
      return css`
        animation: ${fadeOut} 200ms ease;
      `;
    }
    return '';
  }};
`;
