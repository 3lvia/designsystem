import { getColor } from '@elvia/elvis-colors';
import { getTypographyCss } from '@elvia/elvis-typography';
import styled, { css, keyframes } from 'styled-components';

const fadeIn = keyframes`
0% {
     opacity: 0;
}
 100% {
     opacity: 1;
}
`;

export const TriggerContainer = styled.div`
  display: inline-block;
  user-select: none;
`;

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 99999;
`;

export const ContextMenuContent = styled.div`
  position: absolute;
  max-width: calc(100% - 16px);
  z-index: 99999;
  box-shadow: 0px 0px 40px rgba(0, 0, 0, 0.06);
  animation: ${fadeIn} 200ms ease-in;
`;

export const ItemList = styled.div<{ isSelectable: boolean }>`
  display: flex;
  flex-direction: column;
  min-width: 216px;
  text-align: left;

  .ewc-context-menu__list-group:not(:last-of-type) {
    border-bottom: 1px solid ${getColor('grey-10')};
  }

  > button,
  > a,
  .ewc-context-menu__list-group > button,
  .ewc-context-menu__list-group > a {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    width: 100%;
    border: none;
    padding: 10px 16px;
    margin: 0;
    cursor: pointer;
    color: ${getColor('elvia-off')};
    ${getTypographyCss('text-md')}
    background-color: ${getColor('elvia-on')};
    text-decoration: none;

    &.ewc-context-menu__first-child {
      border-radius: 8px 8px 0 0;
    }

    &.ewc-context-menu__last-child {
      border-radius: 0 0 8px 8px;
    }

    &.ewc-context-menu__first-child.ewc-context-menu__last-child {
      border-radius: 8px;
    }

    i {
      margin-right: 16px;
    }

    :hover {
      background: ${getColor('grey-05')};
    }

    ${({ isSelectable }) =>
      isSelectable &&
      css`
        padding: 10px 16px 10px 48px;

        i {
          margin-left: -32px;
        }
      `};
  }

  .ewc-context-menu__list-group {
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      ${getTypographyCss('title-caps')}
      margin: 20px 16px 4px 16px;
    }
  }
`;
