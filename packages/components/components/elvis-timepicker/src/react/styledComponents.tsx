import { FormFieldInput } from '@elvia/elvis-toolbox';
import styled, { css } from 'styled-components';

export const Input = styled(FormFieldInput)<{ isFullWidth: boolean; hasSecondPicker: boolean }>`
  width: ${({ hasSecondPicker }) => (hasSecondPicker ? '4.5rem' : '2.875rem')};

  ${({ isFullWidth }) =>
    isFullWidth &&
    css`
      width: 100%;
    `}
`;
