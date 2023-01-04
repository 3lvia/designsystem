import { getThemeColor, getCustomThemeColor } from '@elvia/elvis-colors';
import { getTypographyCss } from '@elvia/elvis-typography';
import styled, { css } from 'styled-components';

export const buttonHeight = 48;

export const YearPickerContainer = styled.div`
  background-color: ${getThemeColor('color-background-overlay')};
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

export const YearButton = styled.button<Partial<YearButtonProps>>`
  ${getTypographyCss('text-md')};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  height: ${buttonHeight}px;
  cursor: pointer;
  background-color: ${getThemeColor('color-background-overlay')};
  border: none;
  width: 100%;
  color: ${getThemeColor('color-text-primary')};

  &:hover:not(:disabled) {
    background-color: ${getCustomThemeColor({ light: 'grey-05', dark: 'grey-50' })};
  }

  &:disabled {
    cursor: default;
    color: ${getThemeColor('color-state-disabled')};
  }

  ${(props) =>
    props.isFocused &&
    css`
      background-color: ${getCustomThemeColor({ light: 'grey-05', dark: 'grey-50' })};
    `};

  ${(props) =>
    props.isActive &&
    css`
      background-color: ${getCustomThemeColor({ light: 'grey-10', dark: 'grey-60' })};
    `};
`;
