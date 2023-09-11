import styled, { css, keyframes } from 'styled-components';
import { getThemeColor } from '@elvia/elvis-colors';
import { getTypographyCss } from '@elvia/elvis-typography';

const typography = {
  textMd: getTypographyCss('text-md'),
};

const mobileMax = '767px';

const exitLeft = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
`;

const exitRight = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(100%);
  }
`;

const fadeInOpacity = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const CarouselContainer = styled.section`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

export const CarouselElements = styled.div`
  overflow: hidden;
`;

interface CarouselElementContainerProps {
  $enterAnimation: boolean;
  $exitAnimation: boolean;
  $slideDirection: 'left' | 'right';
}

export const CarouselElementContainer = styled.div<CarouselElementContainerProps>`
  margin-bottom: 24px;

  // Prevent imagine dragging
  // Note: This does not work for Firefox
  img {
    -webkit-user-drag: none;
    -khtml-user-drag: none;
    -moz-user-drag: none;
    -o-user-drag: none;
    user-drag: none;
  }

  &:active {
    cursor: grabbing;
    cursor: -webkit-grabbing;
    user-select: none;
    @media (hover: none) {
      transform: scale(0.98);
    }
  }

  ${({ $exitAnimation, $slideDirection, $enterAnimation }) => css`
    ${$exitAnimation &&
    css`
      animation: ${$slideDirection === 'left' ? exitLeft : exitRight} 500ms ease-in;
    `}
    ${$enterAnimation &&
    css`
      animation: ${fadeInOpacity} 0.5s ease-in;
    `}
  `}
`;

export const CarouselElement = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  ${typography.textMd}
  padding-bottom: '10px';
  * {
    margin: 0;
    ${typography.textMd}
  }
`;

export const CarouselHeading = styled.div`
  margin: 0 0 16px 0;
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
    padding: 0;
  }
`;

export const CarouselNavigationRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

  @media (max-width: ${mobileMax}) {
    justify-content: space-between;
  }
`;

export const CarouselListOfDots = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 24px;
`;

interface CarouselDotProps {
  $isSelected: boolean;
}

export const CarouselDot = styled.button<CarouselDotProps>`
  border: 1px solid ${({ $isSelected }) => getThemeColor($isSelected ? 'border-selected-1' : 'border-1')};
  height: ${({ $isSelected }) => ($isSelected ? '9px' : '8px')};
  width: ${({ $isSelected }) => ($isSelected ? '9px' : '8px')};
  @media (max-width: 767px) {
    height: ${({ $isSelected }) => ($isSelected ? '13px' : '12px')};
    width: ${({ $isSelected }) => ($isSelected ? '13px' : '12px')};
  }

  border-radius: 50%;
  background-color: ${({ $isSelected }) =>
    getThemeColor($isSelected ? 'background-selected-1' : 'background-element-1')};
  margin: ${({ $isSelected }) => ($isSelected ? '7.5px' : '8px')};
  cursor: pointer;
  padding: 0;
  &:hover {
    background-color: ${getThemeColor('background-hover-1')};
  }
`;

const CarouselButtonBase = styled.button`
  border: none;
  background: transparent;
  display: flex;
  padding: 0;
  cursor: pointer;
  visibility: ${({ hidden }) => (hidden ? 'hidden' : 'visible')};
  i {
    display: inline-block;
  }
`;

export const CarouselLeftButton = styled(CarouselButtonBase)``;

export const CarouselRightButton = styled(CarouselButtonBase)`
  margin-left: 0;
`;

export const CarouselCheckButton = styled(CarouselButtonBase)`
  margin-left: 0;
`;
