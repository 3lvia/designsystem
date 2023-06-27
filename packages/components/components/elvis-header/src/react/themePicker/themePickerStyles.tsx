import { getTypographyCss } from '@elvia/elvis-typography';
import styled, { css } from 'styled-components';

export const ThemeContainer = styled.fieldset`
  margin-bottom: 32px;
  margin-top: 32px;
`;

export const ThemeLabel = styled.legend`
  ${getTypographyCss('text-sm-strong')};
  margin-bottom: 8px;
`;

export const ThemeListContainer = styled.div`
  display: flex;
  gap: 16px;
  justify-content: space-between;
`;

export const ThemeButton = styled.button<{ isActive: boolean }>`
  padding: 0;
  margin: 0;
  background: transparent;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  ${({ isActive }) =>
    isActive &&
    css`
      outline: 2px solid black;
      outline-offset: 2px;
    `}
`;
