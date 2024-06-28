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
  flex-direction: column;

  ${({ hasIllustration, maxWidth }) =>
    hasIllustration
      ? css`
          flex-direction: row-reverse;
          min-height: 550px;
          max-height: min(calc(100vh - 64px), 800px);
          width: 1090px;
          max-width: ${maxWidth ?? 'min(100vw, 1090px)'};

          @media (max-width: ${desktopMin}) {
            flex-direction: column;
            max-width: 500px;
            min-height: unset;
            max-height: unset;
          }
        `
      : css`
          max-width: ${maxWidth ?? '704px'};
        `}

  border-radius: 8px;
  overflow: hidden;

  --modal-background: ${getThemeColor('background-element-4')};
  background: var(--modal-background);
  box-shadow: ${getShadow('soft')};

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
  display: flex;
  flex-direction: column;
  z-index: 1;
  max-height: calc(100vh - 64px);

  ${({ hasIllustration, hasPadding }) =>
    hasIllustration &&
    css`
      width: 620px;

      @media (max-width: ${desktopMin}) {
        padding: ${decideContentPadding(false, hasPadding, '40px')};
        padding-top: 24px;
        width: 100%;
      }
    `}

  @media (max-width: ${mobileMax}) {
    padding: ${({ hasPadding }) => decideContentPadding(false, hasPadding, '32px 32px 24px 32px')};
    padding-top: ${({ hasIllustration }) => hasIllustration && '24px'};
    width: 100%;
    flex: 1;
    max-height: 100vh;
  }
`;

export const ModalIllustration = styled.div`
  --curve-size: 44px;
  background: ${getThemeColor('background-3')};
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 470px;
  z-index: 1;
  padding: 16px;

  ::after {
    content: '';
    background: var(--modal-background);
    border-radius: 100%;
    z-index: 0;
    position: absolute;
    height: 400%;
    aspect-ratio: 1;
  }

  .e-color-background-3 &&,
  .e-theme-dark && {
    ::after {
      border: 2px solid ${getThemeColor('border-2')};
    }
  }

  // Position-logic for tablet and mobile
  @media (max-width: ${desktopMin}) {
    --curve-size: 3vw;
    width: 100%;
    height: 28vh;

    // Add padding left to account for space occupied by curve
    padding-bottom: calc(16px + var(--curve-size));

    ::after {
      top: calc(93% - var(--curve-size));
      height: 400vw;
    }

    > * {
      height: min(100%, 70vw);
    }
  }

  // Position-logic for desktop
  @media (min-width: ${desktopMin}) {
    // Add padding left to account for space occupied by curve
    padding-left: calc(16px + var(--curve-size));

    ::after {
      right: calc(100% - var(--curve-size));
    }
  }

  @media (max-width: ${mobileMax}) {
    height: ${modalMobileIllustrationHeight};
  }
`;

export const ModalHeading = styled.h2<{ hasIllustration: boolean }>`
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
  flex: 1;
`;

const buttonMargin = css`
  & > * {
    margin-top: 24px;
  }
  @media (max-width: ${mobileMax}) {
    & > * {
      margin-top: initial;
    }
  }
`;

export const PrimaryButton = styled.div`
  grid-column: start-primary-btn / end-primary-btn;

  ${buttonMargin}
  @media (max-width: ${mobileMax}) {
    grid-column: unset;
    grid-row: start-primary-btn / end-primary-btn;
  }
`;

export const SecondaryButton = styled.div`
  grid-column: start-secondary-btn / end-secondary-btn;

  ${buttonMargin}
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
  gap: 24px;

  button {
    width: 100%;
  }

  @media (max-width: ${mobileMax}) {
    grid-template-columns: 1fr;
    grid-template-rows: [start-secondary-btn] 1fr [end-secondary-btn start-primary-btn] 1fr [end-primary-btn];
    gap: 16px;
    margin-top: 24px;

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
  top: 16px;
  right: 16px;
  z-index: 2;

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
