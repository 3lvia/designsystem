import styled, { css } from 'styled-components';
import { FormFieldContainer, FormFieldInputContainer } from '@elvia/elvis-toolbox';

export const DropdownContainer = styled(FormFieldContainer)`
  width: 100%;

  ${(props) =>
    !props.fullWidth &&
    css`
      max-width: 448px;
    `}

  ${(props) =>
    props.isCompact &&
    css`
      ${DropdownInputContainer} {
        padding-right: 8px;

        &:focus-within {
          padding-right: 7px;
        }
      }
    `}
`;

export const DropdownInputContainer = styled(FormFieldInputContainer)`
  width: 100%;
  padding-right: 16px;

  &:focus-within {
    padding-right: 15px;
  }

  ${(props) =>
    !props.isDisabled &&
    css`
      cursor: pointer;
    `};
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
