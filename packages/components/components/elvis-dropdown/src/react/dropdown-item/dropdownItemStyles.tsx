import { getColor } from '@elvia/elvis-colors';
import { getTypographyCss } from '@elvia/elvis-typography';
import styled, { css } from 'styled-components';

const checkMarkTempo = '50ms';

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
    left: 18%;
    height: 2px;
    width: 30%;
    background-color: ${getColor('elvia-off')};
    transform: rotate(45deg) scaleX(0);
    transform-origin: left bottom;
    transition: transform ${checkMarkTempo} ease ${checkMarkTempo};
  }

  &:after {
    content: '';
    position: absolute;
    bottom: 16%;
    left: 44%;
    height: 2px;
    width: 74%;
    background-color: ${getColor('elvia-off')};
    transform: rotate(-55deg) scaleX(0);
    transform-origin: left bottom;
    transition: transform ${checkMarkTempo} ease;
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
}>`
  display: flex;
  gap: 16px;
  border: none;
  margin: 0;
  width: 100%;
  background-color: ${getColor('elvia-on')};
  padding: 0 16px;
  align-items: center;

  &:not(:disabled) {
    cursor: pointer;
  }

  ${(props) => {
    if (props.isActive) {
      if (props.isMulti) {
        return css`
          ${Checkbox} {
            background-color: ${getColor('elvia-charge')};

            &::before {
              transform: rotate(45deg) scaleX(1);
              transition: transform 150ms ease;
            }

            &::after {
              transform: rotate(-55deg) scaleX(1);
              transition: transform 150ms ease 150ms;
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
