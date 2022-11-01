import styled, { css } from 'styled-components';
import { FormFieldContainer } from '@elvia/elvis-toolbox';
import { FormFieldInputContainer } from '@elvia/elvis-toolbox';

export const DropdownContainer = styled(FormFieldContainer)`
  max-width: 448px;
  width: 100%;
`;

export const DropdownInputContainer = styled(FormFieldInputContainer)<{ isCompact: boolean }>`
  width: 100%;
  padding-right: 16px;

  &:focus-within {
    padding-right: 15px;
  }

  ${(props) =>
    props.isCompact &&
    css`
      && {
        padding-right: 8px;

        &:focus-within {
          padding-right: 7px;
        }
      }
    `}

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
