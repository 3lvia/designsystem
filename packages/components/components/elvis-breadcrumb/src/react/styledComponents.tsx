import styled from 'styled-components';
import * as ElviaColors from '@elvia/elvis-colors';
import * as ElviaTypography from '@elvia/elvis-typography';

const colors = {
  elviaCharge: ElviaColors.default['primary-colors']['green'].color,
  elviaOn: ElviaColors.default['primary-colors']['white'].color,
  elviaOff: ElviaColors.default['primary-colors']['black'].color,
  elviaGrey70: ElviaColors.default['grey-colors']['grey-70'].color,
};

export const typography = {
  textSm: ElviaTypography.default['text-sm'],
};

export const EWCBreadcrumbWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
  flex-wrap: nowrap;
  max-height: 22px;
  a:last-child {
    font-weight: 500;
    color: ${colors.elviaOff};
  }
  i:last-child {
    font-weight: 500;
    color: ${colors.elviaOff};
  }
`;
export const EWCBreadcrumbDesktopWrapper = styled.span`
  display: flex;
  align-items: center;
`;

type EWCBreadcrumbLinkTypes = {
  isClickable: boolean;
  href: any;
  key: number | undefined;
};

export const EWCBreadcrumbLink = styled.a<EWCBreadcrumbLinkTypes>`
  ${typography.textSm}
  position: relative;
  box-sizing: border-box;
  font-style: normal;
  letter-spacing: 0.2px;
  text-align: left;
  text-decoration: none;
  color: ${colors.elviaGrey70};
  pointer: ${(props: { isClickable: boolean }) => (props.isClickable ? 'cursor' : 'pointer')};
  pointer-events: ${(props: { isClickable: boolean }) => (props.isClickable ? 'auto' : 'none')};
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    width: 0;
    height: 2px;
    border-radius: 25px;
    background: ${colors.elviaCharge};
    opacity: 1;
    transition: all 0.3s ease-in-out;
    visibility: hidden;
  }
  &:hover {
    &::before {
      visibility: visible;
      width: 100%;
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
  padding-top: 7px;
  padding-bottom: 7px;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  display: inline-block;
  margin-right: 8px;
`;
