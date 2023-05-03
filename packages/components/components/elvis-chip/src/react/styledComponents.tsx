import styled, { keyframes } from 'styled-components';
import { ColorType, ChipType } from './elvia-chip.types';
import { getThemeColor } from '@elvia/elvis-colors';

export const chipBackgroundColors = {
  green: getThemeColor('data-1'),
  violet: getThemeColor('data-2'),
  blue: getThemeColor('data-3'),
  purple: getThemeColor('data-4'),
  orange: getThemeColor('data-5'),
  red: getThemeColor('data-6'),
};

const setOpacity = (color: string, opacity: number): string => `${color}${opacity}`;

const setBackgroundColor = (
  color: ColorType,
  isLoading: boolean,
  isSelected: boolean,
  type: ChipType,
): string => {
  if (type === 'choice') {
    return isSelected ? setOpacity(chipBackgroundColors.green, 40) : 'transparent';
  } else if (type === 'legend') {
    return isSelected && !isLoading ? setOpacity(chipBackgroundColors[color], 40) : 'transparent';
  } else {
    return setOpacity(chipBackgroundColors[color], 40);
  }
};

const setBackgroundColorHover = (color: ColorType, isSelected: boolean, type: ChipType): string => {
  if (type !== 'legend') {
    return getThemeColor('background-hover-1');
  } else if (isSelected) {
    return setOpacity(chipBackgroundColors[color], 20);
  } else {
    return 'transparent';
  }
};

const decideChipBorder = (isLoading: boolean, isSelected: boolean, type: ChipType): string => {
  if ((type === 'choice' || type === 'legend') && (!isSelected || isLoading)) {
    return `solid 1px ${getThemeColor('border-4')}`;
  }
  return 'solid 1px transparent';
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
  background: none;
  box-sizing: border-box;
  border: ${({ isLoading, isSelected, chipType }) => decideChipBorder(isLoading, isSelected, chipType)};
  background-color: ${({ color, isLoading, isSelected, chipType }) =>
    setBackgroundColor(color, isLoading, isSelected, chipType)};
  cursor: ${({ isDisabled }) => (isDisabled ? 'not-allowed' : 'pointer')};
  font-size: 14px;
  line-height: 16px;
  padding: 7px 15px;
  border-radius: 24px;
  transition: background-color 150ms ease-in;
  white-space: nowrap;
  position: relative;
  ${({ isHovering, isLoading, isDisabled, color, isSelected, chipType }) =>
    isHovering &&
    !isLoading &&
    !isDisabled &&
    `background-color: ${setBackgroundColorHover(color, isSelected, chipType)}`}
`;

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

interface ChipLoadingProps {
  color: ColorType;
}

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
  opacity: ${({ isDisabled }) => (isDisabled ? 0.3 : 1)};
  transition: opacity 150ms ease-in;
  color: ${getThemeColor('text-1')};
  visibility: ${({ isHidden }) => (isHidden ? 'hidden' : 'visible')};
`;
