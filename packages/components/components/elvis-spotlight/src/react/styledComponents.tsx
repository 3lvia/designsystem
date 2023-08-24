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
  transition: all ${({ transitionDuration }) => transitionDuration} ease-in-out;
`;
interface SpotlightRectProps {
  transitionDuration: string;
}

export const SpotlightRect = styled.rect<SpotlightRectProps>`
  transition: all ${({ transitionDuration }) => transitionDuration} ease-in-out;
`;

export const SpotlightMask = styled.rect`
  --ewc-spotlight-mask-fill: 0.25;
  .e-theme-dark &&,
  .e-color-background-3 && {
    --ewc-spotlight-mask-fill: 0.5;
  }

  fill: rgba(0, 0, 0, var(--ewc-spotlight-mask-fill));
  width: 100%;
  height: 100%;
`;
