import { getColor } from '@elvia/elvis-colors';
import styled, { css } from 'styled-components';
import { ButtonProps, Size } from './button';

const getSize = (size: Size) => {
  if (size === 'sm') {
    return css`
      width: 2rem;
      height: 2rem;
    `;
  } else if (size === 'md') {
    return css`
      width: 2.5rem;
      height: 2.5rem;
    `;
  } else {
    return css`
      width: 3rem;
      height: 3rem;
    `;
  }
};

export const IconButton = styled.button.attrs(() => ({ type: 'button' }))<Partial<ButtonProps>>`
  display: flex;
  align-items: center;
  justify-content: center;
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
