import styled from 'styled-components';
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

export const CarouselContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;

  @keyframes exitLeft {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-100%);
    }
  }
  @keyframes exitRight {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(100%);
    }
  }
  @keyframes fadeInOpacity {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  .exit-animation {
    animation: ${(props: { slideDirection: string }) =>
        props.slideDirection === 'left' ? 'exitLeft' : 'exitRight'}
      500ms ease-in;
  }
  .enter-animation {
    animation: fadeInOpacity 0.5s ease-in;
  }
`;

export const CarouselElements = styled.div`
  overflow: hidden;
`;

export const CarouselElementContainer = styled.div`
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
`;

type CarouselElementProps = {
  onMouseDown: any;
  onMouseUp: any;
  onMouseLeave: any;
  onMouseMove: any;
  onTouchStart: any;
  onTouchMove: any;
  onTouchEnd: any;
};

export const CarouselElement = styled.div<CarouselElementProps>`
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
  margin-top: 0;
  * {
    margin-top: 0;
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

export const CarouselDot = styled.button`
  border: 1px solid
    ${(props: { isSelected: boolean }) => (props.isSelected ? colors.elviaCharge : colors.black)};
  height: ${(props: { isSelected: boolean }) => (props.isSelected ? '9px' : '8px')};
  width: ${(props: { isSelected: boolean }) => (props.isSelected ? '9px' : '8px')};
  @media (max-width: 767px) {
    border: 1px solid
      ${(props: { isSelected: boolean }) => (props.isSelected ? colors.elviaCharge : colors.black)};
    height: ${(props: { isSelected: boolean }) => (props.isSelected ? '13px' : '12px')};
    width: ${(props: { isSelected: boolean }) => (props.isSelected ? '13px' : '12px')};
  }

  border-radius: 50%;
  background-color: ${(props: { isSelected: boolean }) =>
    props.isSelected ? colors.elviaCharge : colors.white};
  margin: ${(props: { isSelected: boolean }) => (props.isSelected ? '7.5px' : '8px')};
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
  visibility: ${(props: { hidden: boolean }) => (props.hidden ? 'hidden' : 'visible')};
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
  visibility: ${(props: { hidden: boolean }) => (props.hidden ? 'hidden' : 'visible')};
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
