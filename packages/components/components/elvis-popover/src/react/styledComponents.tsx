import styled, { css, keyframes } from 'styled-components';
import { getColor } from '@elvia/elvis-colors';
import { getTypographyCss } from '@elvia/elvis-typography';
import type { PopoverType } from './elviaPopover.types';

const popoverPadding = 32;
const popoverBoxShadow = '0px 0px 40px rgba(0, 0, 0, 0.06)';

interface TriggerContainerProps {
  overlayIsOpen: boolean;
}

interface PopoverContentProps {
  type: PopoverType;
}

interface PopoverTypographyProps {
  isStringOnly: boolean;
  hasCloseButton: boolean;
}

interface PopoverListProps {
  isSelectable: boolean;
  hasDivider: boolean;
}

const fadeIn = keyframes`
0% {
     opacity: 0;
}
 100% {
     opacity: 1;
}
`;

export const PopoverContainer = styled.div`
  display: flex;
  box-sizing: border-box;
`;

export const PopoverContent = styled.div<PopoverContentProps>`
  display: flex;
  flex-direction: column;
  position: absolute;
  max-width: calc(100% - 16px);
  z-index: 111;
  pointer-events: all;
  padding: ${(props) => (props.type === 'list' ? '0' : `${popoverPadding}px`)};
  background-color: ${getColor('elvia-on')};
  color: ${getColor('elvia-off')};
  text-align: left;
  box-shadow: ${popoverBoxShadow};
  border-radius: 8px;
  animation: ${fadeIn} 200ms ease-in;
  white-space: normal;
  margin: 0;
`;

export const TriggerContainer = styled.div<TriggerContainerProps>`
  display: flex;
  flex-direction: column;
  user-select: none;
  cursor: pointer;

  div {
    display: flex;
  }

  ${(props) =>
    props.overlayIsOpen &&
    css`
      z-index: 110;
    `};
`;

export const PopoverTypography = styled.div<PopoverTypographyProps>`
  ${getTypographyCss('text-sm')}
  ${({ isStringOnly, hasCloseButton }) =>
    isStringOnly &&
    hasCloseButton &&
    css`
      padding-right: 8px;
    `}
`;

export const Backdrop = styled.div`
  height: 100%;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;
`;

export const Heading = styled.h3`
  ${getTypographyCss('text-sm-strong')}
  margin: 0;
  padding: 0;
  padding-bottom: 8px;
  margin-right: 16px;
  text-align: left;
`;

export const CloseButtonContainer = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
`;

export const PopoverList = styled.div<PopoverListProps>`
  display: flex;
  flex-direction: column;
  min-width: 216px;
  max-height: calc(50vh - 8px);
  overflow: auto;
  box-sizing: border-box;
  border-radius: 8px;

  @supports (max-height: 50svh) {
    max-height: calc(50svh - 8px);
  }

  > button,
  > a,
  .ewc-popover__list-group > button,
  .ewc-popover__list-group > a {
    width: 100%;
    border: none;
    padding: 10px 16px;
    background: white;
    cursor: pointer;

    display: flex;
    align-items: center;

    ${getTypographyCss('text-md')}
    text-align: left;
    color: black;
    text-decoration: none;

    i {
      margin-right: 16px;
    }

    :hover {
      background: ${getColor('grey-05')};
    }
    :focus {
      outline: 2px solid ${getColor('focus-outline')};
      outline-offset: 2px;
    }

    ${(props) =>
      props.isSelectable &&
      css`
        padding: 10px 16px 10px 48px;
        i {
          margin-left: -32px;
        }
      `}
  }

  .ewc-popover__list-group {
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      ${getTypographyCss('title-caps')}
      text-align: left;
      color: black;
      margin: 20px 16px 4px 16px;
    }
  }

  ${(props) =>
    props.hasDivider &&
    css`
      .ewc-popover__list-group:not(:last-of-type) {
        border-bottom: 1px solid ${getColor('grey-10')};
      }
    `};
`;
