import { getShadow, getThemeColor } from '@elvia/elvis-colors';
import { getTypographyCss } from '@elvia/elvis-typography';
import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';

const mobileMax = '767px';
const desktopMin = '1024px';

const modalMobileIllustrationHeight = '40vh';

const fadeIn = keyframes`0% {opacity: 0;} 100% {opacity: 1;}`;

type WrapperProps = {
  hasIllustration: boolean;
  maxWidth?: string;
};

type ContentProps = {
  hasIllustration: boolean;
  hasPadding: boolean;
};

type HeadingProps = {
  hasIllustration: boolean;
};

export const ModalBackdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 99999;
  background: rgba(0, 0, 0, 0.25);
  animation: ${fadeIn} 300ms ease-in;
`;

export const ModalWrapper = styled.div<WrapperProps>`
  position: relative;
  display: flex;
  flex-direction: ${({ hasIllustration }) => (hasIllustration ? 'row-reverse' : 'column')};
  ${({ hasIllustration, maxWidth }) =>
    hasIllustration
      ? css`
          min-height: 550px;
          max-height: min(calc(100vh - 64px), 800px);
          width: 1090px;
          max-width: ${maxWidth ?? 'min(100vw, 1090px)'};
        `
      : css`
          height: auto;
          max-width: ${maxWidth ?? '704px'};
        `}

  border-radius: 8px;
  overflow: hidden;

  --modal-background: ${getThemeColor('background-element-4')};
  background: var(--modal-background);
  box-shadow: ${getShadow('soft')};

  ${({ hasIllustration }) =>
    hasIllustration &&
    css`
      @media (max-width: ${desktopMin}) {
        flex-direction: column;
        margin: 0;
        max-width: 500px;
        height: auto;
        min-height: unset;
        max-height: unset;
      }
    `};

  @media (max-width: ${mobileMax}) {
    flex-direction: column;
    border-radius: 0;
    width: 100vw;
    max-width: 100%;
    height: 100dvh;
    max-height: 100dvh;
    margin: 0;
    inset: 0;
  }
`;

const decideContentPadding = (hasIllustration: boolean, hasPadding: boolean, padding: string): string => {
  if (!hasPadding) {
    return '0';
  } else if (hasIllustration) {
    return '80px';
  } else {
    return padding;
  }
};

export const ModalContent = styled.div<ContentProps>`
  padding: ${({ hasIllustration, hasPadding }) => decideContentPadding(hasIllustration, hasPadding, '48px')};
  width: ${({ hasIllustration }) => (hasIllustration ? '620px' : 'auto')};
  display: flex;
  flex-direction: column;
  z-index: 1;
  background: transparent;
  max-height: calc(100vh - 64px);

  ${({ hasIllustration, hasPadding }) =>
    hasIllustration &&
    css`
      @media (max-width: ${desktopMin}) {
        padding: ${decideContentPadding(false, hasPadding, '40px')};
        padding-top: 24px;
        width: 100%;
        height: calc(100% - ${modalMobileIllustrationHeight});
      }
    `}

  @media (max-width: ${mobileMax}) {
    padding: ${({ hasPadding }) => decideContentPadding(false, hasPadding, '32px 32px 24px 32px')};
    padding-top: ${({ hasIllustration }) => hasIllustration && '24px'};
    width: 100%;
    height: ${({ hasIllustration }) =>
      hasIllustration ? `calc(100% - ${modalMobileIllustrationHeight})` : '100%'};
    max-height: 100vh;
  }
`;

export const ModalIllustration = styled.div`
  background: ${getThemeColor('background-3')};
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 470px;
  z-index: 1;
  padding: 72px;

  ::after {
    content: '';
    background: var(--modal-background);
    border-radius: 100%;
    z-index: 0;
    position: absolute;
    height: 400%;
    width: 500%;
    right: calc(100% - 3.7vw);
    @media (min-width: ${desktopMin}) {
      right: calc(calc(100% - 44px));
    }
  }

  .e-color-background-3 &&,
  .e-theme-dark && {
    ::after {
      border: 2px solid ${getThemeColor('border-2')};
    }
  }

  @media (max-width: ${desktopMin}) {
    width: 100%;
    height: 28vh;
    margin: 0;
    padding: 32px 48px 0;

    ::after {
      right: unset;
      top: calc(93% - 3vw);
      height: calc(100vw * 4);
      width: calc(100vw * 4);
    }
  }
  @media (max-width: ${mobileMax}) {
    height: ${modalMobileIllustrationHeight};
  }
`;

export const ModalHeading = styled.h2<HeadingProps>`
  margin: 0 24px 0 0;
  padding: 0;
  ${({ hasIllustration }) => getTypographyCss(hasIllustration ? 'title-lg' : 'title-md')}
  padding-bottom: ${({ hasIllustration }) => (hasIllustration ? '24px' : '32px')};

  @media (max-width: ${desktopMin}) {
    ${getTypographyCss('title-md')}
    padding-bottom: ${({ hasIllustration }) => (hasIllustration ? '16px' : '32px')};
  }
  @media (max-width: ${mobileMax}) {
    ${getTypographyCss('title-md')}
    padding-top: 8px;
    padding-bottom: 8px;
  }
`;

export const ModalText = styled.div`
  position: relative;
  overflow-y: auto;
  height: 100%;
`;

export const PrimaryButton = styled.div`
  grid-column: start-primary-btn / end-primary-btn;
  @media (max-width: ${mobileMax}) {
    grid-column: unset;
    grid-row: start-primary-btn / end-primary-btn;
  }
`;

export const SecondaryButton = styled.div`
  grid-column: start-secondary-btn / end-secondary-btn;
  @media (max-width: ${mobileMax}) {
    grid-column: unset;
    grid-row: start-secondary-btn / end-secondary-btn;
  }

  @supports selector(:has(*)) {
    :empty {
      display: none;
    }
  }
`;

export const ModalActions = styled.div`
  display: grid;
  grid-template-columns: [start-secondary-btn] 1fr [end-secondary-btn start-primary-btn] 1fr [end-primary-btn];
  grid-template-rows: 1fr;
  padding-top: 24px;
  gap: 24px;

  button {
    width: 100%;
  }

  @media (max-width: ${mobileMax}) {
    grid-template-columns: 1fr;
    grid-template-rows: [start-secondary-btn] 1fr [end-secondary-btn start-primary-btn] 1fr [end-primary-btn];
    gap: 16px;

    // If :has is supported, this will completely remove an empty SecondaryButton in mobile view,
    // which reduces the ammount of padding between buttons and content
    @supports selector(:has(*)) {
      &:has(${SecondaryButton}:empty) {
        grid-template-rows: [start-primary-btn] 1fr [end-primary-btn];
        gap: 0;
      }
    }
  }
`;

export const CloseButtonContainer = styled.div<{ hasIllustration: boolean }>`
  position: absolute;
  top: 24px;
  right: 24px;
  z-index: 2;
  @media (max-width: ${mobileMax}) {
    top: 16px;
    right: 16px;
  }

  ${({ hasIllustration }) =>
    hasIllustration &&
    css`
      svg {
        --e-color-icon-stroke-1: ${getThemeColor('static-white')};
      }

      &:hover svg {
        --e-color-icon-stroke-1: ${getThemeColor('static-black')};
      }
    `}
`;
