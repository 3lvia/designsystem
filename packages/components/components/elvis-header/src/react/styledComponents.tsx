import styled, { css, keyframes } from 'styled-components';

import { getColor } from '@elvia/elvis-colors';
import { getTypographyCss } from '@elvia/elvis-typography';

export const toolbarHeight = '64px';
export const headerZIndex = 109;
export const sidebarMaxWidth = '280px';
export const sidebarAnimation = '400ms cubic-bezier(0.71, 0, 0.31, 1)';

const fadeIn = keyframes`
  from { opacity: 0; }

  to { opacity: 1; }
`;

const fadeOut = keyframes`
  from { opacity: 1; }

  to { opacity: 0; }
`;

interface BackdropProps {
  transparent: boolean;
  fadeOut: boolean;
}

interface ResponsiveProps {
  isGtMobile: boolean;
}

export const Backdrop = styled.div<Partial<BackdropProps>>`
  background: ${(props) => (props.transparent ? 'transparent' : 'rgba(0, 0, 0, 0.5)')};
  position: fixed;
  top: ${toolbarHeight};
  bottom: 0;
  right: 0;
  left: 0;
  animation: ${fadeIn} 300ms;

  ${(props) =>
    props.fadeOut &&
    css`
      animation: ${fadeOut} 200ms ease;
    `}
`;

export const Header = styled.header<ResponsiveProps>`
  background-color: ${getColor('elvia-on')};
  height: ${toolbarHeight};
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: ${headerZIndex};

  ${(props) =>
    props.isGtMobile &&
    css`
      border-bottom: 2px solid ${getColor('grey-05')};
    `}
`;

export const SquareContainer = styled.div`
  width: 58px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LogoContainer = styled(SquareContainer)<ResponsiveProps>`
  ${(props) => {
    if (props.isGtMobile) {
      return css`
        width: unset;
        padding: 19px 16px 19px 19px;
      `;
    }

    return css`
      padding: 19px 16px;
    `;
  }}
`;

export const PageTitle = styled.h1<ResponsiveProps>`
  ${getTypographyCss('text-md')};

  ${(props) => {
    if (props.isGtMobile) {
      return css`
        margin: 0 auto 0 0;
      `;
    }

    return css`
      margin: 0 auto;
    `;
  }};
`;

export const TertiaryButton = styled.button`
  ${getTypographyCss('text-sm')}
  border: none;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  position: relative;

  &:not(:last-of-type) {
    margin-bottom: 16px;
  }

  &:after {
    content: '';
    display: block;
    position: absolute;
    top: calc(100% + 2px);
    left: 0;
    right: 0;
    height: 2px;
    background-color: transparent;
    transition: background-color 100ms;
  }

  &:hover:not([disabled]):after {
    background-color: ${getColor('green')};
  }
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
`;

export const AppTitle = styled.h1`
  ${getTypographyCss('title-caps')}
  margin: 0;
  text-align: left;
`;

export interface HrProps {
  direction: 'horizontal' | 'vertical';
  isGtTablet: boolean;
}

export const Hr = styled.hr<Partial<HrProps>>`
  border: 0px solid ${getColor('grey-10')};

  ${(props) => {
    if (props.direction === 'vertical') {
      return css`
        height: 100%;
        border-right-width: 1px;
        margin: 0 ${props.isGtTablet ? '32px' : '24px'};
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

interface AppContentProps extends ResponsiveProps {
  sidenavPadding: boolean;
  isExpanded: boolean;
}

export const AppContent = styled.main<AppContentProps>`
  padding-top: ${toolbarHeight};
  transition: padding-left ${sidebarAnimation};

  ${(props) => {
    if (props.isGtMobile && props.sidenavPadding) {
      return css`
        padding-left: ${props.isExpanded ? sidebarMaxWidth : toolbarHeight};
      `;
    } else if (!props.isGtMobile && props.sidenavPadding) {
      return css`
        padding-bottom: ${toolbarHeight};
      `;
    }
    return css``;
  }}
`;
