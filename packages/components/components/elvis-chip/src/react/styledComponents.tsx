import styled from 'styled-components';
import { ColorType } from './elvia-chip.types';
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
};

const setOpacity = (color: string, opacity: number): string => `${color}${opacity}`;

const setBackgroundColor = (color: ColorType, isSelected: boolean, type: string) => {
  if (type !== 'removable') {
    return isSelected ? setOpacity(colors[color], 40) : 'transparent';
  } else {
    return setOpacity(colors[color], 40);
  }
};

type ChipComponentProps = {
  color: ColorType;
  isSelected: boolean;
  chipType: string;
  disabled: boolean;
};

export const ChipComponent = styled.button<ChipComponentProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  background: none;
  border: none;
  background-color: ${(props: { color: ColorType; isSelected: boolean; chipType: string }) =>
    setBackgroundColor(props.color, props.isSelected, props.chipType)};
  cursor: ${(props: { disabled: boolean }) => (props.disabled ? 'not-allowed' : 'pointer')};
  font-size: 14px;
  line-height: 16px;
  padding: calc(8px - 1px) calc(16px - 1px);
  border-radius: 24px;
  &:hover:not(:disabled) {
    background-color: ${(props: { chipType: string }) =>
      props.chipType === 'removable' ? colors.elviaCharge : 'transparent'};
  }
`;

type ChipTitleProps = {
  disabled: boolean;
  color: ColorType;
};

export const ChipTitle = styled.div<ChipTitleProps>`
  font-family: 'Red Hat Display', Verdana, sans-serif;
  font-weight: 500;
  text-transform: 'unset';
  letter-spacing: 'unset';
  font-style: unset;
  opacity: ${(props: { disabled: boolean }) => (props.disabled ? '0.3' : '1')};
  color: ${colors.elviaBlack};

  &.dot {
    ::before {
      display: inline-block;
      content: '';
      height: 10px;
      width: 10px;
      border-radius: 50%;
      background-color: transparent;
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
`;
