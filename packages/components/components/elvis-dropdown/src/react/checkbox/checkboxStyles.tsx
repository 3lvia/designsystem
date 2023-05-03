import { getThemeColor } from '@elvia/elvis-colors';
import styled, { css } from 'styled-components';
import { CheckboxProps, IndeterminateLineProps } from './checkbox';

const checkMarkLeaveDuration = '100ms';
const checkMarkEnterDuration = '180ms';

export const IndeterminateLine = styled.div<IndeterminateLineProps>`
  height: 2px;
  position: absolute;
  width: ${({ isCompact }) => (isCompact ? '6px' : '10px')};
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  &:after {
    border-radius: 2px;
    content: '';
    display: block;
    height: 100%;
    width: 100%;
    background-color: ${getThemeColor('static-black')};
    transition: transform ${checkMarkLeaveDuration};
    transform: scaleX(0);
  }
`;

const checkmarkLineBase = css<CheckboxProps>`
  background-color: ${({ isDisabled }) =>
    isDisabled ? getThemeColor('text-disabled-1') : getThemeColor('static-black')};
  border-radius: 2px;
  content: '';
  height: 2px;
  position: absolute;
  transform-origin: left center;
`;

export const StyledCheckbox = styled.div<CheckboxProps>`
  flex: none;
  aspect-ratio: 1 / 1;
  width: 24px;
  background-color: ${getThemeColor('background-element-1')};
  border-radius: ${({ isCompact }) => (isCompact ? '3px' : '4px')};
  border: 1px solid ${getThemeColor('text-1')};
  position: relative;

  &::before {
    ${checkmarkLineBase}
    top: 54%;
    left: 20%;
    width: 33%;
    transform: rotate(45deg) scaleX(0);
    transition: transform ${checkMarkLeaveDuration} ease ${checkMarkLeaveDuration};
  }

  &::after {
    ${checkmarkLineBase}
    bottom: 14%;
    left: 38%;
    width: 74%;
    transform: rotate(-55deg) scaleX(0);
    transition: transform ${checkMarkLeaveDuration} ease;
  }

  ${({ isIndeterminate }) =>
    isIndeterminate &&
    css`
      background-color: ${getThemeColor('background-hover-1')};

      ${IndeterminateLine}::after {
        transform: scaleX(1);
        transition: transform ${checkMarkEnterDuration} ease ${checkMarkEnterDuration};
      }
    `};

  ${({ isChecked }) =>
    isChecked &&
    css`
      background-color: ${getThemeColor('background-selected-1')};

      &::before {
        transform: rotate(45deg) scaleX(1);
        transition: transform ${checkMarkEnterDuration} ease;
      }

      &::after {
        transform: rotate(-55deg) scaleX(1);
        transition: transform ${checkMarkEnterDuration} ease ${checkMarkEnterDuration};
      }
    `};

  ${({ isCompact }) =>
    isCompact &&
    css`
      width: 16px;

      &::before,
      &::after,
      ${IndeterminateLine} {
        height: 1px;
      }
    `};

  ${({ isFocused, isDisabled }) =>
    isFocused &&
    !isDisabled &&
    css`
      background-color: ${getThemeColor('background-selected-1')};
    `};

  ${({ isDisabled }) =>
    isDisabled &&
    css`
      background-color: ${getThemeColor('background-disabled-1')};
      border: 1px solid ${getThemeColor('border-disabled-1')};
      cursor: not-allowed;
    `};

  ${({ isIndeterminate, isChecked, currentTheme, isDisabled }) =>
    (isChecked || isIndeterminate || (isChecked && isDisabled)) &&
    currentTheme === 'dark' &&
    css`
      border: none;
    `};
`;
