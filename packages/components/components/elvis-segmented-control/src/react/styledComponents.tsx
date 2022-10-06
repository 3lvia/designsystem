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
const largeButtonPaddingX = 40;
const mediumButtonPaddingX = 40;
const smallButtonPaddingX = 40;
const largeButtonPaddingY = 12;
const mediumButtonPaddingY = 8;
const smallButtonPaddingY = 4;
const iconLargeButtonPadding = 12;
const iconMediumButtonPadding = 12;
const iconSmallButtonPadding = 8;
const largeFontSize = '16px';
const mediumFontSize = '14px';
const smallFontSize = '14px';
const controlAnimation = 'cubic-bezier(0.71, 0, 0.31, 1)';

const getVerticalSpacing = (size: string): number => {
  if (size === 'large') {
    return largeButtonPaddingX * 2;
  } else if (size === 'medium') {
    return mediumButtonPaddingX * 2;
  } else {
    return smallButtonPaddingX * 2;
  }
};

const getButtonPadding = (size: string, scType: string) => {
  if (scType === 'icon') {
    if (size === 'large') {
      return `${iconLargeButtonPadding}px`;
    } else if (size === 'medium') {
      return `${iconMediumButtonPadding}px`;
    } else {
      return `${iconSmallButtonPadding}px`;
    }
  } else {
    if (size === 'large') {
      return `${largeButtonPaddingY}px ${largeButtonPaddingX}px`;
    } else if (size === 'medium') {
      return `${mediumButtonPaddingY}px ${mediumButtonPaddingX}px`;
    } else {
      return `${smallButtonPaddingY}px ${smallButtonPaddingX}px`;
    }
  }
};

const getFontSize = (size: string) => {
  if (size === 'large') {
    return largeFontSize;
  } else if (size === 'medium') {
    return mediumFontSize;
  } else {
    return smallFontSize;
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
  ${typography.textMedium}
  font-size: ${(props) => getFontSize(props.size)};
  color: ${(props) => (props.isSelected ? colors.elviaWhite : colors.elviaBlack)};
  text-shadow: ${(props) => (props.isSelected ? '0 0 0 white, 0 0 0.5px white' : '0')};
  text-align: center;
  transition: color 300ms ${controlAnimation};

  position: relative;
  width: ${(props) => getControlWidth(props.maxLengthOfLabel, props.size, props.scType)};
  background-color: transparent;
  padding: ${(props) => getButtonPadding(props.size, props.scType)};
  box-shadow: ${(props) => getControlBorder(props.scType, props.isSelected)};
  border-radius: 100px;
  z-index: 10;

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
