import styled, { css, keyframes } from 'styled-components';
import { getThemeColor, ThemeName } from '@elvia/elvis-colors';
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

const fadeIn = keyframes`0% {opacity: 0;} 100% {opacity: 1;}}`;

type ModalProps = {
  isShowing: boolean;
  disableBackdrop: boolean;
};

type IllustrationProps = {
  theme: ThemeName;
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
  background: ${getThemeColor('background-element')};
  box-shadow: 0 0 40px rgba(0, 0, 0, 0.06);

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
}))<IllustrationProps>`
  background: ${getThemeColor('background-tertiary')};
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
    background: ${getThemeColor('background-element')};
    border-radius: 100%;
    border: ${({ theme }) => (theme === 'dark' ? `1px solid ${getThemeColor('background-accent')}` : 'none')};
    position: absolute;
    height: calc(550px * 6.85);
    width: calc(550px * 6.85);
    right: calc(100% - 2.7vw);
    @media (min-width: ${desktopMin}) {
      right: calc(100% - 1.7vw);
    }
    z-index: 0;
  }

  @media (max-width: ${desktopMin}) {
    width: 100%;
    height: ${modalTabletIllustrationHeight};
    margin: 0;
    padding: 32px 48px 0;

    ::after {
      right: unset;
      top: calc(100% - 3.7vw);
      height: calc(100vw * 6.85);
      width: calc(100vw * 6.85);
    }
  }
  @media (max-width: ${mobileMax}) {
    height: ${modalMobileIllustrationHeight};
  }
`;

export const ModalHeading = styled.h2<HeadingProps>`
  margin: 0;
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
  ${getTypographyCss('text-lg')}
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

export const ModalCloseButton = styled.button`
  position: absolute;
  top: 24px;
  right: 24px;
  width: 40px;
  height: 40px;
  z-index: 2;
  background: none;
  border: none;
  border-radius: 200px;
  padding: 8px;
  cursor: pointer;

  @media (max-width: ${mobileMax}) {
    width: 32px;
    height: 32px;
    top: 16px;
    right: 16px;
  }

  :hover {
    background-color: ${getThemeColor('state-on')};
    border-color: ${getThemeColor('state-on')};
  }
`;
