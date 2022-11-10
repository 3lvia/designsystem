import { getColor } from '@elvia/elvis-colors';
import { IconButton } from '@elvia/elvis-toolbox';
import { getTypographyCss } from '@elvia/elvis-typography';
import styled, { css } from 'styled-components';
import { StyledCheckbox } from '../checkbox/checkboxStyles';

export const TooltipContainer = styled.div<{ paddingRight: number }>`
  overflow: hidden;
  flex: 1;
  padding-right: ${(props) => `${props.paddingRight}px`};
`;

export const TooltipTextContainer = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const DropdownItemValue = styled.span`
  text-align: left;
`;

export const IconContainer = styled.div`
  width: 60px;
  display: grid;
  place-items: center;

  ${IconButton} {
    cursor: inherit;
  }
`;

export const DropdownItemStyles = styled.div.attrs(() => ({
  role: 'option',
}))<{
  isActive?: boolean;
  isFocused?: boolean;
  isDisabled?: boolean;
  isCompact?: boolean;
  isMulti?: boolean;
  isInvisible?: boolean;
}>`
  display: flex;
  gap: 16px;
  border: none;
  margin: 0;
  width: 100%;
  color: ${getColor('elvia-off')};
  padding: 0 0 0 16px;
  align-items: center;
  cursor: pointer;

  ${(props) => {
    if (props.isDisabled) {
      return css`
        cursor: not-allowed;
        color: ${getColor('disabled')};
      `;
    }
    return css`
      &:hover {
        background-color: ${getColor('grey-05')};

        ${StyledCheckbox} {
          background-color: ${getColor('elvia-charge')};
        }
      }
    `;
  }}

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
`;
