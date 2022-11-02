import styled, { css } from 'styled-components';
import { getColor } from '@elvia/elvis-colors';

const iconButtonWidth = 24;
const tabsLineHeight = 20;
const tabsUnderlineHeight = 4;
const tabsLabelPaddingBottom = 8;
const tabsFocusPadding = 4;
const tabsHeight = tabsLineHeight + tabsLabelPaddingBottom + tabsUnderlineHeight;
const tabsHeightWithFocus = tabsHeight + tabsFocusPadding * 2;

const underline = css`
  content: '';
  position: absolute;
  height: 4px;
  bottom: 0px;
  top: ${tabsLineHeight}px + ${tabsLabelPaddingBottom}px;
  left: 0px;
  border-radius: 50px;
`;

export const TabsStyles = styled.div`
  overflow: hidden;

  .ewc-no-outline,
  .ewc-no-outline * {
    outline: none !important;
  }

  .ewc-tabs {
    display: flex;
    flex-direction: row;
    align-items: center;
    overflow: hidden;
    position: relative;
    height: ${tabsHeightWithFocus}px;
    &,
    * {
      box-sizing: border-box;
    }

    &__arrow {
      position: absolute;
      width: 8px;
      height: calc(${tabsHeightWithFocus}px - (16px * 2));
      z-index: 10;
      transition: visibility 0.5s ease-in;
      box-sizing: content-box;
      -webkit-user-select: none;
      -ms-user-select: none;
      user-select: none;

      // IE specific
      @media screen and (-ms-high-contrast: none) {
        margin-top: -20px;
      }

      &:hover {
        cursor: pointer;
      }

      &.ewc-tabs__arrow--left {
        padding: 16px 28px 16px 8px;
      }

      &.ewc-tabs__arrow--right {
        right: 24px;
        padding: 16px 8px 16px 28px;
      }

      &.ewc-tabs__arrow--remove {
        display: none;
      }
    }

    &__items {
      position: relative;
      display: flex;
      width: 100%;
      -webkit-user-select: none;
      -ms-user-select: none;
      user-select: none;

      &.right-arrow-fade {
        -webkit-mask: linear-gradient(to left, transparent 0%, black 50px);
        mask: linear-gradient(to left, transparent 0%, black 50px);
      }

      &.left-arrow-fade {
        -webkit-mask: linear-gradient(to right, transparent 15px, black 50px);
        mask: linear-gradient(to right, transparent 15px, black 50px);
      }

      &.both-arrows-fade {
        -webkit-mask: linear-gradient(to right, transparent 15px, black 50px, black 90%, transparent 100%);
        mask: linear-gradient(to right, transparent 15px, black 50px, black 90%, transparent 100%);
      }

      &.ewc-tabs--scrolling {
        width: calc(100% - (2 * ${iconButtonWidth}px));
      }
    }

    &__items-scroll {
      display: flex;
      flex-direction: row;
      white-space: nowrap;
      width: 100%;
      overflow-x: auto;
      padding: ${tabsFocusPadding}px;
      height: ${tabsHeightWithFocus}px;
      -ms-overflow-style: none;
      scrollbar-width: none;
      &::-webkit-scrollbar {
        display: none;
      }
    }

    &__item {
      border: 0;
      padding: 0;
      background: transparent;
      &:focus {
        outline: 2px solid ${getColor('focus-outline')};
        outline-offset: 2px;
      }
      &:not(:last-of-type) {
        margin-right: 24px;
        @media screen and (max-width: 767px) {
          margin-right: 16px;
        }
      }

      .ewc-tabs__label {
        font-family: 'Red Hat Text', Verdana, sans-serif;
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: ${tabsLineHeight}px;
        letter-spacing: 0.8px;
        text-transform: uppercase;
        color: ${getColor('grey-80')};

        display: block;
        position: relative;
        border: none;
        padding: 0px 8px;
        background: transparent;
        height: ${tabsHeight}px;

        // Underline
        &::before {
          ${underline}
          width: 100%;
          background-color: ${getColor('grey-10')};
        }

        &::after {
          ${underline}
          display: block;
          width: 0;
          transition: all 0.3s ease-in-out;
        }

        &:hover {
          cursor: pointer;
          &:not(.ewc-tabs__label--selected)::after {
            background-color: ${getColor('green')};
            width: 100%;
          }
        }

        &.ewc-tabs__label--selected {
          text-shadow: 0 0 0 black, 0 0 0.5px black;
          color: black;

          &::after {
            background-color: ${getColor('green')};
            width: 100%;
          }
        }
      }
    }

    &--inverted {
      .ewc-tabs__label {
        color: white;
        &::before {
          background: ${getColor('grey-80')};
        }

        &.ewc-tabs__label--selected {
          text-shadow: 0 0 0 white, 0 0 0.5px white;
          color: white;

          &::after {
            background-color: ${getColor('green')};
            width: 100%;
          }
        }
      }
      .ewc-tabs__items {
        &::before {
          background-image: linear-gradient(to right, rgba(38, 38, 38, 1), rgba(38, 38, 38, 0.2));
        }
        &::after {
          background-image: linear-gradient(to left, rgba(38, 38, 38, 1), rgba(38, 38, 38, 0.2));
        }
      }
    }
  }
`;
