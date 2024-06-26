import { getThemeColor } from '@elvia/elvis-colors';
import { FormFieldSizes, IconButton } from '@elvia/elvis-toolbox';
import { getTypographyCss } from '@elvia/elvis-typography';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { StyledCheckbox } from '../checkbox/checkboxStyles';

export const TooltipContainer = styled.div<{ noRightContent: boolean; isRootOverlay?: boolean }>`
  padding-right: 16px;
  overflow: hidden;
  flex: 1;

  ${({ noRightContent, isRootOverlay }) =>
    noRightContent &&
    !isRootOverlay &&
    css`
      padding-right: 40px;
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

const StyledIconButton = styled(IconButton, {
  target: `${IconButton}`.replace(/\./g, ''),
})``;

export const IconContainer = styled.div`
  width: 60px;
  display: grid;
  place-items: center;

  ${StyledIconButton} {
    cursor: inherit;
  }
`;

export const DropdownItemStyles = styled.div<{
  isActive?: boolean;
  isFocused?: boolean;
  isDisabled?: boolean;
  size?: FormFieldSizes;
  isMulti?: boolean;
  isInvisible?: boolean;
  isGtMobile?: boolean;
  isPlaceholderItem?: boolean;
}>`
  display: flex;
  gap: 8px;
  border: none;
  margin: 0;
  width: 100%;
  color: ${getThemeColor('text-1')};
  padding: 0 0 0 16px;
  align-items: center;
  cursor: pointer;
  height: var(--item-height);
  user-select: none;

  ${({ isActive, isMulti }) =>
    isActive &&
    !isMulti &&
    css`
      background-color: ${getThemeColor('background-selected-2')};
    `};

  ${({ isMulti, isGtMobile, isDisabled }) =>
    !isGtMobile &&
    !isMulti &&
    !isDisabled &&
    css`
      &:hover {
        ${OpenOverlayButton} {
          background-color: ${getThemeColor('background-hover-1')};
        }
      }
    `};

  ${({ size }) => {
    if (size === 'small') {
      return css`
        ${getTypographyCss('text-sm')};

        ${IconContainer} {
          width: 40px;
        }
      `;
    }

    return css`
      ${getTypographyCss('text-md')};
    `;
  }};

  ${({ isPlaceholderItem }) =>
    isPlaceholderItem &&
    css`
      color: ${getThemeColor('text-placeholder-1')};
    `}

  ${({ isDisabled }) => {
    if (isDisabled) {
      return css`
        cursor: not-allowed;
        color: ${getThemeColor('text-disabled-1')};
      `;
    }
    return css`
      &:hover {
        background-color: ${getThemeColor('background-hover-2')};

        ${StyledCheckbox} {
          background-color: ${getThemeColor('background-hover-1')};
          border-color: ${getThemeColor('border-1')};
        }
      }
    `;
  }}

  ${({ isFocused, isActive, isMulti }) =>
    isFocused &&
    (!isActive || isMulti) &&
    css`
      background-color: ${getThemeColor('background-hover-2')};
    `};
`;

export const OpenOverlayButton = styled(IconButton, {
  target: `${IconButton}`.replace(/\./g, ''),
})`
  &:disabled {
    pointer-events: none;
  }
`;
