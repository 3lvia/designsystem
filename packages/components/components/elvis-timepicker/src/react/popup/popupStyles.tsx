import styled, { css, keyframes } from 'styled-components';
import { getTypographyCss } from '@elvia/elvis-typography';

import { listButtonHeight } from './buttonHeight';
import { getColor } from '@elvia/elvis-colors';

const typography = {
  numberPickerTitle: getTypographyCss('text-sm'),
  numberButton: getTypographyCss('text-md'),
};

const fadeIn = keyframes`
  0% {
    opacity: 0.3;
  }
  
  100% {
    opacity: 1;
  }
  `;

const fadeOut = keyframes`
  0% {
    opacity: 1;
  }
  
  100% {
    transform: scale(0.9);
    opacity: 0.0;
  }
`;

interface OverlayContainerProps {
  fadeOut: boolean;
}

export const OverlayContainer = styled.div<OverlayContainerProps>`
  background-color: ${getColor('elvia-on')};
  border-radius: 4px;
  box-shadow: 0 0 40px rgba(0, 0, 0, 0.06);
  position: absolute;
  z-index: 1001;
  display: flex;
  animation: ${fadeIn} 300ms ease;

  ${(props) => {
    if (props.fadeOut) {
      return css`
        animation: ${fadeOut} 200ms ease;
      `;
    }
    return '';
  }}
`;

export const Backdrop = styled.div`
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  position: fixed;
`;

export const NumberPickerContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const NumberPickerTitle = styled.h4`
  ${typography.numberPickerTitle}
  margin: 0;
  height: 40px;
  display: flex;
  align-items: center;
`;

export const HorizontalLine = styled.hr`
  width: 100%;
  border: 1px solid ${getColor('grey-05')};
  border-width: 0 0 1px 0;
  margin: 0;
`;

export const NumberList = styled.div`
  overflow: auto;
  height: ${listButtonHeight * 5}px;
  width: 100%;
  scroll-snap-type: y mandatory;
  position: relative;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const ArrowButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${listButtonHeight}px;
  position: sticky;
  background: ${getColor('elvia-on')};
  border-radius: 4px;

  &:first-of-type {
    top: 0;
  }

  &:last-of-type {
    bottom: 0;
  }
`;

interface NumberButtonProps {
  isSelected: boolean;
}

export const NumberButton = styled.button<NumberButtonProps>`
  ${typography.numberButton}
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  padding: 0;
  height: 48px;
  background: ${(props) => (props.isSelected ? getColor('grey-10') : 'transparent')};
  scroll-snap-align: center;
  cursor: pointer;

  &:hover {
    background: ${getColor('grey-05')};
  }
`;
