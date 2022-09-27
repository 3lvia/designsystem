import { getColor } from '@elvia/elvis-colors';
import { getTypographyCss } from '@elvia/elvis-typography';
import styled, { css } from 'styled-components';
import { headerZIndex, toolbarHeight } from '../styledComponents';

interface SideNavContainerProps {
  isGtMobile: boolean;
  isExpanded: boolean;
}

export const SideNavContainer = styled.nav<SideNavContainerProps>`
  background-color: ${getColor('elvia-on')};
  display: flex;
  position: fixed;
  z-index: ${headerZIndex};
  flex-direction: column;
  overflow: hidden;
  will-change: max-width;
  transition: max-width 200ms ease;
  width: 100%;

  ${(props) => {
    if (props.isGtMobile) {
      return css`
        left: 0;
        top: ${toolbarHeight};
        bottom: 0;
        padding: 1rem 0.5rem;
        border-right: 2px solid ${getColor('grey-05')};
      `;
    }

    return css`
      bottom: 0;
      left: 0;
      right: 0;
      height: ${toolbarHeight};
      padding: 0.5rem 1rem;
      border-top: 2px solid ${getColor('grey-05')};
    `;
  }}

  ${(props) => {
    if (props.isExpanded && props.isGtMobile) {
      return css`
        max-width: 270px;
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

export const NavButton = styled.button`
  ${getTypographyCss('text-md')};
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 1rem;

  &:hover ${IconContainer} {
    border: 1px solid ${getColor('green')};
  }
`;

export const ToggleWidthButton = styled(NavButton)`
  margin-top: auto;
  gap: 2rem;
`;
