import { getThemeColor } from '@elvia/elvis-colors';
import styled, { css } from 'styled-components';
import { DayButton } from './calendarStyles';

interface DateRangePiece {
  isStart: boolean;
  isMiddle: boolean;
  isEnd: boolean;
}

const getBorderRadius = (piece: Partial<DateRangePiece>) => {
  if (piece.isStart && piece.isEnd) {
    return '999px';
  } else if (piece.isStart) {
    return '999px 0 0 999px';
  } else if (piece.isEnd) {
    return '0 999px 999px 0';
  } else {
    return '0px';
  }
};

const getWidth = (piece: Partial<DateRangePiece>) => {
  if (piece.isStart && piece.isEnd) {
    return 'calc(100% - 8px)';
  } else if (piece.isStart || piece.isEnd) {
    return 'calc(100% - 4px)';
  } else {
    return '100%';
  }
};

const getDateRangeBackground = (piece: Partial<DateRangePiece>) => {
  return css`
    &:after {
      content: '';
      position: absolute;
      width: ${getWidth(piece)};
      height: calc(100% - 8px);
      z-index: -1;
      top: 4px;
      left: ${piece.isStart ? '4px' : '0px'};
      border-radius: ${getBorderRadius(piece)};
      background-color: ${getThemeColor('background-hover-2')};
    }
  `;
};

interface Props {
  invisible: boolean;
  isFocused: boolean;
  isOtherSelectedDate: boolean;
  isHoveredDate: boolean;
  isStartPiece: boolean;
  isMiddlePiece: boolean;
  isEndPiece: boolean;
  rangeIsValid: boolean;
  disabled: boolean;
}

export const DateRangeDayContainer = styled.div<Partial<Props>>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  isolation: isolate;

  ${(props) => {
    if (!props.invisible && !props.disabled) {
      return css`
        cursor: pointer;

        &:hover ${DayButton} {
          border-color: ${getThemeColor('border-hover-1')};
        }

        ${DayButton} {
          border-color: ${props.isFocused ? getThemeColor('border-selected-1') : 'transparent'};
        }
      `;
    }

    return css`
      cursor: default;
    `;
  }};

  ${(props) => {
    if (!props.rangeIsValid || !(props.isStartPiece || props.isMiddlePiece || props.isEndPiece)) {
      return '';
    }

    return getDateRangeBackground({
      isStart: props.isStartPiece,
      isMiddle: props.isMiddlePiece,
      isEnd: props.isEndPiece,
    });
  }};

  ${(props) =>
    props.isOtherSelectedDate &&
    css`
      ${DayButton} {
        border-color: ${getThemeColor('text-1')};
      }
    `};
`;
