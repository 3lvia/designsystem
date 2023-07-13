import styled, { css } from 'styled-components';

import { getThemeColor } from '@elvia/elvis-colors';
import { getTypographyCss } from '@elvia/elvis-typography';
import {
  SegmentedControlContainerProps,
  SegmentedControlLabelProps,
  Type,
} from './elviaSegmentedControl.types';

const controlPaddingXLarge = 40;
const controlPaddingYLarge = 12;

const controlPaddingXMedium = 24;
const controlPaddingYMedium = 8;

const controlPaddingXSmall = 22;
const controlPaddingYSmall = 4;

const iconControlPaddingLarge = 12;
const iconControlPaddingMedium = 12;
const iconControlPaddingSmall = 8;

const fontSizeLarge = '16px';
const fontSizeMedium = '14px';
const fontSizeSmall = '14px';
const controlAnimation = 'cubic-bezier(0.71, 0, 0.31, 1)';

const getControlPadding = (size: string, $type: Type) => {
  if ($type === 'icon') {
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

const getControlBorder = ($type: Type, isSelected: boolean, isHovering?: boolean): string => {
  if ($type === 'icon' && isSelected) {
    return `1px solid ${getThemeColor('border-1')}`;
  } else if ($type === 'icon' && isHovering) {
    return `1px solid ${getThemeColor('border-hover-1')}`;
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
  border: ${({ $type }) => ($type === 'text' ? `1px solid ${getThemeColor('border-1')}` : 'none')};
  border-radius: 100px;
  gap: ${({ $type }) => ($type === 'text' ? '0' : '8px')};
  background: ${({ $type }) => ($type === 'text' ? getThemeColor('background-1') : 'transparent')};

  // Selected control background
  ${({ $type, numberOfControls, selectedIndex }) =>
    $type === 'text' &&
    css`
      &::after {
        content: '';
        position: absolute;
        width: ${100 / numberOfControls}%;
        height: 100%;
        top: 0;
        left: ${(100 / numberOfControls) * selectedIndex}%;
        border-radius: 100px;
        background-color: ${getThemeColor('text-1')};
        transition: left 250ms ${controlAnimation};
      }
    `}
`;

export const SegmentedControlLabel = styled.label<SegmentedControlLabelProps>`
  position: relative;
  white-space: nowrap;
  background-color: transparent;
  padding: ${({ size, $type }) => getControlPadding(size, $type)};
  border: ${({ isSelected, $type }) => getControlBorder($type, isSelected)};
  border-radius: 100px;
  z-index: 10;

  ${getTypographyCss('text-md')}
  font-size: ${({ size }) => getFontSize(size)};
  line-height: 20px;
  text-align: center;
  color: ${({ isSelected }) => (isSelected ? getThemeColor('background-1') : getThemeColor('text-1'))};
  text-shadow: ${({ isSelected }) => (isSelected ? `0 0 0 currentColor, 0 0 0.5px currentColor` : '0')};

  transition: color 250ms ${controlAnimation}, border 200ms linear, text-shadow 200ms ${controlAnimation};
  &:hover {
    text-shadow: 0 0 0 currentColor, 0 0 0.5px currentColor;
    border: ${({ $type, isSelected }) => getControlBorder($type, isSelected, true)};
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

export const SegmentedControlIconContainer = styled.div`
  display: flex;
`;
