import { getColor } from '@elvia/elvis-colors';
import { getTypographyCss } from '@elvia/elvis-typography';
import styled, { css } from 'styled-components';

export const TriggerContainer = styled.div<{ isShowing: boolean }>`
  display: inline-block;
  user-select: none;

  ${({ isShowing }) =>
    isShowing &&
    css`
      z-index: 999999;
    `};
`;

export const ItemList = styled.div<{ isSelectable: boolean }>`
  display: flex;
  flex-direction: column;
  min-width: 216px;
  text-align: left;
  max-height: calc(50vh - 8px);
  background-color: ${getColor('elvia-on')};
  overflow: auto;
  border-radius: 8px;
  box-shadow: 0px 0px 40px rgba(0, 0, 0, 0.06);

  @supports (max-height: 50svh) {
    max-height: calc(50svh - 8px);
  }

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
    background-color: transparent;
    text-decoration: none;
    white-space: nowrap;

    i {
      margin-right: 16px;
    }

    :hover:not(:disabled) {
      background: ${getColor('grey-05')};
    }

    :disabled {
      cursor: not-allowed;
      color: ${getColor('disabled')};
    }

    span {
      text-overflow: ellipsis;
      overflow: hidden;
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
