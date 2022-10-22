import { getColor } from '@elvia/elvis-colors';
import { getTypographyCss } from '@elvia/elvis-typography';
import styled, { css } from 'styled-components';

export const Container = styled.div`
  padding: 0 16px;
`;

export const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
`;

export const MonthName = styled.span`
  ${getTypographyCss('text-sm-strong')};
  text-align: center;
  text-transform: capitalize;
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-auto-rows: 1fr;

  /** This ensures that all tiles are square */
  &:before {
    content: '';
    width: 0;
    padding-bottom: 100%;
    grid-row: 1 / 1;
    grid-column: 1 / 1;
  }

  *:first-child {
    grid-row: 1 / 1;
    grid-column: 1 / 1;
  }
`;

export const DayName = styled.div`
  ${getTypographyCss('text-sm')};
  color: ${getColor('placeholder')};
  text-align: center;
`;

interface DayButtonProps {
  isActive: boolean;
  isFocused: boolean;
  isToday: boolean;
  invisible?: boolean;
}

export const DayButton = styled.button<Partial<DayButtonProps>>`
  ${getTypographyCss('text-sm')};
  color: ${getColor('text')};
  width: 2rem;
  height: 2rem;
  border-radius: 999px;
  border: 1px solid transparent;
  background: transparent;
  padding: 0;
  position: relative;

  &:disabled {
    color: ${getColor('disabled')};

    &::after {
      background-color: ${getColor('disabled')};
    }
  }

  ${(props) =>
    props.isActive &&
    css`
      background-color: ${getColor('elvia-charge')};
      font-weight: 500;
    `}

  ${(props) => {
    if (!props.invisible) {
      return css`
        &:not(:disabled) {
          cursor: pointer;
          border-color: ${props.isFocused ? getColor('elvia-charge') : 'transparent'};

          &:hover {
            border-color: ${getColor('elvia-charge')};
          }
        }
      `;
    }

    return css`
      cursor: default;
    `;
  }};

  ${(props) =>
    props.isToday &&
    css`
      &::after {
        content: '';
        position: absolute;
        width: 4px;
        height: 4px;
        background-color: ${getColor('elvia-charge')};
        bottom: 0;
        border-radius: 50%;
        left: 50%;
        transform: translateX(-50%);
      }
    `};
`;
