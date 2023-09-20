import styled, { css, keyframes } from 'styled-components';
import { getThemeColor, getShadow } from '@elvia/elvis-colors';
import { getTypographyCss } from '@elvia/elvis-typography';

const mobileMax = '767px';
const desktopMin = '1024px';
const modalBorderRadius = '8px';
const modalMaxWidth = '704px';

const modalMobilePadding = '32px 32px 24px 32px';
const modalMobileTitlePaddingTop = '8px';
const modalMobileTitlePaddingBottom = '8px';
const modalMobileIllustrationHeight = '40vh';

const modalTabletPadding = '40px';
const modalTabletIllustrationHeight = '28vh';
const modalTabletTitlePaddingBottom = '32px';
const modalTabletMaxWidth = '500px';

const modalTabletWithIllustrationTitlePaddingBottom = '16px';

const modalDesktopPadding = '48px';
const modalDesktopTitlePaddingBottom = '32px';
const titleFontSize = '30px';
const titleFontWeight = '700';

const modalDesktopWithIllustrationPadding = '80px';
const modalDesktopWithIllustrationTitlePaddingBottom = '24px';
const modalDesktopWithIllustrationTitleFontSize = '44px';
const modalDesktopWithIllustrationTitleFontWeight = '900';

const fadeIn = keyframes`0% {opacity: 0;} 100% {opacity: 1;}`;

type ModalProps = {
  isShowing: boolean;
  disableBackdrop: boolean;
};

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

export const Modal = styled.div<ModalProps>`
  display: ${({ isShowing }) => (isShowing ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  text-align: left;
  ${({ disableBackdrop }) => !disableBackdrop && 'background: rgba(0, 0, 0, 0.25);'}
  z-index: 99999;
  pointer-events: auto;
  box-sizing: border-box;
  opacity: 1;
  animation: ${fadeIn} 300ms ease-in;
`;

export const ModalWrapper = styled.div<WrapperProps>`
  position: relative;
  display: flex;
  flex-direction: ${({ hasIllustration }) => (hasIllustration ? 'row-reverse' : 'column')};
  height: ${({ hasIllustration }) => (hasIllustration ? '550px' : 'auto')};
  width: ${({ hasIllustration }) => (hasIllustration ? '1090px' : 'auto')};
  max-width: ${({ maxWidth, hasIllustration }) =>
    maxWidth ? maxWidth : hasIllustration ? '1090px' : modalMaxWidth};
  border-radius: ${modalBorderRadius};
  overflow: hidden;
  background: ${getThemeColor('background-element-4')};
  box-shadow: ${getShadow('soft')};

  ${({ hasIllustration }) =>
    hasIllustration &&
    css`
      @media (max-width: ${desktopMin}) {
        flex-direction: column;
        margin: 0;
        max-width: ${modalTabletMaxWidth};
        width: 100%;
        height: auto;
      }
    `};

  @media (max-width: ${mobileMax}) {
    flex-direction: column;
    border-radius: 0;
    width: 100%;
    max-width: 100%;
    height: 100%;
    margin: 0;
  }
`;

const decideContentPadding = (hasIllustration: boolean, hasPadding: boolean, padding: string): string => {
  if (!hasPadding) {
    return '0';
  } else if (hasIllustration) {
    return modalDesktopWithIllustrationPadding;
  } else {
    return padding;
  }
};

export const ModalContent = styled.div<ContentProps>`
  padding: ${({ hasIllustration, hasPadding }) =>
    decideContentPadding(hasIllustration, hasPadding, modalDesktopPadding)};
  height: 100%;
  width: ${({ hasIllustration }) => (hasIllustration ? '620px' : 'auto')};
  display: flex;
  flex-direction: column;
  z-index: 1;
  background: transparent;

  ${({ hasIllustration }) =>
    hasIllustration &&
    css`
      @media (max-width: ${desktopMin}) {
        padding: ${modalTabletPadding};
        padding: ${(props: { hasPadding: boolean }) =>
          decideContentPadding(false, props.hasPadding, modalTabletPadding)};
        padding-top: 24px;
        width: 100%;
        height: calc(100% - ${modalMobileIllustrationHeight});
      }
    `}

  @media (max-width: ${mobileMax}) {
    padding: ${({ hasPadding }) => decideContentPadding(false, hasPadding, modalMobilePadding)};
    padding-top: ${({ hasIllustration }) => hasIllustration && '24px'};
    width: 100%;
    height: ${({ hasIllustration }) =>
      hasIllustration ? `calc(100% - ${modalMobileIllustrationHeight})` : '100%'};
  }
`;

export const ModalIllustration = styled.div.attrs(() => ({
  role: 'presentation',
}))`
  background: ${getThemeColor('background-3')};
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 470px;
  height: 100%;
  z-index: 1;
  padding: 72px;

  ::after {
    content: '';
    background: ${getThemeColor('background-element-4')};
    border-radius: 100%;
    z-index: 0;
    position: absolute;
    height: calc(550px * 4);
    width: calc(550px * 5);
    right: calc(100% - 3.7vw);
    @media (min-width: ${desktopMin}) {
      right: calc(calc(100% - 44px));
    }
  }

  .e-color-background-3 && ::after,
  .e-theme-dark && ::after {
    border: 2px solid ${getThemeColor('border-2')};
  }

  @media (max-width: ${desktopMin}) {
    width: 100%;
    height: ${modalTabletIllustrationHeight};
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
  ${getTypographyCss('title-md')}
  font-size: ${({ hasIllustration }) =>
    hasIllustration ? modalDesktopWithIllustrationTitleFontSize : titleFontSize};
  font-weight: ${({ hasIllustration }) =>
    hasIllustration ? modalDesktopWithIllustrationTitleFontWeight : titleFontWeight};
  padding-bottom: ${({ hasIllustration }) =>
    hasIllustration ? modalDesktopWithIllustrationTitlePaddingBottom : modalDesktopTitlePaddingBottom};

  @media (max-width: ${desktopMin}) {
    ${getTypographyCss('title-md')}
    padding-bottom: ${({ hasIllustration }) =>
      hasIllustration ? modalTabletWithIllustrationTitlePaddingBottom : modalTabletTitlePaddingBottom};
  }
  @media (max-width: ${mobileMax}) {
    padding-top: ${modalMobileTitlePaddingTop};
    padding-bottom: ${modalMobileTitlePaddingBottom};
  }
`;

export const ModalText = styled.div`
  position: relative;
  overflow-y: auto;
  height: 100%;
`;

export const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-top: 32px;
  gap: 24px;
  margin: auto 0 0 0;
  position: relative;

  button {
    width: 50%;
  }

  .webComponentBtn {
    width: 50%;
    button {
      width: 100%;
    }
  }

  @media (max-width: ${mobileMax}) {
    flex-direction: column;
    width: 100%;
    gap: 16px;

    button {
      width: 100%;
    }

    .webComponentBtn {
      width: 100%;
    }
  }
`;

export const CloseButtonContainer = styled.div`
  position: absolute;
  top: 24px;
  right: 24px;
  z-index: 2;
  @media (max-width: ${mobileMax}) {
    top: 16px;
    right: 16px;
  }
`;
