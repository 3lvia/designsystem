import { getColor } from '@elvia/elvis-colors';
import { getTypographyCss } from '@elvia/elvis-typography';
import styled, { css } from 'styled-components';

const checkMarkLeaveDuration = '100ms';
const checkMarkEnterDuration = '180ms';

export const Checkbox = styled.div`
  flex: none;
  aspect-ratio: 1 / 1;
  width: 24px;
  background-color: white;
  border-radius: 3px;
  border: 1px solid ${getColor('elvia-off')};
  position: relative;

  &:before {
    content: '';
    position: absolute;
    top: 54%;
    left: 20%;
    height: 2px;
    width: 30%;
    background-color: ${getColor('elvia-off')};
    transform: rotate(45deg) scaleX(0);
    transform-origin: left center;
    transition: all ${checkMarkLeaveDuration} ease ${checkMarkLeaveDuration};
  }

  &:after {
    content: '';
    position: absolute;
    bottom: 14%;
    left: 38%;
    height: 2px;
    width: 74%;
    background-color: ${getColor('elvia-off')};
    transform: rotate(-55deg) scaleX(0);
    transform-origin: left center;
    transition: all ${checkMarkLeaveDuration} ease;
  }
`;

export const DropdownItemStyles = styled.button.attrs(() => ({
  role: 'option',
  tabindex: -1,
}))<{
  isActive?: boolean;
  isFocused?: boolean;
  isCompact?: boolean;
  isMulti?: boolean;
  isHidden?: boolean;
  isPartiallyChecked?: boolean;
  hasSubItems?: boolean;
}>`
  display: flex;
  gap: 16px;
  border: none;
  margin: 0;
  width: 100%;
  background-color: ${getColor('elvia-on')};
  color: ${getColor('elvia-off')};
  padding: ${(props) => (props.hasSubItems ? '0 0 0 16px' : '0 16px')};
  align-items: center;
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
    color: ${getColor('disabled')};

    ${Checkbox} {
      background-color: ${getColor('grey-05')};
      border-color: ${getColor('grey-30')};
    }
  }

  ${(props) =>
    props.isPartiallyChecked &&
    css`
      ${Checkbox} {
        background-color: ${getColor('elvia-charge')};

        &:before {
          transform: rotate(0) scaleX(0);
        }

        &:after {
          bottom: 44%;
          left: 16%;
          transform: rotate(0) scaleX(0.9);
        }
      }
    `};

  ${(props) => {
    if (props.isActive) {
      if (props.isMulti) {
        return css`
          ${Checkbox} {
            background-color: ${getColor('elvia-charge')};

            &::before {
              transform: rotate(45deg) scaleX(1);
              transition: all ${checkMarkEnterDuration} ease;
            }

            &::after {
              transform: rotate(-55deg) scaleX(1);
              transition: all ${checkMarkEnterDuration} ease ${checkMarkEnterDuration};
            }
          }
        `;
      } else {
        return css`
          background-color: ${getColor('grey-10')};
        `;
      }
    }

    return '';
  }};

  ${(props) => {
    if (props.isCompact) {
      return css`
        ${getTypographyCss('text-sm')};
        height: 40px;

        ${Checkbox} {
          width: 16px;

          &::before,
          &::after {
            height: 1px;
          }
        }
      `;
    }

    return css`
      ${getTypographyCss('text-md')};
      height: 48px;
    `;
  }};

  ${(props) =>
    props.isFocused &&
    (!props.isActive || props.isMulti) &&
    css`
      background-color: ${getColor('grey-05')};

      ${Checkbox} {
        background-color: ${getColor('elvia-charge')};
      }
    `};

  ${(props) =>
    props.isHidden &&
    css`
      display: none;
    `};
`;

export const IconContainer = styled.div`
  height: 100%;
  padding: 0 10px;
  display: grid;
  place-items: center;
  margin-left: auto;
`;
