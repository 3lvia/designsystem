import { getColor } from '@elvia/elvis-colors';
import { getTypographyCss } from '@elvia/elvis-typography';
import styled from 'styled-components';

export const NoItemsMessage = styled.div<{ isCompact?: boolean }>`
  ${(props) => {
    if (props.isCompact) {
      return getTypographyCss('text-sm');
    }
    return getTypographyCss('text-md');
  }}
`;

export const DropdownContainerStyles = styled.div.attrs(() => ({
  role: 'listbox',
  tabindex: 0,
}))<{ isCompact?: boolean }>`
  max-height: ${(props) => (props.isCompact ? 'calc(40px * 5 + 40px / 2)' : 'calc(48px * 5 + 48px / 2)')};
  overflow-y: auto;
  background-color: ${getColor('elvia-on')};
  box-shadow: 0 0 40px rgba(0, 0, 0, 0.06);
`;
