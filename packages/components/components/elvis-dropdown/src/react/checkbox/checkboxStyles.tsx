import { getColor } from '@elvia/elvis-colors';
import styled, { css } from 'styled-components';
import { CheckboxProps } from './checkbox';

const checkMarkLeaveDuration = '100ms';
const checkMarkEnterDuration = '180ms';

export const IndeterminateLine = styled.div`
  height: 2px;
  position: absolute;
  width: 70%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  &:after {
    content: '';
    display: block;
    height: 100%;
    width: 100%;
    background-color: ${getColor('elvia-off')};
    transition: transform ${checkMarkLeaveDuration};
    transform: scaleX(0);
  }
`;

export const StyledCheckbox = styled.div<CheckboxProps>`
  flex: none;
  aspect-ratio: 1 / 1;
  width: 24px;
  background-color: white;
  border-radius: 3px;
  border: 1px solid ${getColor('elvia-off')};
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 54%;
    left: 20%;
    height: 2px;
    width: 30%;
    background-color: ${getColor('elvia-off')};
    transform: rotate(45deg) scaleX(0);
    transform-origin: left center;
    transition: transform ${checkMarkLeaveDuration} ease ${checkMarkLeaveDuration};
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 14%;
    left: 38%;
    height: 2px;
    width: 74%;
    background-color: ${getColor('elvia-off')};
    transform: rotate(-55deg) scaleX(0);
    transform-origin: left center;
    transition: transform ${checkMarkLeaveDuration} ease;
  }

  ${(props) =>
    props.isIndeterminate &&
    css`
      background-color: ${getColor('elvia-charge')};

      ${IndeterminateLine}::after {
        transform: scaleX(1);
        transition: transform ${checkMarkEnterDuration} ease ${checkMarkEnterDuration};
      }
    `};

  ${(props) =>
    props.isChecked &&
    css`
      background-color: ${getColor('elvia-charge')};

      &::before {
        transform: rotate(45deg) scaleX(1);
        transition: transform ${checkMarkEnterDuration} ease;
      }

      &::after {
        transform: rotate(-55deg) scaleX(1);
        transition: transform ${checkMarkEnterDuration} ease ${checkMarkEnterDuration};
      }
    `};

  ${(props) =>
    props.isCompact &&
    css`
      width: 16px;

      &::before,
      &::after,
      ${IndeterminateLine} {
        height: 1px;
      }
    `};

  ${(props) =>
    props.isFocused &&
    !props.isDisabled &&
    css`
      background-color: ${getColor('elvia-charge')};
    `};
`;
