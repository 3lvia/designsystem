import { getColor } from '@elvia/elvis-colors';
import styled, { css } from 'styled-components';
import { ButtonProps, Size } from './button';

const getSize = (size: Size) => {
  switch (size) {
    case 'sm': {
      return css`
        min-width: 32px;
        min-height: 32px;
      `;
    }
    case 'md': {
      return css`
        min-width: 40px;
        min-height: 40px;
      `;
    }
    default: {
      return css`
        min-width: 48px;
        min-height: 48px;
      `;
    }
  }
};

export const IconButton = styled.button.attrs(() => ({ type: 'button' }))<Partial<ButtonProps>>`
  display: grid;
  place-items: center;
  ${(props) => getSize(props.size ?? 'md')};
  border: 1px solid transparent;
  background-color: ${(props) => (props.isActive ? getColor('elvia-charge') : 'transparent')};
  border-radius: 99px;
  padding: 0;
  margin: 0;

  &:disabled {
    cursor: default;
  }

  &:not(:disabled) {
    cursor: pointer;

    &:hover {
      background-color: ${getColor('elvia-charge')};
      border-color: ${getColor('elvia-charge')};
    }

    &:active {
      border-color: transparent;
      background-clip: padding-box;
    }
  }
`;
