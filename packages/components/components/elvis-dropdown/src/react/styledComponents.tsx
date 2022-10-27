import styled, { css } from 'styled-components';
import { FormFieldContainer } from '@elvia/elvis-toolbox';
import { FormFieldInputContainer } from '@elvia/elvis-toolbox';

export const DropdownContainer = styled(FormFieldContainer)`
  max-width: 448px;
  width: 100%;
`;

export const DropdownInputContainer = styled(FormFieldInputContainer)`
  width: 100%;
`;

export const OverlayPositioner = styled.div`
  position: absolute;
`;

export const Backdrop = styled.div`
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  position: fixed;
`;

export const IconRotator = styled.div<{ isRotated: boolean }>`
  transform: rotate(0deg);
  transition: transform 200ms ease;

  ${(props) =>
    props.isRotated &&
    css`
      transform: rotate(180deg);
    `}
`;
