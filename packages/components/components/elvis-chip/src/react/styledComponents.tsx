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

const getChipBackground = (
  color: ColorType,
  isSelected: boolean,
  isHovering: boolean,
  isDisabled: boolean,
  isLoading: boolean,
  type: ChipType,
): string => {
  switch (type) {
    case 'removable':
      return isHovering && !isDisabled
        ? getBaseThemeColor('green', 'light')
        : setOpacity(chipBackgroundColors[color], 30);
    case 'choice':
      if (isSelected) {
        return setOpacity(chipBackgroundColors['green'], 30);
      }
      return 'transparent';
    case 'legend':
      if (isSelected && !isLoading) {
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
  isHovering: boolean,
  isLoading: boolean,
  type: ChipType,
): string => {
  switch (type) {
    case 'removable':
      if (isDisabled) {
        return `${setOpacity(chipBackgroundColorsDark[color], 30)}`;
      } else if (isHovering) {
        return 'transparent';
      }
      return `${chipBackgroundColorsDark[color]}`;
    case 'choice':
      if (isSelected) {
        return `${chipBackgroundColorsDark['green']}`;
      }
      return `${getBaseThemeColor('grey-60', 'dark')}`;
    case 'legend':
      if (isSelected && !isLoading) {
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
  position: relative;
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: center;
  border: solid 1px ${({ isLoading, isSelected, chipType }) => getChipBorder(isLoading, isSelected, chipType)};
  background-color: ${({ color, isSelected, isHovering, isDisabled, isLoading, chipType }) =>
    getChipBackground(color, isSelected, isHovering, isDisabled, isLoading, chipType)};
  padding: 7px 15px;
  border-radius: 24px;
  transition: background-color 150ms ease-in;
  white-space: nowrap;
  cursor: ${({ isDisabled, isLoading }) => getCursor(isDisabled, isLoading)};

  .e-theme-dark && {
    border: solid 1px
      ${({ color, isSelected, isDisabled, isHovering, isLoading, chipType }) =>
        getChipBorderDark(color, isSelected, isDisabled, isHovering, isLoading, chipType)};
    background-color: transparent;
    &:hover {
      background-color: ${({ chipType, isDisabled }) =>
        chipType === 'removable' && !isDisabled && getBaseThemeColor('green', 'dark')};
    }
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
  chipType: ChipType;
  isDisabled: boolean;
  isHovering: boolean;
  isHidden: boolean;
}

export const ChipTitle = styled.div<ChipTitleProps>`
  font-family: 'Red Hat Display', Verdana, sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  text-transform: 'unset';
  letter-spacing: 'unset';
  font-style: unset;
  transition: opacity 150ms ease-in;
  visibility: ${({ isHidden }) => (isHidden ? 'hidden' : 'visible')};
`;
