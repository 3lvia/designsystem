import styled, { keyframes } from 'styled-components';
import { getColor } from '@elvia/elvis-colors';
import { getTypography } from '@elvia/elvis-typography';

export const colors = {
  elviaCharge: getColor('elvia-charge'),
  elviaOn: getColor('white'),
  elviaOff: getColor('black'),
  grey: getColor('grey'),
};
export const typography = {
  titleMd: getTypography('title-md'),
  textLg: getTypography('text-lg'),
};

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

export const Modal = styled.div`
  display: ${(props: { isShowing: boolean }) => (props.isShowing ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  text-align: left;
  background: rgba(0, 0, 0, 0.25);
  z-index: 99999;
  pointer-events: auto;
  box-sizing: border-box;
  opacity: 1;
  -o-animation: ${fadeIn} 300ms ease-in;
  -moz-animation: ${fadeIn} 300ms ease-in;
  -webkit-animation: ${fadeIn} 300ms ease-in;
  animation: ${fadeIn} 300ms ease-in;
`;

type WrapperProps = {
  hasIllustration: boolean;
  maxWidth?: string;
};

export const ModalWrapper = styled.div<WrapperProps>`
  position: relative;
  display: flex;
  flex-direction: ${(props: { hasIllustration: boolean }) =>
    props.hasIllustration ? 'row-reverse' : 'column'};
  height: ${(props: { hasIllustration: boolean }) => (props.hasIllustration ? '550px' : 'auto')};
  width: ${(props: { hasIllustration: boolean }) => (props.hasIllustration ? '1090px' : 'auto')};
  max-width: ${(props: { hasIllustration: boolean; maxWidth?: string }) =>
    props.maxWidth ? props.maxWidth : props.hasIllustration ? '1090px' : modalMaxWidth};
  border-radius: ${modalBorderRadius};
  overflow: hidden;
  background: ${colors.elviaOn};

  ${(props: { hasIllustration: boolean }) =>
    props.hasIllustration &&
    `@media (max-width: ${desktopMin}) {
    flex-direction: column;
    margin: 0;
    max-width: ${modalTabletMaxWidth};
    width: 100%;
    height: auto;
  }`};

  @media (max-width: ${mobileMax}) {
    flex-direction: column;
    border-radius: 0px;
    width: 100%;
    max-width: 100%;
    height: 100%;
    margin: 0;
  }
`;

const decideContentPadding = (hasIllustration: boolean, hasPadding: boolean, padding: string): string => {
  if (!hasPadding) {
    return '0px';
  } else if (hasIllustration) {
    return modalDesktopWithIllustrationPadding;
  } else {
    return padding;
  }
};

type ModalContentProps = {
  hasIllustration: boolean;
  hasPadding: boolean;
};

export const ModalContent = styled.div<ModalContentProps>`
  padding: ${(props: { hasIllustration: boolean; hasPadding: boolean }) =>
    decideContentPadding(props.hasIllustration, props.hasPadding, modalDesktopPadding)};
  height: 100%;
  width: ${(props: { hasIllustration: boolean }) => (props.hasIllustration ? '620px' : 'auto')};
  display: flex;
  flex-direction: column;
  z-index: 1;

  ${(props: { hasIllustration: boolean }) =>
    props.hasIllustration &&
    `
    @media (max-width: ${desktopMin}) {
      padding: ${modalTabletPadding};
      padding: ${(props: { hasPadding: boolean }) =>
        decideContentPadding(false, props.hasPadding, modalTabletPadding)};
      padding-top: 24px;
      width: 100%;
      height: calc(100% - ${modalMobileIllustrationHeight});
    }`}

  @media (max-width: ${mobileMax}) {
    padding: ${(props: { hasPadding: boolean }) =>
      decideContentPadding(false, props.hasPadding, modalMobilePadding)};
    padding-top: ${(props: { hasIllustration: boolean }) => props.hasIllustration && '24px'};
    width: 100%;
    height: ${(props: { hasIllustration: boolean }) =>
      props.hasIllustration ? `calc(100% - ${modalMobileIllustrationHeight})` : '100%'};
  }
`;

export const ModalIllustration = styled.div`
  background: ${colors.grey};
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
    background: ${colors.elviaOn};
    border-radius: 100%;
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

export const ModalTitle = styled.div`
  ${typography.titleMd}
  font-size: ${(props: { hasIllustration: boolean }) =>
    props.hasIllustration ? modalDesktopWithIllustrationTitleFontSize : titleFontSize};
  font-weight: ${(props: { hasIllustration: boolean }) =>
    props.hasIllustration ? modalDesktopWithIllustrationTitleFontWeight : titleFontWeight};
  padding-bottom: ${(props: { hasIllustration: boolean }) =>
    props.hasIllustration ? modalDesktopWithIllustrationTitlePaddingBottom : modalDesktopTitlePaddingBottom};

  @media (max-width: ${desktopMin}) {
    ${typography.titleMd}
  }

  @media (max-width: ${desktopMin}) {
    padding-bottom: ${(props: { hasIllustration: boolean }) =>
      props.hasIllustration ? modalTabletWithIllustrationTitlePaddingBottom : modalTabletTitlePaddingBottom};
  }
  @media (max-width: ${mobileMax}) {
    padding-top: ${modalMobileTitlePaddingTop};
    padding-bottom: ${modalMobileTitlePaddingBottom};
    font-size: ${typography.titleMd.fontSizeMobile};
    font-weight: ${typography.titleMd.fontWeight};
    line-height: ${typography.titleMd.lineHeightMobile};
  }
`;

export const ModalText = styled.div`
  ${typography.textLg}
  position: relative;
  overflow-y: auto;
  height: 100%;

  @media (max-width: ${mobileMax}) {
    font-size: ${typography.textLg.fontSizeMobile};
    line-height: ${typography.textLg.lineHeightMobile};
  }
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
    background-color: ${colors.elviaCharge};
    border-color: ${colors.elviaCharge};
  }
`;
