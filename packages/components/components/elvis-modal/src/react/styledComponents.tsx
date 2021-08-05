import styled, { keyframes } from 'styled-components';

const ElviaColors = {
  elviaOn: '#ffffff',
  elviaOff: '#000000',
  grey: '#262626',
};

const mobileMax = '767px';
const desktopMin = '1024px';
const modalBorderRadius = '8px';
const modalMaxWidth = '704px';

const mobileTitleFontSize = '24px';
const mobileTitleFontWeight = '700';
const modalMobilePadding = '32px 32px 24px 32px';
const modalMobileTitlePaddingBottom = '8px';

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

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: ${(props: { hasIllustration: boolean }) =>
    props.hasIllustration ? 'row-reverse' : 'column'};
  height: ${(props: { hasIllustration: boolean }) => (props.hasIllustration ? '550px' : 'auto')};
  width: ${(props: { hasIllustration: boolean }) => (props.hasIllustration ? '1090px' : 'auto')};
  max-width: ${(props: { hasIllustration: boolean }) => (props.hasIllustration ? '1090px' : modalMaxWidth)};
  border-radius: ${modalBorderRadius};
  overflow: hidden;
  background: ${ElviaColors.elviaOn};

  @media (max-width: ${mobileMax}) {
    flex-direction: column;
    border-radius: 0px;
    width: 100%;
    max-width: 100%;
    height: 100%;
    margin: 0;
  }
`;

export const Content = styled.div`
  padding: ${(props: { hasIllustration: boolean }) =>
    props.hasIllustration ? modalDesktopWithIllustrationPadding : modalDesktopPadding};
  height: inherit;
  width: ${(props: { hasIllustration: boolean }) => (props.hasIllustration ? '620px' : 'auto')};
  display: flex;
  flex-direction: column;
  z-index: 1;

  @media (max-width: ${mobileMax}) {
    padding: ${modalMobilePadding};
    padding-top: ${(props: { hasIllustration: boolean }) => props.hasIllustration && '24px'};
    width: 100%;
    height: ${(props: { hasIllustration: boolean }) =>
      props.hasIllustration ? 'calc(100% - 250px)' : '100%'};
  }
`;

export const Illustration = styled.div`
  background: ${ElviaColors.grey};
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
    background: ${ElviaColors.elviaOn};
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

  @media (max-width: ${mobileMax}) {
    width: 100%;
    height: 250px;
    margin: 0;
    padding: 32px 48px 0;

    ::after {
      right: unset;
      top: calc(100% - 3.7vw);
      height: calc(100vw * 6.85);
      width: calc(100vw * 6.85);
    }
  }
`;

export const Title = styled.div`
  font-family: 'Red Hat Display', Verdana, sans-serif;
  font-size: ${(props: { hasIllustration: boolean }) =>
    props.hasIllustration ? modalDesktopWithIllustrationTitleFontSize : titleFontSize};
  font-weight: ${(props: { hasIllustration: boolean }) =>
    props.hasIllustration ? modalDesktopWithIllustrationTitleFontWeight : titleFontWeight};
  line-height: 36px;
  letter-spacing: unset;
  font-style: unset;
  text-transform: unset;
  color: inherit;
  padding-bottom: ${(props: { hasIllustration: boolean }) =>
    props.hasIllustration ? modalDesktopWithIllustrationTitlePaddingBottom : modalDesktopTitlePaddingBottom};

  @media (max-width: ${mobileMax}) {
    padding-bottom: ${modalMobileTitlePaddingBottom};
    font-size: ${mobileTitleFontSize};
    font-weight: ${mobileTitleFontWeight};
    line-height: 29px;
  }
`;

export const Text = styled.div`
  font-family: 'Red Hat Text', Verdana, sans-serif;
  font-size: 20px;
  font-weight: 400;
  line-height: 32px;
  letter-spacing: unset;
  font-style: unset;
  text-transform: unset;
  color: ${ElviaColors.elviaOff};
  position: relative;
  overflow-y: auto;
  height: 100%;

  @media (max-width: ${mobileMax}) {
    font-size: 14px;
    line-height: 22.4px;
  }
`;

export const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-top: 32px;
  gap: 24px;
  margin: auto 0 0 0;
  position: relative;

  @media (max-width: ${mobileMax}) {
    flex-direction: column;
    width: 100%;
    gap: 16px;
  }

  button:not(:only-of-type) {
    width: 100%;
  }
  .webComponentBtn:not(:only-of-type) {
    width: 100%;
    button {
      width: inherit;
    }
  }

  :not(webComponentBtn) > button:only-of-type {
    width: 50%;
    @media (max-width: ${mobileMax}) {
      width: 100%;
    }
  }
`;

export const CloseButton = styled.button`
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

  @media (max-width: ${mobileMax}) {
    width: 32px;
    height: 32px;
    top: 16px;
    right: 16px;
  }

  :hover {
    background-color: #29d305;
    border-color: #29d305;

    .ewc-icon {
      filter: invert(1);
    }
  }
  .ewc-icon {
    width: 100%;
    height: 100%;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    display: inline-block;
    background-image: url("data:image/svg+xml,%3csvg width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cg clip-path='url(%23clip0)'%3e%3cpath d='M14.3 12.179a.25.25 0 010-.354l9.263-9.262A1.5 1.5 0 1021.439.442L12.177 9.7a.25.25 0 01-.354 0L2.561.442A1.5 1.5 0 00.439 2.563L9.7 11.825a.25.25 0 010 .354L.439 21.442a1.5 1.5 0 102.122 2.121l9.262-9.263a.25.25 0 01.354 0l9.262 9.263a1.5 1.5 0 002.122-2.121L14.3 12.179z' fill='white'/%3e%3c/g%3e%3cdefs%3e%3cclipPath id='clip0'%3e%3cpath d='M0 0h24v24H0V0z' fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e");
  }
`;
