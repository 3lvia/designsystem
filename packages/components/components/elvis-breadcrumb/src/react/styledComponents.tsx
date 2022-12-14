import styled from 'styled-components';
import { getColor } from '@elvia/elvis-colors';
import { getTypographyCss } from '@elvia/elvis-typography';

export const BreadcrumbWrapper = styled.nav`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
  flex-wrap: nowrap;
  max-height: 22px;
  a:last-child {
    font-weight: 500;
    color: ${getColor('black')};
  }
  i:last-child {
    font-weight: 500;
    color: ${getColor('black')};
  }
`;

export const BreadcrumbListWrapper = styled.ol`
  display: flex;
  padding: 0;
  margin: 0;
`;

export const BreadcrumbDesktopWrapper = styled.li`
  display: flex;
  align-items: center;
  margin: 0;
`;

export const BreadcrumbMobileWrapper = styled.li`
  list-style: none;
`;

type BreadcrumbLinkProps = {
  isClickable: boolean;
};

export const BreadcrumbLinkStyle = styled.a<BreadcrumbLinkProps>`
  ${getTypographyCss('text-sm')}
  position: relative;
  box-sizing: border-box;
  font-style: normal;
  letter-spacing: 0.2px;
  text-align: left;
  text-decoration: none;
  color: ${getColor('grey-70')};
  pointer-events: ${(props) => (props.isClickable ? 'auto' : 'none')};
  cursor: ${(props) => (props.isClickable ? 'pointer' : 'default')};
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
    background: ${getColor('elvia-charge')};
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
