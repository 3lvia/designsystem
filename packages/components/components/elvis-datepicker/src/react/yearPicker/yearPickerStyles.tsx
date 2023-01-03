import { getColor } from '@elvia/elvis-colors';
import { getTypographyCss } from '@elvia/elvis-typography';
import styled, { css } from 'styled-components';

export const buttonHeight = 48;

export const YearPickerContainer = styled.div`
  background-color: ${getColor('elvia-on')};
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
  background-color: ${getColor('elvia-on')};
  border: none;
  width: 100%;

  &:hover:not(:disabled) {
    background-color: ${getColor('grey-05')};
  }

  &:disabled {
    cursor: default;
    color: ${getColor('disabled')};
  }

  ${(props) =>
    props.isFocused &&
    css`
      background-color: ${getColor('grey-05')};
    `};

  ${(props) =>
    props.isActive &&
    css`
      background-color: ${getColor('grey-10')};
    `};
`;
