import styled, { css } from 'styled-components';
import { FormFieldSizes } from '@elvia/elvis-toolbox';
import { Side } from '../elvia-slider.types';
import { getThemeColor } from '@elvia/elvis-colors';
import { getTypographyCss } from '@elvia/elvis-typography';

type Props = {
  $hasErrorPlaceholder: boolean;
  $size: FormFieldSizes;
  $isDisabled: boolean;
  $side: Side;
};

export const Hint = styled.p<Props>`
  ${getTypographyCss('text-sm')}
  align-items: center;
  color: ${getThemeColor('color-text-placeholder-1')};
  display: inline-flex;
  height: ${({ $size }) => ($size === 'small' ? '32px' : '48px')};
  justify-content: ${({ $side }) => ($side === 'left' ? 'start' : 'end')};
  margin: 0;
  margin-bottom: ${({ $hasErrorPlaceholder }) => ($hasErrorPlaceholder ? '1.5rem' : '0')};
  width: 100%;

  ${({ $isDisabled }) =>
    $isDisabled &&
    css`
      color: ${getThemeColor('color-text-disabled-1')};
      user-select: none;
    `}
`;
