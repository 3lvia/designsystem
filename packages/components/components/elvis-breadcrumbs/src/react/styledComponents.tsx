import styled, { keyframes } from 'styled-components';

const ElviaColors = {
  elviaCharge: '#29d305',
  elviaOn: '#ffffff',
  elviaOff: '#000000',
  elviaGrey70: '#676767',
};

export const EWCBreadcrumbs = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
  flex-wrap: nowrap;
  max-height: 22px;
  a:last-child {
    font-weight: 500;
    color: #000;
  }
  i:last-child {
    font-weight: 500;
    color: ${ElviaColors.elviaOff};
  }
`;

const breadcrumbLinkUnderlineAnimation = keyframes`
 0% { width: 0%; left: 50% }
 100% { width: 100%;left: 0% }`;

export const EWCBreadcrumbsLink = styled.a`
  position: relative;
  box-sizing: border-box;
  font-family: 'Red Hat Text', Verdana, sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px;
  letter-spacing: 0.2px;
  text-align: left;
  text-decoration: none;
  color: ${ElviaColors.elviaGrey70};
  &::before {
    opacity: 0;
  }
  &:hover {
    &::before {
      content: '';
      position: absolute;
      top: 100%;
      width: 100%;
      height: 2px;
      border-radius: 25px;
      background: ${ElviaColors.elviaCharge};
      opacity: 1;
      animation-name: ${breadcrumbLinkUnderlineAnimation};
      animation-duration: 300ms;
    }
  }
`;

export const EWCBreadcrumbIconRight = styled.i`
  background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cg clip-path='url(%23clip0)'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M6.289.389a1.328 1.328 0 011.878 0l10.169 10.168a2.038 2.038 0 010 2.886L8.167 23.61a1.328 1.328 0 11-1.878-1.878L16.022 12 6.289 2.267a1.328 1.328 0 010-1.878z' fill='black'/%3e%3c/g%3e%3cdefs%3e%3cclipPath id='clip0'%3e%3cpath fill='white' d='M0 0h24v24H0z'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e");
  height: 8px;
  width: 8px;
  padding-top: 7px;
  padding-bottom: 7px;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  display: inline-block;
  margin: 0px 8px;
`;

export const EWCBreadcrumbIconLeft = styled.i`
  background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cg clip-path='url(%23clip0)'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M17.715.389c.518.519.518 1.36 0 1.878L7.982 12l9.733 9.733a1.328 1.328 0 01-1.878 1.878L5.668 13.443v-.001a2.038 2.038 0 010-2.884L15.837.388a1.328 1.328 0 011.878 0z' fill='black'/%3e%3c/g%3e%3cdefs%3e%3cclipPath id='clip0'%3e%3cpath fill='white' d='M0 0h24v24H0z'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e");
  height: 8px;
  width: 8px;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  display: inline-block;
  margin-right: 8px;
`;
