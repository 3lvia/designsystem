import { FormFieldInput } from '@elvia/elvis-toolbox';
import styled, { css } from 'styled-components';

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
