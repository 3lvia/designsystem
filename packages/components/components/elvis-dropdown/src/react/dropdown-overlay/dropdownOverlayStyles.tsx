import { getColor } from '@elvia/elvis-colors';
import { TertiaryButton } from '@elvia/elvis-toolbox';
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

export const CursorCurve = styled.div`
  position: absolute;
  top: 45px;
  right: 100%;
  width: 30%;
  height: 20%;
  min-height: 40px;
  clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 80% 50%, 50% 20%);
`;

export const DropdownPopupContainer = styled.div`
  position: absolute;
  z-index: 99999;
`;

export const DropdownPopup = styled.div.attrs(() => ({
  role: 'listbox',
}))<{ fadeOut: boolean; isCompact: boolean; isInvisible: boolean }>`
  position: absolute;
  box-shadow: 0 0 40px rgba(0, 0, 0, 0.06);
  animation: ${fadeIn} 300ms ease;
  border-radius: 4px;
  overflow: hidden;
  width: 100%;

  ${(props) =>
    props.isCompact &&
    css`
      ${ItemList} {
        max-height: calc(40px * 5 + 40px / 2);
      }

      ${LoadMoreButtonStyles} {
        height: 40px;
      }

      ${NoItemsMessage} {
        ${getTypographyCss('text-sm')};
      }

      ${CursorCurve} {
        top: 39px;
      }
    `}

  ${(props) => {
    if (props.fadeOut) {
      return css`
        animation: ${fadeOut} 100ms ease;
      `;
    }
    return '';
  }};

  ${(props) =>
    props.isInvisible &&
    css`
      visibility: hidden;
    `};
`;

export const ItemList = styled.div`
  max-height: calc(48px * 5 + 48px / 2);
  overflow-y: auto;
`;

export const NoItemsMessage = styled.div`
  ${getTypographyCss('text-md')}
  text-align: center;
  padding: 40px 16px;
`;

export const Backdrop = styled.div`
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  position: fixed;
`;

export const Divider = styled.hr`
  height: 0px;
  border: 0px solid ${getColor('grey-10')};
  border-bottom-width: 1px;
  margin: 0;
`;

export const RotateAnimation = keyframes`
  from { transform: rotate(0deg) }
  to { transform: rotate(-360deg)}
`;

export const SpinContainer = styled.div``;

export const LoadMoreButtonStyles = styled.div<{ isLoading?: boolean }>`
  height: 48px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background: ${getColor('elvia-on')};

  ${TertiaryButton} {
    cursor: inherit;
    pointer-events: none;
  }

  ${(props) =>
    props.isLoading &&
    css`
      cursor: progress;

      ${SpinContainer} {
        animation: ${RotateAnimation} 1s linear infinite;
      }
    `};
`;
