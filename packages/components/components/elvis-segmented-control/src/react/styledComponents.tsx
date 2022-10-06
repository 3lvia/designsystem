import styled, { css } from 'styled-components';

import { getColor } from '@elvia/elvis-colors';
import { getTypographyCss } from '@elvia/elvis-typography';
import { SegmentedControlContainerProps, SegmentedControlRadioProps } from './elviaSegmentedControl.types';

const colors = {
  elviaWhite: getColor('white'),
  elviaBlack: getColor('black'),
  elviaCharge: getColor('green'),
};
const typography = {
  textMedium: getTypographyCss('text-md'),
};
const buttonPaddingXLarge = 40;
const buttonPaddingXMedium = 24;
const buttonPaddingXSmall = 22;
const buttonPaddingYLarge = 12;
const buttonPaddingYMedium = 8;
const buttonPaddingYSmall = 4;
const iconButtonPaddingLarge = 12;
const iconButtonPaddingMedium = 12;
const iconButtonPaddingSmall = 8;
const fontSizeLarge = '16px';
const fontSizeMedium = '14px';
const fontSizeSmall = '14px';
const controlAnimation = 'cubic-bezier(0.71, 0, 0.31, 1)';

const getVerticalSpacing = (size: string): number => {
  if (size === 'large') {
    return buttonPaddingXLarge * 2;
  } else if (size === 'medium') {
    return buttonPaddingXMedium * 2;
  } else {
    return buttonPaddingXSmall * 2;
  }
};

const buttonPaddingget = (size: string, scType: string) => {
  if (scType === 'icon') {
    if (size === 'large') {
      return `${iconButtonPaddingLarge}px`;
    } else if (size === 'medium') {
      return `${iconButtonPaddingMedium}px`;
    } else {
      return `${iconButtonPaddingSmall}px`;
    }
  } else {
    if (size === 'large') {
      return `${buttonPaddingYLarge}px ${buttonPaddingXLarge}px`;
    } else if (size === 'medium') {
      return `${buttonPaddingYMedium}px ${buttonPaddingXMedium}px`;
    } else {
      return `${buttonPaddingYSmall}px ${buttonPaddingXSmall}px`;
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

const getControlWidth = (maxLengthOfLabel: number, size: string, scType: string): string => {
  if (scType === 'icon') {
    return 'content';
  } else {
    return `calc(${maxLengthOfLabel}ch + ${getVerticalSpacing(size)}px)`;
  }
};

const getSelectedStartPos = (
  maxLengthOfLabel: number,
  size: string,
  selectedIndex: number,
  scType: string,
): string => {
  return `calc(${selectedIndex} * ${getControlWidth(maxLengthOfLabel, size, scType)})`;
};

const getControlBorder = (scType: string, isSelected: boolean, isHovering?: boolean): string => {
  if (scType === 'icon' && isSelected) {
    return 'inset 0 0 0 1px black';
  } else if (scType === 'icon' && isHovering) {
    return 'inset 0 0 0 1px ' + colors.elviaCharge;
  } else {
    return 'none';
  }
};

export const SegmentedControlContainer = styled.div<SegmentedControlContainerProps>`
  display: flex;
  position: relative;
  width: fit-content;
  border: ${(props) => (props.scType === 'text' ? '1px solid black' : 'none')};
  border-radius: 100px;
  gap: ${(props) => (props.scType === 'text' ? '0' : '8px')};

  ${typography.textMedium}
  font-size: ${(props) => getFontSize(props.size)};
  text-align: center;

  ${(props) =>
    props.scType === 'text' &&
    css`
      &::after {
        position: absolute;
        content: '';
        width: ${getControlWidth(props.maxLengthOfLabel, props.size, props.scType)};
        height: 100%;
        top: 0;
        left: ${getSelectedStartPos(props.maxLengthOfLabel, props.size, props.selectedIndex, props.scType)};
        border-radius: 100px;
        background-color: ${colors.elviaBlack};
        transition: all 250ms ${controlAnimation};
      }
    `}
`;

export const SegmentedControlRadio = styled.label<SegmentedControlRadioProps>`
  position: relative;
  width: ${(props) => getControlWidth(props.maxLengthOfLabel, props.size, props.scType)};
  background-color: transparent;
  padding: ${(props) => buttonPaddingget(props.size, props.scType)};
  box-shadow: ${(props) => getControlBorder(props.scType, props.isSelected)};
  border-radius: 100px;
  z-index: 10;

  color: ${(props) => (props.isSelected ? colors.elviaWhite : colors.elviaBlack)};
  text-shadow: ${(props) => (props.isSelected ? '0 0 0 white, 0 0 0.5px white' : '0')};
  transition: color 300ms ${controlAnimation};

  &:hover {
    text-shadow: ${(props) =>
      props.isSelected ? '0 0 0 white, 0 0 0.5px white' : '0 0 0 black, 0 0 0.5px black'};
    box-shadow: ${(props) => getControlBorder(props.scType, props.isSelected, true)};
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
