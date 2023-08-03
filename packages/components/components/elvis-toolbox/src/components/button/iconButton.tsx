import { getThemeColor } from '@elvia/elvis-colors';
import styled, { css } from 'styled-components';
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

  &:disabled {
    cursor: default;
  }

  &:not(:disabled) {
    cursor: pointer;

    &:hover {
      background-color: ${getThemeColor('background-hover-1')};
      border-color: ${getThemeColor('border-hover-1')};
    }

    &:active {
      border-color: transparent;
      background-clip: padding-box;
    }
  }
`;
