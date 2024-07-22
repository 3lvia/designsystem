import { FormFieldSizes } from '@elvia/elvis-toolbox';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const IconRotator = styled.div<{ isRotated: boolean; size: FormFieldSizes }>`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: none;
  transform: rotate(0deg);
  transition: transform 150ms ease;

  ${({ isRotated }) =>
    isRotated &&
    css`
      transform: rotate(180deg);
    `}

  ${({ size }) =>
    size === 'small' &&
    css`
      width: 32px;
      height: 32px;
    `}
`;

export const DropdownIconContainer = styled.div<{ size?: FormFieldSizes }>`
  display: flex;

  & .e-dropdown__image {
    width: 32px;
    height: 32px;
    border-radius: 9999px;

    ${({ size }) =>
      size === 'small' &&
      css`
        width: 24px;
        height: 24px;
      `};
  }
`;
