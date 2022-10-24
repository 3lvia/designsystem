import styled, { css, keyframes } from 'styled-components';

import { colors } from '../styledComponents';
import { getColor } from '@elvia/elvis-colors';
import { getTypographyCss } from '@elvia/elvis-typography';

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
  background-color: ${colors.elviaWhite};
  border-radius: 4px;
  box-shadow: 0 0 40px rgba(0, 0, 0, 0.06);
  position: absolute;
  z-index: 99999;
  animation: ${fadeIn} 300ms ease;
  min-width: 304px;

  ${(props) => {
    if (props.fadeOut) {
      return css`
        animation: ${fadeOut} 200ms ease;
      `;
    }
    return '';
  }}
`;

export const PopoverHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 24px;
  border-bottom: 1px solid ${getColor('grey-10')};
  margin-bottom: 8px;
`;

export const SelectedDateName = styled.div`
  ${getTypographyCss('text-md')};

  &::first-letter {
    text-transform: capitalize;
  }
`;

export const PopoverBody = styled.div`
  position: relative;
`;

export const PopoverFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 16px 24px;
`;

export const Backdrop = styled.div`
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  position: fixed;
`;

export interface RotatingContainerProps {
  isRotated: boolean;
}

export const RotatingContainer = styled.div<RotatingContainerProps>`
  transition: transform 250ms ease;

  ${(props) =>
    props.isRotated &&
    css`
      transform: rotate(180deg);
    `}
`;

export const TertiaryButton = styled.button`
  ${getTypographyCss('text-sm')};
  font-weight: 500;
  border: none;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  position: relative;
  margin: 0;
  padding: 0;

  &:not(:last-of-type) {
    margin-bottom: 16px;
  }

  &:after {
    content: '';
    display: block;
    position: absolute;
    top: calc(100% + 2px);
    left: 0;
    right: 0;
    height: 2px;
    background-color: transparent;
    transition: background-color 100ms;
  }

  &:hover:not([disabled]):after {
    background-color: ${getColor('green')};
  }
`;
