import { getThemeColor } from '@elvia/elvis-colors';
import { FormFieldSizes } from '@elvia/elvis-toolbox';
import { getTypographyCss } from '@elvia/elvis-typography';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const Label = styled.p<{ size: FormFieldSizes }>`
  align-items: center;
  display: flex;
  margin: 0 0 -2px;
  padding: 0;

  ${({ size }) => {
    return size === 'small'
      ? css`
          ${getTypographyCss('text-sm-strong')}
          color: ${getThemeColor('text-1')};
          text-align: left;
        `
      : css`
          height: 22px;
          ${getTypographyCss('text-md-strong')}
        `;
  }}
`;
