import { getThemeColor } from '@elvia/elvis-colors';
import { device } from '@elvia/elvis-toolbox';
import { getTypographyCss } from '@elvia/elvis-typography';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { headerZIndex, sidebarAnimation, sidebarMaxWidth, toolbarHeight } from '../styledComponents';
import { publicStyles } from './publicStyles';

interface SideNavContainerProps {
  isExpanded: boolean;
}

export const SideNavContainer = styled.nav<SideNavContainerProps>`
  background-color: ${getThemeColor('background-overlay-3')};
  display: flex;
  position: fixed;
  z-index: ${headerZIndex};
  flex-direction: column;
  overflow: hidden;
  will-change: max-width;
  transition: max-width ${sidebarAnimation};
  width: 100%;
  bottom: 0;
  left: 0;
  right: 0;
  height: ${toolbarHeight};
  padding: 8px 16px;
  border-top: 2px solid ${getThemeColor('border-5')};

  @media ${device.gtMobile} {
    right: auto;
    top: ${toolbarHeight};
    height: auto;
    padding: 16px 8px;
    border-top: 0;
    border-right: 1px solid ${getThemeColor('border-5')};
    max-width: ${({ isExpanded }) => (isExpanded ? sidebarMaxWidth : toolbarHeight)};
  }

  ${publicStyles()}
`;

export const NavItemsContainer = styled.div`
  display: contents;
`;

interface ButtonContainerProps {
  isGtMobile: boolean;
}

export const ButtonContainer = styled.div<ButtonContainerProps>`
  display: flex;
  justify-content: space-evenly;

  ${(props) => {
    if (props.isGtMobile) {
      return css`
        flex-direction: column;
        gap: 24px;
      `;
    }

    return css`
      flex-direction: row;
      gap: 16px;
    `;
  }}
`;

interface IconContainerProps {
  isActive?: boolean;
}

export const IconContainer = styled.div<IconContainerProps>`
  height: 48px;
  width: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: none;
  border: 1px solid transparent;

  ${(props) =>
    props.isActive &&
    css`
      border-color: ${getThemeColor('border-1')};
    `}
`;

export const NavButton = styled.button`
  ${getTypographyCss('text-md')};
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 16px;

  &:hover ${IconContainer} {
    border: 1px solid ${getThemeColor('border-hover-1')};
  }
`;

export const ToggleWidthButton = styled(NavButton)`
  color: ${getThemeColor('text-1')};
  margin-top: auto;
  gap: 32px;
  display: none;

  @media ${device.gtMobile} {
    display: flex;
  }
`;
