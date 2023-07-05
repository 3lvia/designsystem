import styled, { css } from 'styled-components';

import { FormFieldInput } from '@elvia/elvis-toolbox';

export const Input = styled(FormFieldInput)<{ isFullWidth: boolean; hasSecondPicker: boolean }>`
  width: ${({ hasSecondPicker }) => (hasSecondPicker ? '4.25rem' : '2.875rem')};

  ${({ isFullWidth }) =>
    isFullWidth &&
    css`
      width: 100%;
    `}
`;
