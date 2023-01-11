import styled, { css } from 'styled-components';

import { FormFieldInput } from '@elvia/elvis-toolbox';

export const Input = styled(FormFieldInput)<{ isFullWidth: boolean }>`
  width: 2.875rem;

  ${({ isFullWidth }) =>
    isFullWidth &&
    css`
      width: 100%;
    `}
`;
