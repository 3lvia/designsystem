import styled, { keyframes } from 'styled-components';
import { ColorType, ChipType } from './elvia-chip.types';
import { getColor } from '@elvia/elvis-colors';

export const colors = {
  elviaCharge: getColor('elvia-charge'),
  elviaBlack: getColor('black'),
  blue: getColor('blue-berry'),
  green: getColor('green-apple'),
  orange: getColor('orange-mango'),
  purple: getColor('purple-plum'),
  red: getColor('red-tomato'),
  violet: getColor('violet-grape'),
  gray05: getColor('grey-05'),
};

const setOpacity = (color: string, opacity: number): string => `${color}${opacity}`;

const setBackgroundColor = (
  color: ColorType,
  isLoading: boolean,
  isSelected: boolean,
  type: ChipType,
): string => {
  if (type === 'choice') {
    return isSelected ? setOpacity(colors.green, 40) : 'transparent';
  } else if (type === 'legend') {
    return isSelected && !isLoading ? setOpacity(colors[color], 40) : 'transparent';
  } else {
    return setOpacity(colors[color], 40);
  }
};

const setBackgroundColorHover = (color: ColorType, isSelected: boolean, type: ChipType): string => {
  if (type !== 'legend') {
    return colors.elviaCharge;
  } else if (isSelected) {
    return setOpacity(colors[color], 20);
  } else {
    return 'transparent';
  }
};

const decideChipBorder = (
  isLoading: boolean,
  isSelected: boolean,
  disabled: boolean,
  type: ChipType,
): string => {
  if (disabled) {
    return 'solid 1px transparent';
  } else if (type === 'legend' && (!isSelected || isLoading)) {
    return `solid 1px ${colors.gray05}`;
  } else if (type === 'choice' && !isSelected) {
    return `solid 1px ${colors.gray05}`;
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
  border: ${({ isLoading, isSelected, isDisabled, chipType }) =>
    decideChipBorder(isLoading, isSelected, isDisabled, chipType)};
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
    background-color: ${({ color }) => colors[color]};
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
  background-color: ${({ showDot, color }) => (showDot ? colors[color] : colors.gray05)};
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
  color: ${colors.elviaBlack};
  visibility: ${({ isHidden }) => (isHidden ? 'hidden' : 'visible')};
`;
