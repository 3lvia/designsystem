import { getColor } from '@elvia/elvis-colors';
import { getTypographyCss } from '@elvia/elvis-typography';
import styled, { css } from 'styled-components';

export const IconContainer = styled.div`
  height: 100%;
  padding: 0 10px;
  display: grid;
  place-items: center;
  margin-left: auto;
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
  }

  ${(props) =>
    props.isActive &&
    !props.isMulti &&
    css`
      background-color: ${getColor('grey-10')};
    `};

  ${(props) => {
    if (props.isCompact) {
      return css`
        ${getTypographyCss('text-sm')};
        height: 40px;
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
    `};

  ${(props) =>
    props.isHidden &&
    css`
      display: none;
    `};
`;
