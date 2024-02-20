import { getThemeColor } from '@elvia/elvis-colors';
import { getTypographyCss } from '@elvia/elvis-typography';
import styled, { css } from 'styled-components';

export const buttonHeight = 48;

export const YearPickerContainer = styled.div`
  background-color: ${getThemeColor('background-overlay-1')};
  width: 100%;
`;

export const ScrollContainer = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
  height: 306px;
`;

interface YearButtonProps {
  isActive: boolean;
  isFocused: boolean;
}

export const YearButton = styled.button<YearButtonProps>`
  ${getTypographyCss('text-md')};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  height: ${buttonHeight}px;
  cursor: pointer;
  background-color: ${getThemeColor('background-overlay-1')};
  border: none;
  width: 100%;

  &:hover:not(:disabled) {
    background-color: ${getThemeColor('background-hover-2')};
  }

  &:disabled {
    cursor: default;
    color: ${getThemeColor('text-disabled-1')};
  }

  ${({ isFocused }) =>
    isFocused &&
    css`
      background-color: ${getThemeColor('background-hover-2')};
    `};

  ${({ isActive }) =>
    isActive &&
    css`
      background-color: ${getThemeColor('background-selected-2')};
    `};
`;
