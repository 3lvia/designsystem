import { FormFieldSizes } from '@elvia/elvis-toolbox';
import { getTypographyCss } from '@elvia/elvis-typography';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const BoundaryWidthMeasurement = styled.span<{ $size: FormFieldSizes }>`
  ${getTypographyCss('text-md')}
  height: 0;
  margin: 0;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: pre;

  ${({ $size }) =>
    $size === 'small' &&
    css`
      font-size: 0.875rem;
    `}
`;
