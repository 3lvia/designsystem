import { getThemeColor, getShadow } from '@elvia/elvis-colors';
import { getTypographyCss } from '@elvia/elvis-typography';
import styled, { css } from 'styled-components';

export const AppTitle = styled.h1`
  ${getTypographyCss('title-caps')}
  color: ${getThemeColor('text-1')};
  margin: 0;
  text-align: left;
`;

export const SpinContainer = styled.div<{ rotated: boolean }>`
  transition: transform 0.2s ease;

  ${({ rotated }) =>
    rotated &&
    css`
      transform: rotate(180deg);
    `};
`;

export const AppListContainer = styled.div`
  background-color: ${getThemeColor('background-overlay-3')};
  border-radius: 8px;
  max-height: 80vh;
  overflow: auto;
  padding: 40px;
  box-shadow: ${getShadow('medium')};
`;
