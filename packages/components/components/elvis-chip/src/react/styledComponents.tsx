import { LightThemeColorName, getBaseColor, getThemeColor } from '@elvia/elvis-colors';
import { getTypographyCss } from '@elvia/elvis-typography';
import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';

import { ChipMarkerStyle, ChipType, ColorType } from './elvia-chip.types';

const mapChipColor = (color: ColorType, opacity?: 10 | 30 | 50): LightThemeColorName => {
  switch (color) {
    case 'green':
      return ('green-apple' + (opacity ? '-' + opacity : '')) as LightThemeColorName;
    case 'violet':
      return ('violet-grape' + (opacity ? '-' + opacity : '')) as LightThemeColorName;
    case 'blue':
      return ('blue-berry' + (opacity ? '-' + opacity : '')) as LightThemeColorName;
    case 'purple':
      return ('purple-plum' + (opacity ? '-' + opacity : '')) as LightThemeColorName;
    case 'orange':
      return ('orange-mango' + (opacity ? '-' + opacity : '')) as LightThemeColorName;
    case 'red':
      return ('red-tomato' + (opacity ? '-' + opacity : '')) as LightThemeColorName;
  }
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
        return getBaseColor(mapChipColor(color, 10));
      }
      return getBaseColor(mapChipColor(color, 30));
    case 'choice':
      if (isSelected && isHovering) {
        return getBaseColor(mapChipColor('green', 10));
      } else if (isSelected) {
        return getBaseColor(mapChipColor('green', 30));
      }
      return 'transparent';
    case 'legend':
      if (isSelected && isHovering && !isLoading) {
        return getBaseColor(mapChipColor(color, 10));
      } else if (isSelected && !isLoading) {
        return getBaseColor(mapChipColor(color, 30));
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
        return `${getBaseColor(mapChipColor(color, 30), 'dark')}`;
      } else if (isHovering) {
        return 'transparent';
      }
      return `${getBaseColor(mapChipColor(color), 'dark')}`;
    case 'choice':
      if (isSelected && isHovering) {
        return `${getBaseColor(mapChipColor(color, 50), 'dark')}`;
      } else if (isSelected) {
        return `${getBaseColor(mapChipColor('green', 30), 'dark')}`;
      }
      return `${getBaseColor('grey-60', 'dark')}`;
    case 'legend':
      if (isSelected && isHovering && !isLoading) {
        return `${getBaseColor(mapChipColor(color, 50), 'dark')}`;
      } else if (isSelected && !isLoading) {
        return `${getBaseColor(mapChipColor(color), 'dark')}`;
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
    background-color: ${({ color }) => getBaseColor(mapChipColor(color))};
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
  markerStyle?: ChipMarkerStyle;
}

export const ChipDot = styled.span<ChipDotProps>`
  --mark-color: ${({ showDot, color }) =>
    showDot ? getBaseColor(mapChipColor(color)) : getThemeColor('border-4')};
  display: inline-block;
  width: 10px;
  transition: background-color 150ms ease-in;
  background-color: var(--mark-color);
  opacity: ${({ isDisabled }) => (isDisabled ? 0.3 : 1)};
  visibility: ${({ isHidden }) => (isHidden ? 'hidden' : 'visible')};

  ${({ markerStyle }) => {
    switch (markerStyle) {
      case 'line':
        return css`
          position: relative;
          height: 3px;
          background-color: transparent;
          ::before {
            content: '';
            position: absolute;
            left: -1px;
            display: block;
            width: 12px;
            height: 3px;
            background-color: var(--mark-color);
            border-radius: 8px;
            transition: background-color 150ms ease-in;
          }
        `;
      case 'dashed':
        return css`
          position: relative;
          height: 3px;
          background-color: transparent;

          ::before,
          ::after {
            content: '';
            position: absolute;
            display: block;
            width: 5px;
            height: 3px;
            background-color: var(--mark-color);
            border-radius: 8px;
            transition: background-color 150ms ease-in;
          }

          ::before {
            left: -1px;
          }

          ::after {
            left: 6px;
          }
        `;
      case 'dot':
      default:
        return css`
          height: 10px;
          border-radius: 50%;
        `;
    }
  }}
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
