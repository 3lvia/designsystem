import styled, { css } from 'styled-components';

import { getThemeColor, getThemeColorContrast } from '@elvia/elvis-colors';

import { ButtonProps, Size } from './button';

const getSize = (size: Size) => {
  switch (size) {
    case 'small':
    case 'sm': {
      return css`
        width: 32px;
        height: 32px;
      `;
    }
    case 'medium':
    case 'md': {
      return css`
        width: 40px;
        height: 40px;
      `;
    }
    default: {
      return css`
        width: 48px;
        height: 48px;
      `;
    }
  }
};

export const IconButton = styled.button.attrs({ type: 'button' })<Partial<ButtonProps>>`
  flex: none;
  display: grid;
  place-items: center;
  ${({ size }) => getSize(size ?? 'md')};
  border: 1px solid transparent;
  background-color: ${({ isActive }) => (isActive ? getThemeColor('background-selected-1') : 'transparent')};
  border-radius: 99px;
  padding: 0;
  margin: 0;
  ${({ isActive }) =>
    isActive &&
    css`
      --e-color-icon-stroke-1: ${getThemeColorContrast('background-hover-1')};
      --e-color-icon-filled-background-1: ${getThemeColorContrast('background-hover-1')};
    `}

  &:disabled {
    cursor: not-allowed;
  }

  &:not(:disabled) {
    cursor: pointer;

    &:hover {
      background-color: ${getThemeColor('background-hover-1')};
      border-color: ${getThemeColor('border-hover-1')};
      --e-color-icon-stroke-1: ${getThemeColorContrast('background-hover-1')};
      --e-color-icon-filled-background-1: ${getThemeColorContrast('background-hover-1')};
    }

    &:active {
      border-color: transparent;
      background-clip: padding-box;
      --e-color-icon-stroke-1: ${getThemeColorContrast('background-hover-1')};
      --e-color-icon-filled-background-1: ${getThemeColorContrast('background-hover-1')};
    }
  }
`;
