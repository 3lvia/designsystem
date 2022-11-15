import { getColor } from '@elvia/elvis-colors';
import { IconButton } from '@elvia/elvis-toolbox';
import { getTypographyCss } from '@elvia/elvis-typography';
import styled, { css } from 'styled-components';
import { StyledCheckbox } from '../checkbox/checkboxStyles';

export const TooltipContainer = styled.div<{ noRightContent: boolean }>`
  overflow: hidden;
  flex: 1;

  ${(props) =>
    props.noRightContent &&
    css`
      padding-right: 40px;
      min-width: 170px;
      max-width: 300px;
    `};
`;

export const TooltipTextContainer = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  // Workaround to prevent Safari to show title for overflowing text
  &::after {
    content: '';
    display: block;
  }
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

  ${({ isDisabled }) => {
    if (isDisabled) {
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

  ${({ isActive, isMulti }) =>
    isActive &&
    !isMulti &&
    css`
      background-color: ${getColor('grey-10')};
    `};

  ${({ isCompact }) => {
    if (isCompact) {
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

  ${({ isFocused, isActive, isMulti }) =>
    isFocused &&
    (!isActive || isMulti) &&
    css`
      background-color: ${getColor('grey-05')};
    `};
`;

export const OpenOverlayButton = styled(IconButton)`
  &:disabled {
    pointer-events: none;
  }
`;
