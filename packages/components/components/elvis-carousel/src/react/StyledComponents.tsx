import styled, { css, keyframes } from 'styled-components';
import { getColor } from '@elvia/elvis-colors';
import { getTypographyCss } from '@elvia/elvis-typography';

const colors = {
  elviaCharge: getColor('elvia-charge'),
  white: getColor('elvia-on'),
  black: getColor('elvia-off'),
};

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

export const CarouselContainer = styled.section.attrs(() => ({
  'aria-roledescription': 'carousel',
  'aria-live': 'polite',
}))`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

export const CarouselElements = styled.div`
  overflow: hidden;
`;

interface CarouselElementContainerProps {
  enterAnimation: boolean;
  exitAnimation: boolean;
  slideDirection: 'left' | 'right';
}

export const CarouselElementContainer = styled.div.attrs(() => ({
  'aria-roledescription': 'slide',
}))<CarouselElementContainerProps>`
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

  ${(props) => css`
    ${props.exitAnimation &&
    css`
      animation: ${props.slideDirection === 'left' ? exitLeft : exitRight} 500ms ease-in;
    `}
    ${props.enterAnimation &&
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
    margin: 0px;
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
  padding: 0px 24px;
`;

interface CarouselDotProps {
  isSelected: boolean;
}

export const CarouselDot = styled.button<CarouselDotProps>`
  border: 1px solid ${(props) => (props.isSelected ? colors.elviaCharge : colors.black)};
  height: ${(props) => (props.isSelected ? '9px' : '8px')};
  width: ${(props) => (props.isSelected ? '9px' : '8px')};
  @media (max-width: 767px) {
    border: 1px solid ${(props) => (props.isSelected ? colors.elviaCharge : colors.black)};
    height: ${(props) => (props.isSelected ? '13px' : '12px')};
    width: ${(props) => (props.isSelected ? '13px' : '12px')};
  }

  border-radius: 50%;
  background-color: ${(props) => (props.isSelected ? colors.elviaCharge : colors.white)};
  margin: ${(props) => (props.isSelected ? '7.5px' : '8px')};
  cursor: pointer;
  padding: 0;
  &:hover {
    background-color: ${colors.elviaCharge};
  }
`;

export const CarouselLeftButton = styled.button`
  border: none;
  background: transparent;
  display: flex;
  padding: 0px;
  visibility: ${(props) => (props.hidden ? 'hidden' : 'visible')};
  cursor: pointer;
  i {
    background-color: ${colors.white};
    display: inline-block;
  }
`;

export const CarouselRightButton = styled.button`
  margin-left: 0;
  border: none;
  background: transparent;
  display: flex;
  padding: 0px;
  visibility: ${(props) => (props.hidden ? 'hidden' : 'visible')};
  cursor: pointer;
  i {
    background-color: ${colors.white};
    display: inline-block;
  }
`;

export const CarouselCheckButton = styled.button`
  margin-left: 0;
  border: none;
  background: transparent;
  display: flex;
  padding: 0px;
  cursor: pointer;
  i {
    background-color: ${colors.white};
    display: inline-block;
  }
`;
