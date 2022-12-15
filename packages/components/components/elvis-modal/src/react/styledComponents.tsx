import styled, { css, keyframes } from 'styled-components';
import { getColor } from '@elvia/elvis-colors';
import { getTypographyCss } from '@elvia/elvis-typography';

export const colors = {
  elviaCharge: getColor('elvia-charge'),
  elviaOn: getColor('white'),
  elviaOff: getColor('black'),
  grey: getColor('grey'),
};
export const typography = {
  titleMd: getTypographyCss('title-md'),
  textLg: getTypographyCss('text-lg'),
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

type ModalProps = {
  isShowing: boolean;
  disableBackdrop: boolean;
};

export const Modal = styled.div<ModalProps>`
  display: ${(props) => (props.isShowing ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  text-align: left;
  ${(props) => !props.disableBackdrop && 'background: rgba(0, 0, 0, 0.25);'}
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
  flex-direction: ${(props) => (props.hasIllustration ? 'row-reverse' : 'column')};
  height: ${(props) => (props.hasIllustration ? '550px' : 'auto')};
  width: ${(props) => (props.hasIllustration ? '1090px' : 'auto')};
  max-width: ${(props) =>
    props.maxWidth ? props.maxWidth : props.hasIllustration ? '1090px' : modalMaxWidth};
  border-radius: ${modalBorderRadius};
  overflow: hidden;
  background: ${colors.elviaOn};
  box-shadow: 0px 0px 40px rgba(0, 0, 0, 0.06);

  ${(props) =>
    props.hasIllustration &&
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
  padding: ${(props) => decideContentPadding(props.hasIllustration, props.hasPadding, modalDesktopPadding)};
  height: 100%;
  width: ${(props) => (props.hasIllustration ? '620px' : 'auto')};
  display: flex;
  flex-direction: column;
  z-index: 1;

  ${(props) =>
    props.hasIllustration &&
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
    padding: ${(props) => decideContentPadding(false, props.hasPadding, modalMobilePadding)};
    padding-top: ${(props) => props.hasIllustration && '24px'};
    width: 100%;
    height: ${(props) => (props.hasIllustration ? `calc(100% - ${modalMobileIllustrationHeight})` : '100%')};
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

type ModalHeadingProps = {
  hasIllustration: boolean;
};

export const ModalHeading = styled.h2<ModalHeadingProps>`
  margin: 0;
  padding: 0;
  ${typography.titleMd}
  font-size: ${(props) =>
    props.hasIllustration ? modalDesktopWithIllustrationTitleFontSize : titleFontSize};
  font-weight: ${(props) =>
    props.hasIllustration ? modalDesktopWithIllustrationTitleFontWeight : titleFontWeight};
  padding-bottom: ${(props) =>
    props.hasIllustration ? modalDesktopWithIllustrationTitlePaddingBottom : modalDesktopTitlePaddingBottom};

  @media (max-width: ${desktopMin}) {
    ${typography.titleMd}
    padding-bottom: ${(props) =>
      props.hasIllustration ? modalTabletWithIllustrationTitlePaddingBottom : modalTabletTitlePaddingBottom};
  }
  @media (max-width: ${mobileMax}) {
    padding-top: ${modalMobileTitlePaddingTop};
    padding-bottom: ${modalMobileTitlePaddingBottom};
  }
`;

export const ModalText = styled.div`
  ${typography.textLg}
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
    background-color: ${colors.elviaCharge};
    border-color: ${colors.elviaCharge};
  }
`;
