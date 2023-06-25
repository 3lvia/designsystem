import styled, { css } from 'styled-components';
import { getColor } from '@elvia/elvis-colors';
import { getTypographyCss } from '@elvia/elvis-typography';
import { ScrollPosition } from './elvia-tabs.types';
import { IconButton, device } from '@elvia/elvis-toolbox';

const tabsLineHeight = 20;
const tabsUnderlineHeight = 4;
const tabsLabelPaddingBottom = 8;
const tabsFocusPadding = 4;
const tabsHeight = tabsLineHeight + tabsLabelPaddingBottom + tabsUnderlineHeight;
const tabsHeightWithFocus = tabsHeight + tabsFocusPadding * 2;

export const TabsContainer = styled.div`
  display: flex;
  position: relative;
  overflow: hidden;
`;

interface ArrowButtonProps {
  isVisible: boolean;
}

const ArrowButtonBase = styled(IconButton)<ArrowButtonProps>`
  position: absolute;
  z-index: 1;
  display: ${({ isVisible }) => (isVisible ? 'grid' : 'none')};

  &:not(:disabled):hover {
    background-color: transparent;
    border-color: transparent;
  }
`;

export const LeftButton = styled(ArrowButtonBase)``;
export const RightButton = styled(ArrowButtonBase)`
  right: 0;
`;

const getTabGradient = (scrollPosition: ScrollPosition): string => {
  switch (scrollPosition) {
    case 'left':
      return 'linear-gradient(to left, transparent 40px, black 85px);';
    case 'right':
      return 'linear-gradient(to right, transparent 40px, black 85px);';
    case 'center':
      return 'linear-gradient(to right, transparent 40px, black 85px, black calc(100% - 85px), transparent calc(100% - 40px));';
    default:
      return 'none';
  }
};

interface ScrollContainerProps {
  scrollPosition: ScrollPosition;
}

export const ScrollContainer = styled.div<ScrollContainerProps>`
  display: flex;
  flex-direction: row;
  white-space: nowrap;
  width: 100%;
  overflow-x: auto;
  padding: ${tabsFocusPadding}px;
  height: ${tabsHeightWithFocus}px;
  scrollbar-width: none;
  gap: 16px;
  position: relative;
  mask: ${({ scrollPosition }) => getTabGradient(scrollPosition)};
  scroll-behavior: smooth;

  @media ${device.gtMobile} {
    gap: 24px;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const Tab = styled.button`
  border: 0;
  padding: 0;
  background: transparent;
`;

const Underline = css`
  content: '';
  position: absolute;
  height: 4px;
  bottom: 0;
  top: ${tabsLineHeight}px + ${tabsLabelPaddingBottom}px;
  left: 0;
  border-radius: 50px;
`;

const decideLabelTextShadow = (isSelected: boolean, isInverted?: boolean): string => {
  if (isSelected && !isInverted) {
    return '0 0 0 black, 0 0 0.5px black';
  } else if (isInverted && isSelected) {
    return '0 0 0 white, 0 0 0.5px white';
  } else {
    return 'none';
  }
};

interface TabLabelProps {
  isSelected: boolean;
  isInverted?: boolean;
}

export const TabLabel = styled.span<TabLabelProps>`
  ${({ isSelected, isInverted }) => css`
    ${getTypographyCss('title-caps')}
    line-height: ${tabsLineHeight}px;
    font-weight: normal;
    color: ${isInverted ? 'white' : 'black'};
    text-shadow: ${decideLabelTextShadow(isSelected, isInverted)};

    display: block;
    position: relative;
    border: none;
    padding: 0 8px;
    background: transparent;
    height: ${tabsHeight}px;

    &::before {
      ${Underline}
      width: 100%;
      background-color: ${isInverted ? getColor('grey-80') : getColor('grey-10')};
    }

    &::after {
      ${Underline}
      display: block;
      width: ${isSelected || (isInverted && isSelected) ? '100%' : '0'};
      transition: all 0.3s ease-in-out;
      background-color: ${isSelected || (isInverted && isSelected) ? getColor('green') : 'transparent'};
    }

    &:hover {
      cursor: pointer;
      &::after {
        background-color: ${getColor('green')};
        width: 100%;
      }
    }
  `}
`;
