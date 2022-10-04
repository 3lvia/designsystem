import { getColor } from '@elvia/elvis-colors';
import { getTypographyCss } from '@elvia/elvis-typography';
import styled, { css, keyframes } from 'styled-components';
import { headerZIndex, TertiaryButton, toolbarHeight } from '../styledComponents';

const fadeIn = keyframes`
  from {
    transform: scaleY(0.7);
    opacity: 0;
  }

  to {
    transform: scaleY(1);
    opacity: 1;
  }
  `;

const fadeOut = keyframes`
  from {
    transform: scaleY(1);
    opacity: 1;
  }

  to {
    transform: scaleY(0.5);
    opacity: 0;
  }
  `;

interface MenuContainerProps {
  fadeOut: boolean;
}

export const MenuContainer = styled.div<MenuContainerProps>`
  position: fixed;
  top: ${toolbarHeight};
  padding: 8px 24px 62px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  z-index: ${headerZIndex};
  overflow: hidden;
  animation: ${fadeIn} 300ms ease;
  transform-origin: center top;

  ${(props) =>
    props.fadeOut &&
    css`
      animation: ${fadeOut} 200ms ease;
    `}

  &::before {
    content: '';
    position: absolute;
    background-color: ${getColor('elvia-on')};
    width: 685vw;
    height: 685vw;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 50%;
  }

  & > * {
    position: relative;
  }
`;

export const MenuTitle = styled.div`
  ${getTypographyCss('text-sm')}
  color: ${getColor('text-light')};
  margin-bottom: 8px;
`;

export const UserGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(2, 1fr);
  gap: 0 8px;
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

export const MenuButton = styled(TertiaryButton)`
  font-weight: 500;
`;
