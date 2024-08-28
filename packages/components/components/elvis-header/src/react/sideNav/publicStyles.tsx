import { getThemeColor } from '@elvia/elvis-colors';
import { getTypographyCss } from '@elvia/elvis-typography';
import { css } from '@emotion/react';

export const publicStyles = (isGtMobile: boolean) => {
  return css`
    .e-sidenav__container {
      color: ${getThemeColor('text-1')};
      display: flex;
      justify-content: space-evenly;
      flex-direction: row;
      gap: 1rem;

      ${isGtMobile &&
      css`
        flex-direction: column;
        gap: 1.5rem;
      `}
    }

    .e-sidenav__item {
      ${getTypographyCss('text-md')}
      text-decoration: none;
      white-space: nowrap;
      color: inherit;
      background: transparent;
      border: none;
      padding: 0;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 1rem;

      &:hover .e-sidenav__icon-container {
        border: 1px solid ${getThemeColor('border-hover-1')};
      }
    }

    .e-sidenav__item-text {
      ${isGtMobile ? 'display: inline-block;' : 'display: none;'}
    }

    .e-sidenav__icon-container {
      height: 48px;
      width: 48px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex: none;
      border: 1px solid transparent;

      i[class*='color'],
      e-icon[name*='color' i] {
        display: none;
      }
    }

    .e-sidenav__item--active {
      .e-sidenav__icon-container {
        border-color: ${getThemeColor('border-1')};

        i,
        e-icon {
          display: none;
        }

        i[class*='color'],
        e-icon[name*='color' i] {
          display: initial;
        }
      }
    }
  `;
};
