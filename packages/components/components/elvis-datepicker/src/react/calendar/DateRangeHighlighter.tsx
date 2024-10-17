import { LanguageCode } from '@elvia/elvis-toolbox';
import React, { useMemo } from 'react';

import { dateIsWithinMinMaxBoundary, isSameDay } from '../dateHelpers';
import { DateRange } from '../elviaDatepicker.types';
import { DateRangeDayContainer } from './dateRangeStyles';

interface Props {
  lang: LanguageCode;
  date?: Date | null;
  dateRange?: DateRange;
  hoveredDate?: Date;
  whichPicker?: 'start' | 'end';
  isFocused?: boolean;
  disabled?: boolean;
  setHoveredDate: (d?: Date) => void;
  onClick: () => void;
  children?: React.ReactNode;
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
  lang,
}) => {
  const isStartDate = useMemo(() => isSameDay(lang, dateRange?.start, date), [dateRange, date]);

  const isEndDate = useMemo(() => isSameDay(lang, dateRange?.end, date), [dateRange, date]);

  const isBetweenDates = () => {
    const isBetweenSelectedDates = dateIsWithinMinMaxBoundary(date, dateRange?.start, dateRange?.end);
    return !!date && !!dateRange?.start && !!dateRange?.end && isBetweenSelectedDates;
  };

  const isOtherSelectedDate = () =>
    (whichPicker === 'start' && isEndDate) || (whichPicker === 'end' && isStartDate);

  const rangeIsValid = () => {
    return (
      !!dateRange?.start &&
      !!dateRange?.end &&
      (dateRange.start.getTime() < dateRange.end.getTime() || isSameDay(lang, dateRange.start, dateRange.end))
    );
  };

  return (
    <DateRangeDayContainer
      isStartPiece={isStartDate}
      isMiddlePiece={isBetweenDates()}
      isEndPiece={isEndDate}
      isOtherSelectedDate={isOtherSelectedDate()}
      isHoveredDate={isSameDay(lang, date, hoveredDate) && !!dateRange?.start}
      rangeIsValid={rangeIsValid()}
      onMouseEnter={() => date && !disabled && setHoveredDate(date)}
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
