import { getColor } from '@elvia/elvis-colors';
import { getTypographyCss } from '@elvia/elvis-typography';
import styled, { css } from 'styled-components';

export const DropdownItemValue = styled.span<{ paddingRight: number }>`
  flex: 1;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-right: ${(props) => `${props.paddingRight}px`};
`;

export const IconContainer = styled.div`
  width: 60px;
  display: grid;
  place-items: center;
`;

export const DropdownItemStyles = styled.div.attrs(() => ({
  role: 'option',
}))<{
  isActive?: boolean;
  isFocused?: boolean;
  isDisabled?: boolean;
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
  color: ${getColor('elvia-off')};
  padding: 0 0 0 16px;
  align-items: center;
  cursor: pointer;

  ${(props) =>
    props.isDisabled &&
    css`
      cursor: not-allowed;
      color: ${getColor('disabled')};
    `};

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

        ${IconContainer} {
          width: 40px;
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
    `};

  ${(props) =>
    props.isHidden &&
    css`
      display: none;
    `};
`;
