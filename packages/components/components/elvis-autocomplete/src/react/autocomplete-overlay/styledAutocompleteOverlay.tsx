import { getThemeColor, getShadow } from '@elvia/elvis-colors';
import { FormFieldSizes } from '@elvia/elvis-toolbox';
import { getTypographyCss } from '@elvia/elvis-typography';
import styled, { css } from 'styled-components';

export const AutocompletePopup = styled.div.attrs({ role: 'listbox' })`
  background-color: ${getThemeColor('background-overlay-1')};
  box-shadow: ${getShadow('medium')};
  border-radius: 4px;
  overflow: hidden;
`;

export const NoItemsMessage = styled.div<{ $size: FormFieldSizes }>`
  ${({ $size }) => css`
    ${getTypographyCss($size === 'small' ? 'text-sm' : 'text-md')};
  `}
  text-align: center;
  padding: 40px 16px;
`;
