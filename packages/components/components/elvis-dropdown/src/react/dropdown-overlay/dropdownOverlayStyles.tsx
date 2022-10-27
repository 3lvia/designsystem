import { getColor } from '@elvia/elvis-colors';
import styled from 'styled-components';

export const DropdownContainerStyles = styled.div.attrs(() => ({
  role: 'listbox',
  tabindex: 0,
}))`
  max-height: 500px;
  overflow-y: auto;
  background-color: ${getColor('elvia-on')};
  box-shadow: 0 0 40px rgba(0, 0, 0, 0.06);
  z-index: 99999;
`;
