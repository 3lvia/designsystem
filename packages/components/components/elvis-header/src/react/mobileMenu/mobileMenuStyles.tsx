import { getThemeColor } from '@elvia/elvis-colors';
import { getTypographyCss } from '@elvia/elvis-typography';
import styled, { css, keyframes } from 'styled-components';
import { headerZIndex, toolbarHeight } from '../styledComponents';

const fadeIn = keyframes`
  from {
    transform: scaleY(0);
  }

  to {
    transform: scaleY(1);
  }
  `;

const fadeOut = keyframes`
  from {
    transform: scaleY(1);
  }

  to {
    transform: scaleY(0);
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
  padding: 0 32px 32px;
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
      animation: ${fadeOut} 250ms ease-out;

      > * {
        opacity: 0;
      }
    `}

  &::before {
    content: '';
    position: absolute;
    background-color: ${getThemeColor('background-overlay-3')};
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
  z-index: ${headerZIndex};

  ${(props) =>
    props.fadeOut &&
    css`
      animation: ${backdropFadeOut} 250ms ease;
    `};
`;

export const ImageContainer = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  margin-bottom: 8px;
  overflow: hidden;
  display: grid;
  place-items: center;
`;

export const TextSmallStrong = styled.div`
  ${getTypographyCss('text-sm-strong')}
`;

export const TextMdStrong = styled.div`
  ${getTypographyCss('text-md-strong')}
`;

export const TextMicro = styled.div`
  ${getTypographyCss('text-micro')};
`;

export const TextSmall = styled.div`
  ${getTypographyCss('text-sm')}
`;

export const ButtonBase = styled.button`
  color: ${getThemeColor('text-1')};
  border: none;
  text-align: left;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  background: transparent;
  padding: 8px 0;
  cursor: pointer;
`;

export const AppSelectorTrigger = styled(ButtonBase)`
  border: 1px solid ${getThemeColor('border-2')};
  border-width: 1px 0;
  margin: 24px 0;
`;

export const BackButton = styled(ButtonBase)`
  margin: 0 0 32px;
`;

export const ButtonSpacer = styled.div`
  width: 24px;
`;

export const AppListContainer = styled.div`
  margin-bottom: 24px;
`;
