import { getColor } from '@elvia/elvis-colors';
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
      font-family: 'Red Hat Text', Verdana, sans-serif;
      font-size: 16px;
      font-weight: 400;
      line-height: 28px;
      letter-spacing: unset;
      font-style: unset;
      text-transform: unset;
      text-decoration: none;
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

    .e-sidenav__icon-container {
      height: 48px;
      width: 48px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex: none;
      border: 1px solid transparent;
    }

    .e-sidenav__item--active {
      .e-sidenav__icon-container {
        border-color: ${getColor('elvia-off')};
      }
    }
  `;
};
