import styled, { css } from 'styled-components';

import { getThemeColor } from '@elvia/elvis-colors';
import { getTypographyCss } from '@elvia/elvis-typography';
import {
  SegmentedControlContainerProps,
  SegmentedControlLabelProps,
  Type,
} from './elviaSegmentedControl.types';

const controlPaddingXLarge = 40;
const controlPaddingXMedium = 24;
const controlPaddingXSmall = 22;
const controlPaddingYLarge = 12;
const controlPaddingYMedium = 8;
const controlPaddingYSmall = 4;
const iconControlPaddingLarge = 12;
const iconControlPaddingMedium = 12;
const iconControlPaddingSmall = 8;
const fontSizeLarge = '1rem';
const fontSizeMedium = '0.875rem';
const fontSizeSmall = '0.875rem';
const controlAnimation = 'cubic-bezier(0.71, 0, 0.31, 1)';

const getControlPadding = (size: string, scType: Type) => {
  if (scType === 'icon') {
    if (size === 'large') {
      return `${iconControlPaddingLarge - 1}px`;
    } else if (size === 'medium') {
      return `${iconControlPaddingMedium - 1}px`;
    } else {
      return `${iconControlPaddingSmall - 1}px`;
    }
  } else {
    if (size === 'large') {
      return `${controlPaddingYLarge}px ${controlPaddingXLarge}px`;
    } else if (size === 'medium') {
      return `${controlPaddingYMedium}px ${controlPaddingXMedium}px`;
    } else {
      return `${controlPaddingYSmall}px ${controlPaddingXSmall}px`;
    }
  }
};

const getFontSize = (size: string) => {
  if (size === 'large') {
    return fontSizeLarge;
  } else if (size === 'medium') {
    return fontSizeMedium;
  } else {
    return fontSizeSmall;
  }
};

const getControlBorder = (scType: Type, isSelected: boolean, isHovering?: boolean): string => {
  if (scType === 'icon' && isSelected) {
    return `1px solid ${getThemeColor('text-primary')}`;
  } else if (scType === 'icon' && isHovering) {
    return `1px solid ${getThemeColor('state-on')}`;
  } else {
    return '1px solid transparent';
  }
};

export const SegmentedControlContainer = styled.div<SegmentedControlContainerProps>`
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  position: relative;
  width: max-content;
  border: ${({ scType }) => (scType === 'text' ? `1px solid ${getThemeColor('text-primary')}` : 'none')};
  border-radius: 100px;
  gap: ${({ scType }) => (scType === 'text' ? '0' : '8px')};
  background: ${({ scType }) => (scType === 'text' ? getThemeColor('background-primary') : 'transparent')};

  // Selected control background
  ${({ scType, numberOfControls, selectedIndex }) =>
    scType === 'text' &&
    css`
      &::after {
        content: '';
        position: absolute;
        width: ${100 / numberOfControls}%;
        height: 100%;
        top: 0;
        left: ${(100 / numberOfControls) * selectedIndex}%;
        border-radius: 100px;
        background-color: ${getThemeColor('text-primary')};
        transition: left 250ms ${controlAnimation};
      }
    `}
`;

export const SegmentedControlLabel = styled.label<SegmentedControlLabelProps>`
  position: relative;
  white-space: nowrap;
  background-color: transparent;
  padding: ${({ size, scType }) => getControlPadding(size, scType)};
  border: ${({ isSelected, scType }) => getControlBorder(scType, isSelected)};
  border-radius: 100px;
  z-index: 10;

  ${getTypographyCss('text-md')}
  font-size: ${({ size }) => getFontSize(size)};
  text-align: center;
  color: ${({ isSelected }) =>
    isSelected ? getThemeColor('background-primary') : getThemeColor('text-primary')};
  text-shadow: ${({ isSelected }) => (isSelected ? `0 0 0 currentColor, 0 0 0.5px currentColor` : '0')};

  transition: color 250ms ${controlAnimation}, border 200ms linear;

  &:hover {
    text-shadow: 0 0 0 currentColor, 0 0 0.5px currentColor;
    border: ${({ scType, isSelected }) => getControlBorder(scType, isSelected, true)};
  }
`;

export const SegmentedControlInput = styled.input`
  appearance: none;
  position: absolute;
  margin: 0;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  z-index: 1;
  &:hover {
    cursor: pointer;
  }
`;
