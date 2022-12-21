import styled, { css } from 'styled-components';
import { getColor } from '@elvia/elvis-colors';

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
  display: ${(props) => (props.isVisible ? 'none' : 'block')};
  position: absolute;
  width: 8px;
  height: calc(${tabsHeightWithFocus}px - (16px * 2));
  z-index: 10;
  transition: visibility 0.5s ease-in;
  box-sizing: content-box;
  user-select: none;
  padding: ${(props) => (props.isLeftArrow ? '16px 28px 16px 8px' : '16px 8px 16px 28px')};
  right: ${(props) => !props.isLeftArrow && '24px'};

  &:hover {
    cursor: pointer;
  }
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
  isInverted?: boolean;
};

export const ItemsContainer = styled.div<ItemsContainerProps>`
  position: relative;
  display: flex;
  user-select: none;
  mask: ${(props) => decideFade(props.isOnRightEnd, props.isOnLeftEnd)};
  width: ${(props) =>
    !props.isOnLeftEnd || !props.isOnRightEnd ? `calc(100% - (2 * ${iconButtonWidth}px))` : '100%'};
  ${(props) =>
    props.isInverted &&
    `
    &::before {
      background-image: linear-gradient(to right, rgba(38, 38, 38, 1), rgba(38, 38, 38, 0.2));
    }
    &::after {
      background-image: linear-gradient(to left, rgba(38, 38, 38, 1), rgba(38, 38, 38, 0.2));
    }
  `};
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
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const Tab = styled.button`
  border: 0;
  padding: 0;
  background: transparent;
  &:focus {
    outline: 2px solid ${getColor('focus-outline')};
    outline-offset: 2px;
  }
  &:not(:last-of-type) {
    margin-right: 24px;
    @media screen and (max-width: 767px) {
      margin-right: 16px;
    }
  }
`;

const Underline = css`
  content: '';
  position: absolute;
  height: 4px;
  bottom: 0px;
  top: ${tabsLineHeight}px + ${tabsLabelPaddingBottom}px;
  left: 0px;
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

type TabLabelProps = {
  isSelected: boolean;
  isInverted?: boolean;
};

export const TabLabel = styled.span<TabLabelProps>`
  font-family: 'Red Hat Text', Verdana, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: ${tabsLineHeight}px;
  letter-spacing: 0.8px;
  text-transform: uppercase;
  color: ${(props) => (props.isInverted ? 'white' : 'black')};
  text-shadow: ${(props) => decideLabelTextShadow(props.isSelected, props.isInverted)};

  display: block;
  position: relative;
  border: none;
  padding: 0px 8px;
  background: transparent;
  height: ${tabsHeight}px;

  &::before {
    ${Underline}
    width: 100%;
    background-color: ${(props) => (props.isInverted ? getColor('grey-80') : getColor('grey-10'))};
  }

  &::after {
    ${Underline}
    display: block;
    width: ${(props) => (props.isSelected || (props.isInverted && props.isSelected) ? '100%' : '0')};
    transition: all 0.3s ease-in-out;
    background-color: ${(props) =>
      props.isSelected || (props.isInverted && props.isSelected) ? getColor('green') : 'transparent'};
  }

  &:hover {
    cursor: pointer;
    &:not(.ewc-tabs__label--selected)::after {
      background-color: ${getColor('green')};
      width: 100%;
    }
  }
`;
