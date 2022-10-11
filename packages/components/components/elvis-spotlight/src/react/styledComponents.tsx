import styled from 'styled-components';

export const SpotlightArea = styled.svg`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99999;
  width: 100vw;
  height: 100vh;
`;

interface SpotlightCircleProps {
  transitionDuration: string;
}

export const SpotlightCircle = styled.circle<SpotlightCircleProps>`
  transition: all ${(props) => props.transitionDuration} ease-in-out;
`;
interface SpotlightRectProps {
  transitionDuration: string;
}

export const SpotlightRect = styled.rect<SpotlightRectProps>`
  transition: all ${(props) => props.transitionDuration} ease-in-out;
`;
