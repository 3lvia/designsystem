import styled, { keyframes } from 'styled-components';
import { ColorType, ChipType } from './elvia-chip.types';
import {
  getThemeColor,
  getBaseColor,
  ThemeName,
  LightThemeColorName,
  DarkThemeColorName,
} from '@elvia/elvis-colors';
import { getTypographyCss } from '@elvia/elvis-typography';

export const chipColors = (color: ColorType, theme: ThemeName = 'light', opacity?: 10 | 30 | 50) => {
  switch (color) {
    case 'green':
      return getBaseColor(getOpacityColorName('green-apple', opacity), theme);
    case 'violet':
      return getBaseColor(getOpacityColorName('violet-grape', opacity), theme);
    case 'blue':
      return getBaseColor(getOpacityColorName('blue-berry', opacity), theme);
    case 'purple':
      return getBaseColor(getOpacityColorName('purple-plum', opacity), theme);
    case 'orange':
      return getBaseColor(getOpacityColorName('orange-mango', opacity), theme);
    case 'red':
      return getBaseColor(getOpacityColorName('red-tomato', opacity), theme);
  }
};

const getOpacityColorName = (colorName: LightThemeColorName | DarkThemeColorName, opacity?: 10 | 30 | 50) => {
  return (colorName + (opacity ? '-' + opacity : '')) as LightThemeColorName | DarkThemeColorName;
};

const getChipBackgroundLight = (
  color: ColorType,
  isSelected: boolean,
  isHovering: boolean,
  isDisabled: boolean,
  isLoading: boolean,
  type: ChipType,
): string => {
  switch (type) {
    case 'removable':
      if (isHovering && !isDisabled) {
        return getBaseColor('green');
      } else if (isDisabled) {
        return chipColors(color, 'light', 10);
      }
      return chipColors(color, 'light', 30);
    case 'choice':
      if (isSelected && isHovering) {
        return chipColors('green', 'light', 10);
      } else if (isSelected) {
        return chipColors('green', 'light', 30);
      }
      return 'transparent';
    case 'legend':
      if (isSelected && isHovering && !isLoading) {
        return chipColors(color, 'light', 10);
      } else if (isSelected && !isLoading) {
        return chipColors(color, 'light', 30);
      }
      return 'transparent';
  }
};

const getChipBorderLight = (isLoading: boolean, isSelected: boolean, type: ChipType): string => {
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
        return `${chipColors(color, 'dark', 30)}`;
      } else if (isHovering) {
        return 'transparent';
      }
      return `${chipColors(color, 'dark')}`;
    case 'choice':
      if (isSelected && isHovering) {
        return `${chipColors(color, 'dark', 50)}`;
      } else if (isSelected) {
        return `${chipColors('green', 'dark')}`;
      }
      return `${getBaseColor('grey-60', 'dark')}`;
    case 'legend':
      if (isSelected && isHovering && !isLoading) {
        return `${chipColors(color, 'dark', 50)}`;
      } else if (isSelected && !isLoading) {
        return `${chipColors(color, 'dark')}`;
      }
      return `${getBaseColor('grey-60', 'dark')}`;
  }
};

const getCursor = (isDisabled: boolean, isLoading: boolean) => {
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
  hasImage: boolean;
};

export const ChipComponent = styled.button<ChipComponentProps>`
  position: relative;
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: center;
  border: solid 1px
    ${({ isLoading, isSelected, chipType }) => getChipBorderLight(isLoading, isSelected, chipType)};
  background-color: ${({ color, isSelected, isHovering, isDisabled, isLoading, chipType }) =>
    getChipBackgroundLight(color, isSelected, isHovering, isDisabled, isLoading, chipType)};
  padding: ${({ hasImage }) => (hasImage ? '3px 15px 3px 3px' : '5px 15px')};
  border-radius: 24px;
  transition: background-color 150ms ease-in;
  white-space: nowrap;
  cursor: ${({ isDisabled, isLoading }) => getCursor(isDisabled, isLoading)};

  .e-color-background-3 &&,
  .e-theme-dark && {
    border: solid 1px
      ${({ color, isSelected, isDisabled, isHovering, isLoading, chipType }) =>
        getChipBorderDark(color, isSelected, isDisabled, isHovering, isLoading, chipType)};
    transition: border 150ms ease-in;
    background-color: transparent;
    &:hover {
      background-color: ${({ chipType, isDisabled }) =>
        chipType === 'removable' && !isDisabled && getBaseColor('green', 'dark')};
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
    background-color: ${({ color }) => chipColors(color)};
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
  background-color: ${({ showDot, color }) => (showDot ? chipColors(color) : getThemeColor('border-4'))};
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
  ${getTypographyCss('text-interactive-sm')};
  transition: opacity 150ms ease-in;
  visibility: ${({ isHidden }) => (isHidden ? 'hidden' : 'visible')};
`;

export const ChipImageContainer = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 999999px;
  overflow: hidden;
  & > * {
    width: 100%;
    height: 100%;
  }

  &:empty {
    display: none;
  }
`;
