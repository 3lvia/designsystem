import { getColor } from '@elvia/elvis-colors';
import { getTypographyCss } from '@elvia/elvis-typography';
import styled, { css, keyframes } from 'styled-components';
import { headerZIndex, toolbarHeight } from '../styledComponents';

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

const backdropFadeIn = keyframes`
  from { opacity: 0; }

  to { opacity: 1; }
`;

const backdropFadeOut = keyframes`
  from { opacity: 1; }

  to { opacity: 0; }
`;

export const MenuContainer = styled.div<{ fadeOut: boolean }>`
  position: fixed;
  top: ${toolbarHeight};
  padding: 8px 24px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
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

export const Backdrop = styled.div<{ fadeOut: boolean }>`
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: ${toolbarHeight};
  bottom: 0;
  right: 0;
  left: 0;
  animation: ${backdropFadeIn} 300ms;

  ${(props) =>
    props.fadeOut &&
    css`
      animation: ${backdropFadeOut} 200ms ease;
    `}
`;

export const ImageContainer = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background-color: ${getColor('grey-05')};
  margin-bottom: 8px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Username = styled.div`
  ${getTypographyCss('text-sm-strong')}
`;

export const Email = styled.div`
  ${getTypographyCss('text-sm')}
  margin-bottom: 24px;
`;
