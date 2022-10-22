import { getColor } from '@elvia/elvis-colors';
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

const getDateRangeBackground = (piece: Partial<DateRangePiece>) => {
  return css`
    &:after {
      content: '';
      position: absolute;
      width: ${piece.isMiddle ? '100%' : 'calc(100% - 4px)'};
      height: calc(100% - 8px);
      z-index: -1;
      top: 4px;
      left: ${piece.isStart ? '4px' : '0px'};
      border-radius: ${getBorderRadius(piece)};
      background-color: ${getColor('grey-05')};
    }
  `;
};

interface Props {
  isOtherSelectedDate: boolean;
  isHoveredDate: boolean;
  isStartPiece: boolean;
  isMiddlePiece: boolean;
  isEndPiece: boolean;
  rangeIsValid: boolean;
}

export const DateRangeDayContainer = styled.div<Partial<Props>>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;

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
      ${DayButton}:not(:disabled) {
        border-color: ${getColor('elvia-off')};
      }
    `};
`;
