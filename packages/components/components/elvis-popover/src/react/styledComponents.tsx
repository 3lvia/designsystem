import styled from 'styled-components';
import { getColor } from '@elvia/elvis-colors';
import { getTypographyCss } from '@elvia/elvis-typography';

const popoverPadding = 32;
const popoverBoxShadow = '0px 0px 40px rgba(0, 0, 0, 0.06)';

export const PopoverStyles = styled.div`
  .ewc-no-outline,
  .ewc-no-outline * {
    outline: none !important;
  }

  .ewc-popover {
    display: flex;
    box-sizing: border-box;

    &__backdrop {
      z-index: 100;
      position: fixed;
      left: 0px;
      top: 0px;
      width: 100%;
      height: 100%;
    }

    &__trigger {
      display: flex;
      flex-direction: column;
      -webkit-user-select: none;
      -ms-user-select: none;
      user-select: none;
      cursor: pointer;

      div {
        display: flex;
      }
    }
    &:not(.ewc-popover--hide) {
      > .ewc-popover__trigger {
        z-index: 110;
      }
    }

    &__fixed-content-area {
      position: fixed;
      z-index: 101;

      .ewc-popover__contentContainer {
        height: 100%;
        width: 100%;
        position: relative;
      }
    }

    @keyframes fadeIn {
      0% {
        opacity: 0;
      }
      1% {
        display: block;
      }
      100% {
        opacity: 1;
      }
    }

    &__content {
      display: flex;
      flex-direction: column;
      position: absolute;
      max-width: max-content;
      width: calc(100% - 16px);
      opacity: 1;
      z-index: 111;
      pointer-events: all;
      padding: ${popoverPadding}px;
      background-color: ${getColor('white')};
      color: black;
      text-align: left;
      box-shadow: ${popoverBoxShadow};
      border-radius: 8px;
      animation: fadeIn 250ms ease-in;
      white-space: normal;
      margin: 0;

      .ewc-popover__close {
        position: absolute;
        top: 8px;
        right: 8px;
      }
      .ewc-popover__header {
        margin: 0;
        padding: 0;
        ${getTypographyCss('text-sm-strong')}
        margin-right: 16px;
        padding-bottom: 8px;
        text-align: left;
      }
      .ewc-popover__text {
        ${getTypographyCss('text-sm')}
      }
    }

    &.ewc-popover--hide .ewc-popover__content,
    &.ewc-popover--hide .ewc-popover__backdrop {
      opacity: 0;
      display: none;
    }

    &.ewc-popover--text-only .ewc-popover__content {
      max-width: 450px - ${popoverPadding}px * 2;
      .ewc-popover__text {
        padding-right: 8px;
      }
      // IE specific
      @media screen and (-ms-high-contrast: none) {
        width: 450px;
      }
    }

    // List
    &.ewc-popover--list .ewc-popover__content .ewc-popover__list {
      display: flex;
      flex-direction: column;
      min-width: 216px;
      box-sizing: border-box;
      border-radius: 8px;

      & > button,
      & > a,
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

        &:hover {
          background: ${getColor('grey-05')};
        }
        &:focus {
          outline: 2px solid ${getColor('focus-outline')};
          outline-offset: 2px;
        }
      }

      .ewc-popover__list-group {
        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          font-family: 'Red Hat Text', Verdana, sans-serif;
          font-size: 14px;
          font-style: normal;
          font-weight: 500;
          line-height: 17px;
          letter-spacing: 0.8px;
          text-transform: uppercase;
          text-align: left;
          color: black;

          margin: 20px 16px 4px 16px;
        }
      }
      & > *:first-child,
      .ewc-popover__list-group:first-of-type,
      .ewc-popover__list-group:first-of-type > *:first-child {
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
      }
      & > *:last-child,
      .ewc-popover__list-group:last-of-type,
      .ewc-popover__list-group:last-of-type > *:last-child {
        border-bottom-left-radius: 8px;
        border-bottom-right-radius: 8px;
      }
    }
    &.ewc-popover--list .ewc-popover__content {
      padding: 0;
    }
    &.ewc-popover--list-divider .ewc-popover__content {
      .ewc-popover__list-group:not(:last-of-type) {
        border-bottom: 1px solid ${getColor('grey-10')};
      }
    }
    &.ewc-popover--list.ewc-popover--list-selectable .ewc-popover__content .ewc-popover__list {
      & > button,
      & > a,
      .ewc-popover__list-group > button,
      .ewc-popover__list-group > a {
        padding: 10px 16px 10px 48px;
        i {
          margin-left: -32px;
        }
      }
    }
  }

  // Should be moved out at some point
  // --- ICON BTN ---
  .ewc-btn.ewc-btn--icon {
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    border: none;
    border-radius: 50px;
    padding: 8px;
    background: none;
    color: black;

    &.ewc-btn---hover,
    &:hover:not(:disabled),
    &.ewc-btn---active,
    &:active:not(:disabled) {
      background: ${getColor('elvia-charge')};
    }
  }
`;
