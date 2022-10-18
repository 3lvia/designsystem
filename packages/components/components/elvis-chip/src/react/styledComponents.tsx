import styled from 'styled-components';
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

const defaultFontSize = 16;
const rem = (px: number) => `${px / defaultFontSize}rem`;

const setOpacity = (color: string, opacity: number): string => `${color}${opacity}`;

const setBackgroundColor = (color: ColorType, isLoading: boolean, isSelected: boolean, type: ChipType) => {
  if (type === 'choice') {
    return isSelected ? setOpacity(colors.green, 40) : 'transparent';
  } else if (type === 'legend') {
    return isSelected && !isLoading ? setOpacity(colors[color], 40) : 'transparent';
  } else {
    return setOpacity(colors[color], 40);
  }
};

const setBackgroundColorHover = (color: ColorType, isSelected: boolean, type: ChipType) => {
  if (type !== 'legend') {
    return colors.elviaCharge;
  } else if (isSelected) {
    return setOpacity(colors[color], 20);
  } else {
    return 'transparent';
  }
};

const decideChipBorder = (isLoading: boolean, isSelected: boolean, disabled: boolean, type: ChipType) => {
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
  disabled: boolean;
  isHovering: boolean;
  isLoading: boolean;
  isSelected: boolean;
};

export const ChipComponent = styled.button<ChipComponentProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  background: none;
  box-sizing: border-box;
  border: ${(props: { isLoading: boolean; isSelected: boolean; disabled: boolean; chipType: ChipType }) =>
    decideChipBorder(props.isLoading, props.isSelected, props.disabled, props.chipType)};
  background-color: ${(props: {
    color: ColorType;
    isLoading: boolean;
    isSelected: boolean;
    chipType: ChipType;
  }) => setBackgroundColor(props.color, props.isLoading, props.isSelected, props.chipType)};
  cursor: ${(props: { disabled: boolean }) => (props.disabled ? 'not-allowed' : 'pointer')};
  line-height: 16px;
  font-size: ${rem(14)};
  padding: calc(8px - 1px) calc(16px - 1px);
  border-radius: 24px;
  transition: background-color 300ms ease-in;

  position: relative;
  ${(props: {
    chipType: ChipType;
    color: ColorType;
    disabled: boolean;
    isHovering: boolean;
    isLoading: boolean;
    isSelected: boolean;
  }) =>
    props.isHovering &&
    !props.isLoading &&
    !props.disabled &&
    `background-color: ${setBackgroundColorHover(props.color, props.isSelected, props.chipType)}`}
`;

export const Loading = styled.div`
  @-webkit-keyframes loading-dots {
    0%,
    80%,
    100% {
      -o-transform: scale(0);
      -ms-transform: scale(0);
      -webkit-transform: scale(0);
      transform: scale(0);
    }
    40% {
      -o-transform: scale(1);
      -ms-transform: scale(1);
      -webkit-transform: scale(1);
      transform: scale(1);
    }
  }
  @-moz-keyframes loading-dots {
    0%,
    80%,
    100% {
      -o-transform: scale(0);
      -ms-transform: scale(0);
      -webkit-transform: scale(0);
      transform: scale(0);
    }
    40% {
      -o-transform: scale(1);
      -ms-transform: scale(1);
      -webkit-transform: scale(1);
      transform: scale(1);
    }
  }
  @-o-keyframes loading-dots {
    0%,
    80%,
    100% {
      -o-transform: scale(0);
      -ms-transform: scale(0);
      -webkit-transform: scale(0);
      transform: scale(0);
    }
    40% {
      -o-transform: scale(1);
      -ms-transform: scale(1);
      -webkit-transform: scale(1);
      transform: scale(1);
    }
  }
  @keyframes loading-dots {
    0%,
    80%,
    100% {
      -o-transform: scale(0);
      -ms-transform: scale(0);
      -webkit-transform: scale(0);
      transform: scale(0);
    }
    40% {
      -o-transform: scale(1);
      -ms-transform: scale(1);
      -webkit-transform: scale(1);
      transform: scale(1);
    }
  }
  position: absolute;
  top: 50%; /* position the top  edge of the element at the middle of the parent */
  left: 50%; /* position the left edge of the element at the middle of the parent */
  transform: translate(-50%, -50%);

  > span {
    width: 10px;
    height: 10px;
    background-color: ${(props: { color: ColorType }) => colors[props.color]};
    border-radius: 100%;
    display: inline-block;
    -o-animation: loading-dots 1s infinite ease-in-out both;
    -moz-animation: loading-dots 1s infinite ease-in-out both;
    -webkit-animation: loading-dots 1s infinite ease-in-out both;
    animation: loading-dots 1s infinite ease-in-out both;
  }

  > span:nth-of-type(1) {
    -o-animation-delay: -0.32s;
    -moz-animation-delay: -0.32s;
    -webkit-animation-delay: -0.32s;
    animation-delay: -0.32s;
  }

  > span:nth-of-type(2) {
    -o-animation-delay: -0.16s;
    -moz-animation-delay: -0.16s;
    -webkit-animation-delay: -0.16s;
    animation-delay: -0.16s;
  }
`;

export const ChipDot = styled.span<{ color: ColorType }>`
  &.dot {
    ::before {
      display: grid;
      place-content: center;
      content: '';
      height: 10px;
      width: 10px;
      border-radius: 50%;
      transition: background-color 300ms ease-in;
      background-color: ${colors.gray05};
      margin: 0 8px 0 0;
    }
  }
  &.showDot {
    ::before {
      background-color: ${(props: { color: ColorType }) => colors[props.color]};
    }
  }
  &.disabledDot {
    ::before {
      opacity: 0.3;
    }
  }
  &.hideDot {
    visibility: hidden;
  }
`;

export const ChipTitle = styled.div<{ disabled: boolean }>`
  font-family: 'Red Hat Display', Verdana, sans-serif;
  font-weight: 500;
  text-transform: 'unset';
  letter-spacing: 'unset';
  font-style: unset;
  opacity: 1;
  transition: opacity 300ms ease-in;
  color: ${colors.elviaBlack};

  &.fadeIn {
    opacity: 0.7;
    transition: opacity 300ms ease-in;
  }

  &.disabled {
    opacity: 0.3;
  }

  &.hide {
    visibility: hidden;
    opacity: 0.7;
  }
`;
