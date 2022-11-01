import { getColor } from '@elvia/elvis-colors';
import { getTypographyCss } from '@elvia/elvis-typography';
import styled, { css, keyframes } from 'styled-components';

const fadeIn = keyframes`
  0% {
    opacity: 0.3;
  }
  
  100% {
    opacity: 1;
  }
  `;

const fadeOut = keyframes`
  0% {
    opacity: 1;
  }
  
  100% {
    transform: scale(0.9);
    opacity: 0.0;
  }
`;

export const DropdownPopup = styled.div.attrs(() => ({
  role: 'listbox',
}))<{ fadeOut: boolean }>`
  position: absolute;
  background-color: ${getColor('elvia-on')};
  box-shadow: 0 0 40px rgba(0, 0, 0, 0.06);
  animation: ${fadeIn} 300ms ease;
  z-index: 99999;

  ${(props) => {
    if (props.fadeOut) {
      return css`
        animation: ${fadeOut} 200ms ease;
      `;
    }
    return '';
  }};
`;

export const ItemList = styled.div<{ isCompact?: boolean }>`
  max-height: ${(props) => (props.isCompact ? 'calc(40px * 5 + 40px / 2)' : 'calc(48px * 5 + 48px / 2)')};
  overflow-y: overlay; // TODO: Replace
`;

export const NoItemsMessage = styled.div<{ isCompact?: boolean }>`
  text-align: center;
  padding: 40px 16px;

  ${(props) => {
    if (props.isCompact) {
      return getTypographyCss('text-sm');
    }
    return getTypographyCss('text-md');
  }}
`;

export const Backdrop = styled.div`
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  position: fixed;
`;
