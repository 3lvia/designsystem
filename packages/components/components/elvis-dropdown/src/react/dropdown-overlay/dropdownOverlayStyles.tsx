import { getThemeColor } from '@elvia/elvis-colors';
import { FormFieldSizes, IconButton, TertiaryButton } from '@elvia/elvis-toolbox';
import { getTypographyCss } from '@elvia/elvis-typography';
import styled, { css, keyframes } from 'styled-components';
import { DropdownItemStyles } from '../dropdown-item/dropdownItemStyles';

export const CursorCurve = styled.div`
  position: absolute;
  top: calc(var(--item-height) - 1px);
  right: 100%;
  width: 30%;
  height: 20%;
  min-height: var(--item-height);
  clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 80% 50%, 50% 20%);
`;

export const DropdownPopupContainer = styled.div<{ size: FormFieldSizes }>`
  position: relative;
  --item-height: 48px;

  ${({ size }) =>
    size === 'small' &&
    css`
      --item-height: 40px;

      ${NoItemsMessage} {
        ${getTypographyCss('text-sm')};
      }

      ${BackButtonStyles} {
        ${getTypographyCss('text-sm-strong')}
      }
    `};
`;

export const DropdownPopup = styled.div.attrs({ role: 'listbox' })<{ isInvisible: boolean }>`
  background-color: ${getThemeColor('background-overlay-1')};
  box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.08);
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  width: 100%;

  ${({ isInvisible }) =>
    isInvisible &&
    css`
      visibility: hidden;
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

export const Divider = styled.hr`
  height: 0px;
  border: 0px solid ${getThemeColor('border-2')};
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

  ${({ isLoading }) =>
    isLoading &&
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
      background-color: ${getThemeColor('background-hover-1')};
    }
  }
`;
