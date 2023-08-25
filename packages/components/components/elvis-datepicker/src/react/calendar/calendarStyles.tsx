import { getThemeColor, getThemeColorContrast } from '@elvia/elvis-colors';
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
  margin: 0 -4px; // Pull out on sides to account for 40px wide button container

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
  color: ${getThemeColor('text-placeholder-1')};
  text-align: center;
`;

interface DayButtonProps {
  isActive: boolean;
  isToday: boolean;
}

export const DayButton = styled.button<Partial<DayButtonProps>>`
  ${getTypographyCss('text-sm')};
  width: 2rem;
  height: 2rem;
  border-radius: 999px;
  border: 1px solid transparent;
  background: transparent;
  padding: 0;
  position: relative;
  cursor: inherit;

  &:disabled {
    color: ${getThemeColor('text-disabled-1')};

    &::after {
      background-color: ${getThemeColor('background-disabled-1')};
    }
  }

  ${(props) =>
    props.isActive &&
    css`
      color: ${getThemeColorContrast('background-selected-1')};
      background-color: ${getThemeColor('background-selected-1')};
      font-weight: 500;
    `}

  ${(props) =>
    props.isToday &&
    css`
      &::after {
        content: '';
        position: absolute;
        width: 4px;
        height: 4px;
        background-color: ${getThemeColor('background-selected-1')};
        bottom: 0;
        border-radius: 50%;
        left: 50%;
        transform: translateX(-50%);
      }
    `};
`;
