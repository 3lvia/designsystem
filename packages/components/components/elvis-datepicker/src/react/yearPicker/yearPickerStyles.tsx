import { getThemeColor } from '@elvia/elvis-colors';
import { getTypographyCss } from '@elvia/elvis-typography';
import styled, { css } from 'styled-components';

export const buttonHeight = 48;

export const YearPickerContainer = styled.div`
  background-color: ${getThemeColor('background-overlay')};
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
  background-color: ${getThemeColor('background-overlay')};
  border: none;
  width: 100%;

  &:hover:not(:disabled) {
    background-color: ${getThemeColor('state-hover-grey')};
  }

  &:disabled {
    cursor: default;
    color: ${getThemeColor('state-disabled')};
  }

  ${({ isFocused }) =>
    isFocused &&
    css`
      background-color: ${getThemeColor('state-hover-grey')};
    `};

  ${({ isActive }) =>
    isActive &&
    css`
      background-color: ${getThemeColor('state-selected-grey')};
    `};
`;
