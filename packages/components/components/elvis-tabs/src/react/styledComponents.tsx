import styled, { css } from 'styled-components';
import { getThemeColor } from '@elvia/elvis-colors';
import { getTypographyCss } from '@elvia/elvis-typography';

const iconButtonWidth = 24;
const tabsLineHeight = 20;
const tabsUnderlineHeight = 4;
const tabsLabelPaddingBottom = 8;
const tabsFocusPadding = 4;
const tabsHeight = tabsLineHeight + tabsLabelPaddingBottom + tabsUnderlineHeight;
const tabsHeightWithFocus = tabsHeight + tabsFocusPadding * 2;

export const TabsContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: row;
  align-items: center;
  overflow: hidden;
  &,
  * {
    box-sizing: border-box;
  }
`;

type ArrowButtonProps = {
  isVisible: boolean;
  isLeftArrow: boolean;
};

export const ArrowButton = styled.div<ArrowButtonProps>`
  ${({ isVisible, isLeftArrow }) => css`
    display: ${isVisible ? 'none' : 'block'};
    position: absolute;
    width: 8px;
    height: calc(${tabsHeightWithFocus}px - (16px * 2));
    z-index: 10;
    transition: visibility 0.5s ease-in;
    box-sizing: content-box;
    user-select: none;
    padding: ${isLeftArrow ? '16px 28px 16px 8px' : '16px 8px 16px 28px'};
    right: ${!isLeftArrow && '24px'};

    &:hover {
      cursor: pointer;
    }
  `}
`;

const decideFade = (isOnRightEnd: boolean, isOnLeftEnd: boolean): string => {
  if (isOnRightEnd && isOnLeftEnd) {
    return 'none';
  } else if (!isOnRightEnd) {
    return 'linear-gradient(to left, transparent 0%, black 50px);';
  } else if (!isOnLeftEnd) {
    return 'linear-gradient(to right, transparent 15px, black 50px);';
  } else {
    return 'linear-gradient(to right, transparent 15px, black 50px, black 90%, transparent 100%);';
  }
};

type ItemsContainerProps = {
  isOnRightEnd: boolean;
  isOnLeftEnd: boolean;
};

export const ItemsContainer = styled.div<ItemsContainerProps>`
  ${({ isOnRightEnd, isOnLeftEnd }) => css`
    position: relative;
    display: flex;
    user-select: none;
    mask: ${decideFade(isOnRightEnd, isOnLeftEnd)};
    width: ${!isOnLeftEnd || !isOnRightEnd ? `calc(100% - (2 * ${iconButtonWidth}px))` : '100%'};
  `}
`;

export const ScrollContainer = styled.div`
  display: flex;
  flex-direction: row;
  white-space: nowrap;
  width: 100%;
  overflow-x: auto;
  padding: ${tabsFocusPadding}px;
  height: ${tabsHeightWithFocus}px;
  scrollbar-width: none;
  gap: 24px;
  @media screen and (max-width: 767px) {
    gap: 16px;
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

const decideLabelTextShadow = (isSelected: boolean) => {
  if (isSelected) {
    return `0 0 0 ${getThemeColor('text-1')}, 0 0 0.5px ${getThemeColor('text-1')}`;
  } else {
    return 'none';
  }
};

type TabLabelProps = {
  isSelected: boolean;
};

export const TabLabel = styled.span<TabLabelProps>`
  ${({ isSelected }) => css`
    ${getTypographyCss('title-caps')}
    line-height: ${tabsLineHeight}px;
    font-weight: normal;
    color: ${getThemeColor('text-1')};
    text-shadow: ${decideLabelTextShadow(isSelected)};
    display: block;
    position: relative;
    border: none;
    padding: 0 8px;
    background: transparent;
    height: ${tabsHeight}px;

    &::before {
      ${Underline}
      width: 100%;
      background-color: ${getThemeColor('background-element-3')};
    }

    &::after {
      ${Underline}
      display: block;
      width: ${isSelected ? '100%' : '0'};
      transition: all 0.3s ease-in-out;
    }

    &:hover {
      cursor: pointer;
      &::after {
        background-color: ${getThemeColor('background-hover-1')};
        width: 100%;
      }
    }
  `}

  ${({ isSelected }) =>
    isSelected &&
    css`
      &::after {
        background-color: ${getThemeColor('background-hover-1')};
      }
    `}
`;
