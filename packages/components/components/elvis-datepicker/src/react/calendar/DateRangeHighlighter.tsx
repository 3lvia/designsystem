import React from 'react';
import { dateIsWithinMinMaxBoundary, isSameDay } from '../dateHelpers';
import { DateRange } from '../elviaDatepicker.types';
import { DateRangeDayContainer } from './dateRangeStyles';

interface Props {
  date?: Date | null;
  dateRange?: DateRange;
  hoveredDate?: Date;
  whichPicker?: 'start' | 'end';
  isFocused?: boolean;
  disabled?: boolean;
  setHoveredDate: (d?: Date) => void;
  onClick: () => void;
}

export const DateRangeHighlighter: React.FC<Props> = ({
  date,
  dateRange,
  hoveredDate,
  whichPicker,
  isFocused,
  disabled,
  setHoveredDate,
  onClick,
  children,
}) => {
  const isBetweenDates = (): boolean => {
    const isBetweenSelectedDates = dateIsWithinMinMaxBoundary(date, dateRange?.start, dateRange?.end);
    return !!dateRange?.start && !!dateRange?.end && isBetweenSelectedDates;
  };

  const isOtherSelectedDate = (): boolean => {
    return (
      (whichPicker === 'start' && isSameDay(dateRange?.end, date)) ||
      (whichPicker === 'end' && isSameDay(dateRange?.start, date))
    );
  };

  const rangeIsValid = (): boolean => {
    return (
      !!dateRange?.start &&
      !!dateRange?.end &&
      (dateRange.start.getTime() < dateRange.end.getTime() || isSameDay(dateRange.start, dateRange.end))
    );
  };

  return (
    <DateRangeDayContainer
      isStartPiece={isSameDay(dateRange?.start, date)}
      isMiddlePiece={isBetweenDates()}
      isEndPiece={isSameDay(dateRange?.end, date)}
      isOtherSelectedDate={isOtherSelectedDate()}
      isHoveredDate={isSameDay(date, hoveredDate) && !!dateRange?.start}
      rangeIsValid={rangeIsValid()}
      onMouseEnter={() => date && setHoveredDate(date)}
      onMouseLeave={() => setHoveredDate(undefined)}
      invisible={!date}
      isFocused={isFocused}
      disabled={disabled}
      onClick={() => onClick()}
    >
      {children}
    </DateRangeDayContainer>
  );
};
