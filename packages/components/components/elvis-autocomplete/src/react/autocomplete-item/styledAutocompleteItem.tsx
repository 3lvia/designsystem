import { getThemeColor } from '@elvia/elvis-colors';
import { FormFieldSizes } from '@elvia/elvis-toolbox';
import { getTypographyCss } from '@elvia/elvis-typography';
import styled, { css } from 'styled-components';

export const AutocompleteItemStyles = styled.div<{ $isFocused: boolean; $size: FormFieldSizes }>`
  color: ${getThemeColor('text-1')};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-height: ${({ $size }) => ($size === 'small' ? `40px` : '48px')};
  padding: ${({ $size }) => ($size === 'small' ? `9px 16px` : '10px 16px')};
  margin: 0;
  cursor: pointer;
  user-select: none;

  &:active {
    background-color: ${getThemeColor('background-selected-2')};
  }

  ${({ $isFocused }) =>
    $isFocused &&
    css`
      background-color: ${getThemeColor('background-hover-2')};
    `}

  ${({ $size }) => getTypographyCss($size === 'small' ? 'text-sm' : 'text-md')};
`;
