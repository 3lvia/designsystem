import { getThemeColor, getShadow } from '@elvia/elvis-colors';
import styled from 'styled-components';

export const AutocompletePopup = styled.div.attrs({ role: 'listbox' })`
  background-color: ${getThemeColor('background-overlay-1')};
  box-shadow: ${getShadow('medium')};
  border-radius: 4px;
  overflow: hidden;
`;
