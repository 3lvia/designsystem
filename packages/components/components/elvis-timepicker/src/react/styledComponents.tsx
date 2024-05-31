import { FormFieldInput } from '@elvia/elvis-toolbox';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const Input = styled(FormFieldInput, {
  target: `${FormFieldInput}`.replace(/\./g, ''),
})<{ isFullWidth: boolean; hasSecondPicker: boolean }>`
  width: ${({ hasSecondPicker }) => (hasSecondPicker ? '4.5rem' : '2.875rem')};

  ${({ isFullWidth }) =>
    isFullWidth &&
    css`
      width: 100%;
    `}
`;
