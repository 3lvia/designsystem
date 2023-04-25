import styled, { css } from 'styled-components';

import { getColor } from '@elvia/elvis-colors';
import { getTypographyCss } from '@elvia/elvis-typography';
import { TertiaryButton } from '@elvia/elvis-toolbox';

export const toolbarHeight = '64px';
export const headerZIndex = 109;
export const sidebarMaxWidth = '280px';
export const sidebarAnimation = '400ms cubic-bezier(0.71, 0, 0.31, 1)';

export const StyledHeader = styled.header<{ isGtMobile: boolean; menuIsOpen: boolean }>`
  background-color: ${getColor('elvia-on')};
  height: ${toolbarHeight};
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: ${headerZIndex};

  ${({ isGtMobile }) =>
    isGtMobile &&
    css`
      border-bottom: 2px solid ${getColor('grey-05')};

      ${LogoContainer} {
        width: unset;
        padding: 19px 16px 19px 19px;
      }

      ${PageTitle} {
        margin: 0 auto 0 0;
        flex: 1;
      }
    `};

  ${({ menuIsOpen }) =>
    menuIsOpen &&
    css`
      z-index: 999999;
    `};
`;

export const SquareContainer = styled.div`
  width: 58px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LogoContainer = styled(SquareContainer)`
  padding: 19px 16px;
`;

export const PageTitle = styled.h1<{ isInvisible: boolean }>`
  ${getTypographyCss('text-md-strong')};
  margin: 0 auto;
  transition: opacity 150ms;

  ${({ isInvisible }) =>
    isInvisible &&
    css`
      opacity: 0;
    `};
`;

export const TriggerButton = styled(TertiaryButton)<{ isActive: boolean }>`
  position: relative;
  height: calc(100% - 8px); // Shows the full keyboard-focus outline without clipping
  font-weight: 400;
  margin-left: 16px;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: calc(100% + 2px); // To revert the height-hack
    height: 2px;
    background-color: ${getColor('green')};
    transform: scaleX(0);
    transition: transform 300ms ease-in-out;
    transform-origin: center left;
  }

  &:hover::after {
    transform: scaleX(1);
  }

  ${({ isActive }) =>
    isActive &&
    css`
      &::after {
        transform: scaleX(1);
      }
    `}
`;

export const ProfileButton = styled(TriggerButton)`
  margin-right: 24px;
  text-align: left;
`;

export const IconButton = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  height: 40px;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 26px;
  }
`;

export interface HrProps {
  direction: 'horizontal' | 'vertical';
  isGtTablet: boolean;
}

export const Hr = styled.hr<Partial<HrProps>>`
  border: 0 solid ${getColor('grey-10')};

  ${({ direction, isGtTablet }) => {
    if (direction === 'vertical') {
      return css`
        height: 100%;
        border-right-width: 1px;
        margin: 0 ${isGtTablet ? '32px' : '24px'};
        height: 20px;
      `;
    } else {
      return css`
        width: 100%;
        border-bottom-width: 1px;
        margin: 0;
      `;
    }
  }}
`;

interface AppContentProps {
  sidenavPadding: boolean;
  initialized: boolean;
  isExpanded: boolean;
  isGtMobile: boolean;
}

export const AppContent = styled.main<AppContentProps>`
  padding-top: ${toolbarHeight};
  transition: padding-left ${sidebarAnimation};
  transition-duration: ${({ initialized }) => (initialized ? '400ms' : '0ms')};

  ${({ isGtMobile, sidenavPadding, isExpanded }) => {
    if (isGtMobile && sidenavPadding) {
      return css`
        padding-left: ${isExpanded ? sidebarMaxWidth : toolbarHeight};
      `;
    } else if (!isGtMobile && sidenavPadding) {
      return css`
        padding-bottom: ${toolbarHeight};
      `;
    }
    return css``;
  }}
`;
