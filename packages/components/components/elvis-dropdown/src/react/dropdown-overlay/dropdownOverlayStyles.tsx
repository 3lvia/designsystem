import { getColor } from '@elvia/elvis-colors';
import { IconButton, TertiaryButton } from '@elvia/elvis-toolbox';
import { getTypographyCss } from '@elvia/elvis-typography';
import styled, { css, keyframes } from 'styled-components';
import { DropdownItemStyles } from '../dropdown-item/dropdownItemStyles';

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
    opacity: 0;
  }
`;

export const CursorCurve = styled.div`
  position: absolute;
  top: calc(var(--item-height) - 1px);
  right: 100%;
  width: 30%;
  height: 20%;
  min-height: var(--item-height);
  clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 80% 50%, 50% 20%);
`;

export const DropdownPopupContainer = styled.div`
  position: absolute;
  z-index: 99999;
`;

export const DropdownPopup = styled.div.attrs(() => ({
  role: 'listbox',
}))<{
  fadeOut: boolean;
  isCompact: boolean;
  isInvisible: boolean;
  animate: boolean;
}>`
  --item-height: 48px;
  background-color: ${getColor('elvia-on')};
  box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.08);
  animation: ${fadeIn} 300ms ease;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  width: 100%;

  ${({ isCompact }) =>
    isCompact &&
    css`
      --item-height: 40px;

      ${NoItemsMessage} {
        ${getTypographyCss('text-sm')};
      }

      ${BackButtonStyles} {
        ${getTypographyCss('text-sm-strong')}
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

  ${({ isInvisible }) =>
    isInvisible &&
    css`
      visibility: hidden;
    `};

  ${({ animate }) =>
    !animate &&
    css`
      animation-duration: 0ms;
    `};
`;

export const ItemList = styled.div`
  max-height: calc(var(--item-height) * 7.5);
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
  z-index: 99999;
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
  height: var(--item-height);
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

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

export const BackButtonStyles = styled(DropdownItemStyles)`
  ${getTypographyCss('text-md-strong')}
  gap: 8px;

  ${IconButton} {
    pointer-events: none;
    cursor: inherit;
  }

  &:hover {
    ${IconButton} {
      background-color: ${getColor('elvia-charge')};
    }
  }
`;
