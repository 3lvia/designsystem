import styled from 'styled-components';
import { getShadow, getThemeColor } from '@elvia/elvis-colors';
import { getTypographyCss } from '@elvia/elvis-typography';

export const AutocompletePopup = styled.div.attrs({ role: 'listbox' })`
  background-color: ${getThemeColor('background-overlay-1')};
  box-shadow: ${getShadow('medium')};
  border-radius: 4px;
  overflow: hidden;
`;

export const AutocompletePopupItem = styled.div`
  ${getTypographyCss('text-md')};
  color: ${getThemeColor('text-1')};
  padding: 10px 16px;

  &:hover {
    background-color: ${getThemeColor('background-hover-2')};
  }
`;
