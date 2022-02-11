import styled from 'styled-components';
import { getColor } from '@elvia/elvis-colors';
import { getTypography } from '@elvia/elvis-typography';

const colors = {
  elviaCharge: getColor('elvia-charge'),
  elviaBlack: getColor('black'),
  elviaGrey70: getColor('grey-70'),
};

const typography = {
  textSm: getTypography('text-sm'),
};

export const BreadcrumbWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
  flex-wrap: nowrap;
  max-height: 22px;
  a:last-child {
    font-weight: 500;
    color: ${colors.elviaBlack};
  }
  i:last-child {
    font-weight: 500;
    color: ${colors.elviaBlack};
  }
`;

export const BreadcrumbDesktopWrapper = styled.span`
  display: flex;
  align-items: center;
`;

type BreadcrumbLinkProps = {
  isClickable: boolean;
  href: any;
  key: number | undefined;
};

export const BreadcrumbLink = styled.a<BreadcrumbLinkProps>`
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
  cursor: ${(props: { isClickable: boolean }) => (props.isClickable ? 'pointer' : 'default')};
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
