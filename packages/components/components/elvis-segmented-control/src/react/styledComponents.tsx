import { getThemeColor } from '@elvia/elvis-colors';
import { getTypographyCss } from '@elvia/elvis-typography';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import {
  SegmentedControlContainerProps,
  SegmentedControlLabelProps,
  Type,
} from './elviaSegmentedControl.types';

const controlPaddingXLarge = 24;
const controlPaddingYLarge = 11;

const controlPaddingXMedium = 18;
const controlPaddingYMedium = 8;

const controlPaddingXSmall = 12;
const controlPaddingYSmall = 4;

const iconControlPaddingLarge = 12;
const iconControlPaddingMedium = 12;
const iconControlPaddingSmall = 8;

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
  background: ${({ $type }) => ($type === 'text' ? getThemeColor('background-element-1') : 'transparent')};

  // Selected control background
  ${({ $type, selectedLeft, selectedWidth }) =>
    $type === 'text' &&
    css`
      &::after {
        will-change: left;
        content: '';
        position: absolute;
        width: ${selectedWidth}px;
        height: 100%;
        top: 0;
        left: ${selectedLeft}px;
        border-radius: 100px;
        background-color: ${getThemeColor('background-element-5')};
        transition:
          left 250ms ${controlAnimation},
          width 250ms ${controlAnimation};
      }
    `}
`;

export const SegmentedControlLabel = styled.label<SegmentedControlLabelProps>`
  will-change: color, border;
  position: relative;
  white-space: nowrap;
  background-color: transparent;
  padding: ${({ size, $type }) => getControlPadding(size, $type)};
  border: ${({ isSelected, $type }) => getControlBorder($type, isSelected)};
  border-radius: 100px;
  z-index: 10;
  text-align: center;
  ${({ size }) => getTypographyCss(size === 'large' ? 'text-interactive-md' : 'text-interactive-sm')};
  font-weight: ${({ isSelected }) => (isSelected ? '500' : '400')};
  color: ${({ isSelected }) => (isSelected ? getThemeColor('text-4') : getThemeColor('text-1'))};
  transition:
    color 250ms ${controlAnimation},
    border 200ms linear,
    font-weight 200ms ${controlAnimation};

  &:hover {
    font-weight: 500;
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

export const BoldControlTextPlaceholder = styled.span`
  font-weight: 500;
  height: 0;
  color: transparent;
  overflow: hidden;
  visibility: hidden;
  display: block;
`;
