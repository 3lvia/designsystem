import { getColor } from '@elvia/elvis-colors';
import { FormFieldInput } from '@elvia/elvis-toolbox';
import { getTypographyCss } from '@elvia/elvis-typography';
import styled, { css } from 'styled-components';

export const Input = styled(FormFieldInput)`
  flex: 1;
`;

interface ReadonlyInputProps {
  isCompact: boolean;
}

export const ReadonlyInput = styled.div<ReadonlyInputProps>`
  ${getTypographyCss('text-md')}
  cursor: inherit;
  flex: 1;

  &:disabled {
    color: ${getColor('disabled')};
  }

  ${(props) =>
    props.isCompact &&
    css`
      font-size: 0.875rem;
    `}
`;
