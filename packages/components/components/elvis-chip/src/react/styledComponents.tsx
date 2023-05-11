import styled, { keyframes } from 'styled-components';
import { ColorType, ChipType } from './elvia-chip.types';
import { getThemeColor, getBaseThemeColor } from '@elvia/elvis-colors';

export const chipBackgroundColors = {
  green: getBaseThemeColor('green-apple', 'light'),
  violet: getBaseThemeColor('violet-grape', 'light'),
  blue: getBaseThemeColor('blue-berry', 'light'),
  purple: getBaseThemeColor('purple-plum', 'light'),
  orange: getBaseThemeColor('orange-mango', 'light'),
  red: getBaseThemeColor('red-tomato', 'light'),
};
export const chipBackgroundColorsDark = {
  green: getBaseThemeColor('green-apple', 'dark'),
  violet: getBaseThemeColor('violet-grape', 'dark'),
  blue: getBaseThemeColor('blue-berry', 'dark'),
  purple: getBaseThemeColor('purple-plum', 'dark'),
  orange: getBaseThemeColor('orange-mango', 'dark'),
  red: getBaseThemeColor('red-tomato', 'dark'),
};

const setOpacity = (color: string, opacity: number): string => `${color}${opacity}`;

const getChipBackground = (color: ColorType, isSelected: boolean, type: ChipType): string => {
  switch (type) {
    case 'removable':
      return setOpacity(chipBackgroundColors[color], 30);
    case 'choice':
      if (isSelected) {
        return setOpacity(chipBackgroundColors['green'], 30);
      }
      return 'transparent';
    case 'legend':
      if (isSelected) {
        return setOpacity(chipBackgroundColors[color], 30);
      }
      return 'transparent';
  }
};

const getChipBorder = (isLoading: boolean, isSelected: boolean, type: ChipType): string => {
  if ((type === 'choice' || type === 'legend') && (!isSelected || isLoading)) {
    return `${getThemeColor('border-4')}`;
  }
  return 'transparent';
};

const getChipBorderDark = (
  color: ColorType,
  isSelected: boolean,
  isDisabled: boolean,
  type: ChipType,
): string => {
  switch (type) {
    case 'removable':
      if (isDisabled) {
        return `${setOpacity(chipBackgroundColorsDark[color], 30)}`;
      }
      return `${chipBackgroundColorsDark[color]}`;
    case 'choice':
      if (isSelected) {
        return `${chipBackgroundColorsDark['green']}`;
      }
      return `${getBaseThemeColor('grey-60', 'dark')}`;
    case 'legend':
      if (isSelected) {
        return `${chipBackgroundColorsDark[color]}`;
      }
      return `${getBaseThemeColor('grey-60', 'dark')}`;
  }
};

const getCursor = (isDisabled: boolean, isLoading: boolean): string => {
  if (isDisabled) {
    return 'not-allowed';
  } else if (isLoading) {
    return 'wait';
  }
  return 'pointer';
};

type ChipComponentProps = {
  chipType: ChipType;
  color: ColorType;
  isDisabled: boolean;
  isHovering: boolean;
  isLoading: boolean;
  isSelected: boolean;
};

export const ChipComponent = styled.button<ChipComponentProps>`
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: center;
  box-sizing: border-box;
  border: solid 1px ${({ isLoading, isSelected, chipType }) => getChipBorder(isLoading, isSelected, chipType)};
  background-color: ${({ color, isSelected, chipType }) => getChipBackground(color, isSelected, chipType)};
  cursor: ${({ isDisabled, isLoading }) => getCursor(isDisabled, isLoading)};
  font-size: 14px;
  line-height: 16px;
  padding: 7px 15px;
  border-radius: 24px;
  transition: background-color 150ms ease-in;
  white-space: nowrap;
  position: relative;
  .e-theme-dark && {
    border: solid 1px
      ${({ color, isSelected, isDisabled, chipType }) =>
        getChipBorderDark(color, isSelected, isDisabled, chipType)};
    background-color: transparent !important;
  }
`;

interface ChipLoadingProps {
  color: ColorType;
}

const loadingDotsAnimation = keyframes`
  0%,
  80%,
  100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
`;

export const ChipLoading = styled.div<ChipLoadingProps>`
  position: absolute;
  top: 50%; /* position the top  edge of the element at the middle of the parent */
  left: 50%; /* position the left edge of the element at the middle of the parent */
  transform: translate(-50%, -50%);

  > span {
    width: 10px;
    height: 10px;
    background-color: ${({ color }) => chipBackgroundColors[color]};
    border-radius: 100%;
    display: inline-block;
    animation: ${loadingDotsAnimation} 1s infinite ease-in-out both;
  }

  > span:nth-of-type(1) {
    animation-delay: -0.32s;
  }

  > span:nth-of-type(2) {
    animation-delay: -0.16s;
  }
`;

interface ChipDotProps {
  color: ColorType;
  showDot: boolean;
  isDisabled: boolean;
  isHidden: boolean;
}

export const ChipDot = styled.span<ChipDotProps>`
  display: inline-block;
  height: 10px;
  width: 10px;
  border-radius: 50%;
  transition: background-color 150ms ease-in;
  background-color: ${({ showDot, color }) =>
    showDot ? chipBackgroundColors[color] : getThemeColor('border-4')};
  opacity: ${({ isDisabled }) => (isDisabled ? 0.3 : 1)};
  visibility: ${({ isHidden }) => (isHidden ? 'hidden' : 'visible')};
`;

interface ChipTitleProps {
  isDisabled: boolean;
  isHidden: boolean;
}

export const ChipTitle = styled.div<ChipTitleProps>`
  font-family: 'Red Hat Display', Verdana, sans-serif;
  font-weight: 500;
  text-transform: 'unset';
  letter-spacing: 'unset';
  font-style: unset;
  color: ${({ isDisabled }) => (isDisabled ? getThemeColor('text-disabled-1') : getThemeColor('text-1'))};
  transition: opacity 150ms ease-in;
  visibility: ${({ isHidden }) => (isHidden ? 'hidden' : 'visible')};
`;
