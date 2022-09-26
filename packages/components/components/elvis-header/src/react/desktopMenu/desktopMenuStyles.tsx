import { getColor } from '@elvia/elvis-colors';
import { getTypographyCss } from '@elvia/elvis-typography';
import styled, { css, keyframes } from 'styled-components';
import { Hr, TertiaryButton } from '../styledComponents';

const fadeIn = keyframes`
  from {
    transform: scale(0.7);
    opacity: 0;
  }

  to {
    transform: scaleY(1);
    opacity: 1;
  }
  `;

const fadeOut = keyframes`
  from {
    transform: scale(1);
    opacity: 1;
  }

  to {
    transform: scale(0.7);
    opacity: 0;
  }
  `;

interface MenuContainerProps {
  fadeOut: boolean;
}

export const MenuContainer = styled.div<MenuContainerProps>`
  background-color: ${getColor('elvia-on')};
  border-radius: 0.5rem;
  position: absolute;
  top: 72px;
  right: 1.5rem;
  padding: 32px;
  display: flex;
  flex-direction: column;
  z-index: 1;
  animation: ${fadeIn} 300ms ease;
  transform-origin: 70% top;
  box-shadow: 0px 0px 40px rgba(0, 0, 0, 0.06);

  ${(props) => {
    if (props.fadeOut) {
      return css`
        animation: ${fadeOut} 200ms ease;
      `;
    }

    return css``;
  }};
`;

export const TriggerButton = styled(TertiaryButton)`
  margin-right: 1.5rem;
`;

export const MenuTitle = styled.div`
  ${getTypographyCss('text-sm-strong')}
  margin-bottom: 0.5rem;
`;

export const AppTitle = styled.h1`
  ${getTypographyCss('title-caps')}
  margin: 0;
`;

export const UserGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(2, 1fr);
  gap: 0 0.5rem;
`;

export const ProfilePicture = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #fafafa;
  grid-row: 1 / -1;
  align-self: center;
`;

export const Username = styled.div`
  ${getTypographyCss('text-sm-strong')}
`;

export const Email = styled.div`
  ${getTypographyCss('text-sm')}
`;

export const MenuHr = styled(Hr)`
  margin: 1.5rem 0 1rem;
`;

export const MenuButton = styled(TertiaryButton)`
  margin-left: auto;
  font-weight: 500;
`;
