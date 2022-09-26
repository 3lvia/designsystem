import { getColor } from '@elvia/elvis-colors';
import { getTypographyCss } from '@elvia/elvis-typography';
import styled, { css } from 'styled-components';
import { toolbarHeight } from '../styledComponents';

interface SideNavContainerProps {
  isGtMobile: boolean;
  isExpanded: boolean;
}

export const SideNavContainer = styled.nav<SideNavContainerProps>`
  background-color: ${getColor('elvia-on')};
  display: flex;
  position: fixed;
  z-index: 1;
  flex-direction: column;
  overflow: hidden;
  will-change: max-width;
  transition: max-width 0.4s ease;

  ${(props) => {
    if (props.isGtMobile) {
      return css`
        left: 0;
        top: ${toolbarHeight};
        bottom: 0;
        padding: 1rem 0.5rem;
      `;
    }

    return css`
      bottom: 0;
      left: 0;
      right: 0;
      height: ${toolbarHeight};
      padding: 0.5rem 1rem;
    `;
  }}

  ${(props) => {
    if (props.isExpanded && props.isGtMobile) {
      return css`
        max-width: 30vw;
      `;
    } else if (props.isGtMobile) {
      return css`
        max-width: ${toolbarHeight};
      `;
    }

    return css``;
  }}
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
        gap: 1.5rem;
      `;
    }

    return css`
      flex-direction: row;
      gap: 1rem;
    `;
  }}
`;

interface NavButtonProps {
  isGtMobile?: boolean;
}

export const NavButton = styled.button<NavButtonProps>`
  ${getTypographyCss('text-md')};
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 1rem;

  ${(props) => {
    if (props.isGtMobile) {
      return css`
        padding-right: 2rem;
      `;
    }

    return css``;
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

  ${(props) => {
    if (props.isActive) {
      return css`
        border-color: ${getColor('black')};
      `;
    }

    return css``;
  }};
`;

export const ToggleWidthButton = styled(NavButton)`
  margin-top: auto;
  gap: 2rem;
`;
