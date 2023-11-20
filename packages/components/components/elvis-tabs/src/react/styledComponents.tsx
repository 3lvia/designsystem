import styled, { css } from 'styled-components';
import { getThemeColor } from '@elvia/elvis-colors';
import { getTypographyCss } from '@elvia/elvis-typography';
import { ScrollPosition } from './elvia-tabs.types';
import { IconButton, device } from '@elvia/elvis-toolbox';

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
  padding: 4px;
  scrollbar-width: none;
  gap: 16px;
  position: relative;
  mask: ${({ scrollPosition }) => getTabGradient(scrollPosition)};
  scroll-behavior: smooth;

  @media ${device.gtMobile} {
    gap: 24px;
  }

  @media (prefers-reduced-motion: reduce) {
    scroll-behavior: auto;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;

interface TabLabelProps {
  isSelected: boolean;
  isInverted: boolean;
}

export const Tab = styled.button<TabLabelProps>`
  ${({ isSelected, isInverted }) => css`
    ${getTypographyCss('title-caps')}
    font-weight: ${isSelected ? 500 : 'normal'};
    color: ${getThemeColor('text-1', { isInverted })};

    display: flex;
    align-items: flex-start;
    position: relative;
    border: none;
    padding: 0 8px;
    background: transparent;
    height: 32px;
    cursor: pointer;

    ::before,
    ::after {
      content: '';
      position: absolute;
      height: 4px;
      inset: auto auto 0 0;
      border-radius: 50px;
    }

    &::before {
      width: 100%;
      background-color: ${getThemeColor('border-2', { isInverted })};
    }

    &::after {
      width: ${isSelected ? '100%' : '0'};
      transition: all 0.3s ease-in-out;
      background-color: ${isSelected ? getThemeColor('border-selected-1', { isInverted }) : 'transparent'};

      @media (prefers-reduced-motion: reduce) {
        transition: background-color 0.3s ease-in-out;
      }
    }

    &:hover::after {
      background-color: ${getThemeColor('border-hover-1', { isInverted })};
      width: 100%;
    }
  `}
`;

export const TabText = styled.span`
  position: absolute;
  inset: 0;
`;

export const BoldTabTextPlaceholder = styled.span`
  font-weight: 500;
  height: 0;
  color: transparent;
  overflow: hidden;
  visibility: hidden;
  display: block;
`;
