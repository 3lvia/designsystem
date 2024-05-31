import { FormFieldInput } from '@elvia/elvis-toolbox';
import styled from '@emotion/styled';

export const Input = styled(FormFieldInput, {
  target: `${FormFieldInput}`.replace(/\./g, ''),
})`
  width: 5.4rem;
`;
