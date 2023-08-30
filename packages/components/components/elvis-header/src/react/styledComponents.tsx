import styled, { css } from 'styled-components';

import { getThemeColor } from '@elvia/elvis-colors';
import { getTypographyCss } from '@elvia/elvis-typography';
import { TertiaryButton, device } from '@elvia/elvis-toolbox';

export const toolbarHeight = '64px';
export const headerZIndex = 109;
export const sidebarMaxWidth = '280px';
export const sidebarAnimation = '400ms cubic-bezier(0.71, 0, 0.31, 1)';

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
  color: ${getThemeColor('text-1')};
  flex: 1;
  transition: opacity 400ms;

  ${({ isInvisible }) =>
    isInvisible &&
    css`
      opacity: 0;
    `};
`;

export const StyledHeader = styled.header<{ menuIsOpen: boolean }>`
  background-color: ${getThemeColor('background-element-6')};
  height: ${toolbarHeight};
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: ${headerZIndex};

  @media ${device.gtMobile} {
    border-bottom: 1px solid ${getThemeColor('border-5')};

    ${LogoContainer} {
      width: unset;
      padding: 19px 16px 19px 19px;
    }

    ${PageTitle} {
      margin: 0 auto 0 0;
    }
  }

  ${({ menuIsOpen }) =>
    menuIsOpen &&
    css`
      z-index: 999999;
    `};
`;

export const TriggerButton = styled(TertiaryButton)<{ isActive: boolean }>`
  position: relative;
  height: calc(100% - 8px); // Shows the full keyboard-focus outline without clipping
  font-weight: 400;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: calc(100% + 2px); // To revert the height-hack
    height: 2px;
    background-color: ${getThemeColor('background-selected-1')};
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
  color: ${getThemeColor('text-1')};
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
}

export const Hr = styled.hr<Partial<HrProps>>`
  border: 0 solid ${getThemeColor('border-2')};

  ${({ direction }) => {
    if (direction === 'vertical') {
      return css`
        height: 100%;
        border-right-width: 1px;
        margin: 0 24px;
        height: 20px;

        @media ${device.gtTablet} {
          margin: 0 32px;
        }
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
  isExpanded: boolean;
}

export const AppContent = styled.main<AppContentProps>`
  padding-top: ${toolbarHeight};
  transition: padding-left ${sidebarAnimation};
  transition-duration: 400ms;

  ${({ sidenavPadding, isExpanded }) => {
    if (sidenavPadding) {
      return css`
        padding-bottom: ${toolbarHeight};

        @media ${device.gtMobile} {
          padding-left: ${isExpanded ? sidebarMaxWidth : toolbarHeight};
          padding-bottom: 0;
        }
      `;
    }
    return css``;
  }}
`;

export const ShowIfLightTheme = styled.div`
  display: contents;
  .e-color-background-3 &&,
  .e-theme-dark && {
    display: none;
  }
`;
export const ShowIfDarkTheme = styled.div`
  display: none;
  .e-color-background-3 &&,
  .e-theme-dark && {
    display: contents;
  }
`;
