import styled, { css } from 'styled-components';

import { getColor } from '@elvia/elvis-colors';
import { getTypographyCss } from '@elvia/elvis-typography';
import { SegmentedControlContainerProps, SegmentedControlLabelProps } from './elviaSegmentedControl.types';

const colors = {
  elviaWhite: getColor('white'),
  elviaBlack: getColor('black'),
  elviaCharge: getColor('green'),
};
const typography = {
  textMedium: getTypographyCss('text-md'),
};
const controlPaddingXLarge = 40;
const controlPaddingXMedium = 24;
const controlPaddingXSmall = 22;
const controlPaddingYLarge = 12;
const controlPaddingYMedium = 8;
const controlPaddingYSmall = 4;
const iconControlPaddingLarge = 12;
const iconControlPaddingMedium = 12;
const iconControlPaddingSmall = 8;
const fontSizeLarge = '16px';
const fontSizeMedium = '14px';
const fontSizeSmall = '14px';
const controlAnimation = 'cubic-bezier(0.71, 0, 0.31, 1)';

const controlPadding = (size: string, scType: string) => {
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

const getControlBorder = (scType: string, isSelected: boolean, isHovering?: boolean): string => {
  if (scType === 'icon' && isSelected) {
    return '1px solid black';
  } else if (scType === 'icon' && isHovering) {
    return '1px solid ' + colors.elviaCharge;
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
  border: ${(props) => (props.scType === 'text' ? '1px solid black' : 'none')};
  border-radius: 100px;
  gap: ${(props) => (props.scType === 'text' ? '0' : '8px')};
  background: ${(props) => (props.scType === 'text' ? colors.elviaWhite : 'transparent')};

  // Selected control background
  ${(props) =>
    props.scType === 'text' &&
    css`
      &::after {
        content: '';
        position: absolute;
        width: ${props.widthOfContainer / props.numberOfControls + 'px'};
        height: 100%;
        top: 0;
        left: ${(props.widthOfContainer / props.numberOfControls) * props.selectedIndex + 'px'};
        border-radius: 100px;
        background-color: ${colors.elviaBlack};
        transition: left 250ms ${controlAnimation};
      }
    `}
`;

export const SegmentedControlLabel = styled.label<SegmentedControlLabelProps>`
  position: relative;
  white-space: nowrap;
  background-color: transparent;
  padding: ${(props) => controlPadding(props.size, props.scType)};
  border: ${(props) => getControlBorder(props.scType, props.isSelected)};
  border-radius: 100px;
  z-index: 10;

  ${typography.textMedium}
  font-size: ${(props) => getFontSize(props.size)};
  text-align: center;
  color: ${(props) => (props.isSelected ? colors.elviaWhite : colors.elviaBlack)};
  text-shadow: ${(props) => (props.isSelected ? '0 0 0 white, 0 0 0.5px white' : '0')};

  transition: color 250ms ${controlAnimation}, border 200ms linear;

  &:hover {
    text-shadow: ${(props) =>
      props.isSelected ? '0 0 0 white, 0 0 0.5px white' : '0 0 0 black, 0 0 0.5px black'};
    border: ${(props) => getControlBorder(props.scType, props.isSelected, true)};
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
