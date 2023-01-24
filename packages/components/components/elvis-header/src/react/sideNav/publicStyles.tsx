import { getColor } from '@elvia/elvis-colors';
import { getTypographyCss } from '@elvia/elvis-typography';
import { css, FlattenInterpolation, ThemeProps } from 'styled-components';

export const publicStyles = (isGtMobile: boolean): FlattenInterpolation<ThemeProps<any>> => {
  return css`
    .e-sidenav__container {
      display: flex;
      justify-content: space-evenly;
      flex-direction: row;
      gap: 1rem;

      ${() => {
        if (isGtMobile) {
          return css`
            flex-direction: column;
            gap: 1.5rem;
          `;
        }

        return css``;
      }}
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
        border: 1px solid ${getColor('green')};
      }
    }

    .e-sidenav__item-text {
      ${() =>
        isGtMobile
          ? css`
              display: inline-block;
            `
          : css`
              display: none;
            `}
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

      i[class*='color'] {
        display: none;
      }
    }

    .e-sidenav__item--active {
      .e-sidenav__icon-container {
        border-color: ${getColor('elvia-off')};

        i {
          display: none;
        }

        i[class*='color'] {
          display: initial;
        }
      }
    }
  `;
};
