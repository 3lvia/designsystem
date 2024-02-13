import styled, { css } from 'styled-components';
import { FormFieldContainer, FormFieldInputContainer, FormFieldSizes } from '@elvia/elvis-toolbox';

export const DropdownContainer = styled(FormFieldContainer)`
  width: 100%;

  ${({ isFullWidth }) =>
    !isFullWidth &&
    css`
      max-width: 448px;
    `}

  ${({ isDisabled }) =>
    !isDisabled &&
    css`
      ${DropdownInputContainer} {
        cursor: pointer;
      }
    `};

  ${({ size }) =>
    size === 'small' &&
    css`
      ${IconRotator} {
        width: 32px;
        height: 32px;
      }
    `};
`;

export const DropdownInputContainer = styled(FormFieldInputContainer)`
  width: 100%;
`;

export const OverlayPositioner = styled.div`
  position: absolute;
  z-index: 99999;
`;

export const IconRotator = styled.div<{ isRotated: boolean }>`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: none;
  transform: rotate(0deg);
  transition: transform 150ms ease;

  ${(props) =>
    props.isRotated &&
    css`
      transform: rotate(180deg);
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
