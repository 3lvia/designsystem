import styled, { css } from 'styled-components';
import { FormFieldContainer, FormFieldInputContainer } from '@elvia/elvis-toolbox';

export const DropdownContainer = styled(FormFieldContainer)`
  width: 100%;

  ${({ isFullWidth }) =>
    !isFullWidth &&
    css`
      max-width: 448px;
    `}

  ${({ isCompact, isActive }) =>
    isCompact &&
    css`
      ${DropdownInputContainer} {
        padding-right: ${isActive ? '7px' : '8px'};

        &:focus-within {
          padding-right: 7px;
        }
      }
    `};

  ${({ isDisabled }) =>
    !isDisabled &&
    css`
      ${DropdownInputContainer} {
        cursor: pointer;
      }
    `};
`;

export const DropdownInputContainer = styled(FormFieldInputContainer)`
  width: 100%;
  padding-right: 16px;

  &:focus-within {
    padding-right: 15px;
  }
`;

export const OverlayPositioner = styled.div`
  position: absolute;
  z-index: 99999;
`;

export const IconRotator = styled.div<{ isRotated: boolean }>`
  transform: rotate(0deg);
  transition: transform 150ms ease;

  ${(props) =>
    props.isRotated &&
    css`
      transform: rotate(180deg);
    `}
`;
