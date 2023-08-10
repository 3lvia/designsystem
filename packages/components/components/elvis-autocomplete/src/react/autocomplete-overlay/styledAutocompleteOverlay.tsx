import { getThemeColor, getShadow } from '@elvia/elvis-colors';
import { FormFieldSizes } from '@elvia/elvis-toolbox';
import { getTypographyCss } from '@elvia/elvis-typography';
import styled, { css } from 'styled-components';

export const AutocompletePopup = styled.div<{ $size: FormFieldSizes }>`
  background-color: ${getThemeColor('background-overlay-1')};
  border-radius: 4px;
  box-shadow: ${getShadow('medium')};
  max-height: ${({ $size }) => `calc(${$size === 'small' ? '40px' : '48px'} * 6.5)`};
  overflow-y: auto;
`;

export const NoItemsMessage = styled.div<{ $size: FormFieldSizes }>`
  ${({ $size }) => css`
    ${getTypographyCss($size === 'small' ? 'text-sm' : 'text-md')};
  `}
  padding: 40px 16px;
  text-align: center;
`;
