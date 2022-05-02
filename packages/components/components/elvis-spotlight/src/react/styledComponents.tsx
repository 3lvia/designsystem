import styled from 'styled-components';

export const SpotlightArea = styled.svg`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99999;
  width: 100vw;
  height: 100vh;
`;

export const SpotlightCircle = styled.circle`
  transition: all 350ms ease-in-out;
`;
