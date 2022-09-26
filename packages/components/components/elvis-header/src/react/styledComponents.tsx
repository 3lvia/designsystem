import styled, { css, keyframes } from 'styled-components';

import { getColor } from '@elvia/elvis-colors';
import { getTypographyCss } from '@elvia/elvis-typography';

export const toolbarHeight = '64px';

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

export const Backdrop = styled.div<Partial<BackdropProps>>`
  background: ${(props) => (props.transparent ? 'transparent' : 'rgba(0, 0, 0, 0.5)')};
  position: absolute;
  top: ${toolbarHeight};
  bottom: 0;
  right: 0;
  left: 0;
  animation: ${fadeIn} 300ms;

  ${(props) => {
    if (props.fadeOut) {
      return css`
        animation: ${fadeOut} 200ms ease;
      `;
    }

    return css``;
  }}
`;

export const Header = styled.header`
  background-color: ${getColor('elvia-on')};
  height: ${toolbarHeight};
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
`;

export const SquareContainer = styled.div`
  width: 58px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface LogoContainerProps {
  isGtMobile: boolean;
}

export const LogoContainer = styled(SquareContainer)<LogoContainerProps>`
  ${(props) => {
    if (props.isGtMobile) {
      return css`
        width: unset;
        padding: 19px 2rem 19px 19px;
      `;
    }

    return css`
      padding: 19px 16px;
    `;
  }}
`;

interface PageTitleProps {
  gtMobile: boolean;
}

export const PageTitle = styled.h1<PageTitleProps>`
  ${getTypographyCss('text-md-strong')};

  ${(props) => {
    if (props.gtMobile) {
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
  gap: 0.5rem;

  &:not(:last-of-type) {
    margin-bottom: 1rem;
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
        margin: 0 ${props.isGtTablet ? '2rem' : '1.5rem'};
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

export const PageContainer = styled.div``;

export const SideNav = styled.nav``;

export const AppContent = styled.main``;
