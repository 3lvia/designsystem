import { FormFieldInput } from '@elvia/elvis-toolbox';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const Input = styled(FormFieldInput)<{ $isEditable: boolean }>`
  flex: 1;
  text-overflow: ellipsis;

  ${({ $isEditable }) =>
    !$isEditable &&
    css`
      ::-moz-selection {
        /* Code for Firefox */
        background: transparent;
      }

      ::selection {
        background: transparent;
      }
    `};
`;
