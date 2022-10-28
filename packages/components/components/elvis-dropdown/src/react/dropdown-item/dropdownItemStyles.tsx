import { getColor } from '@elvia/elvis-colors';
import { getTypographyCss } from '@elvia/elvis-typography';
import styled, { css } from 'styled-components';

interface DropdownItemProps {
  isActive?: boolean;
  isCompact?: boolean;
  isMulti?: boolean;
}

export const Checkbox = styled.div`
  flex: none;
  aspect-ratio: 1 / 1;
  height: 24px;
  background-color: white;
  border-radius: 3px;
  border: 1px solid ${getColor('elvia-off')};
  position: relative;

  &:before {
    content: '';
    position: absolute;
    top: 50%;
    left: 22%;
    height: 2px;
    width: 30%;
    background-color: ${getColor('elvia-off')};
    transform: rotate(45deg) scaleX(0);
    transform-origin: left bottom;
    transition: transform 150ms ease 150ms;
  }

  &:after {
    content: '';
    position: absolute;
    bottom: 20%;
    left: 48%;
    height: 2px;
    width: 74%;
    background-color: ${getColor('elvia-off')};
    transform: rotate(-55deg) scaleX(0);
    transform-origin: left bottom;
    transition: transform 150ms ease;
  }
`;

export const DropdownItemStyles = styled.button.attrs(() => ({
  role: 'option',
  tabindex: -1,
}))<DropdownItemProps>`
  ${getTypographyCss('text-md')};
  display: flex;
  padding: 10px 16px;
  gap: 16px;
  border: none;
  margin: 0;
  width: 100%;
  background-color: ${getColor('elvia-on')};

  &:not(:disabled) {
    cursor: pointer;

    &:hover {
      background-color: ${getColor('grey-05')};

      ${Checkbox} {
        background-color: ${getColor('elvia-charge')};
      }
    }
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
`;
