import { FormFieldInput } from '@elvia/elvis-toolbox';
import styled from 'styled-components';

export const Input = styled(FormFieldInput)`
  flex: 1;
  text-overflow: ellipsis;

  ::-moz-selection {
    /* Code for Firefox */
    background: transparent;
  }

  ::selection {
    background: transparent;
  }
`;
