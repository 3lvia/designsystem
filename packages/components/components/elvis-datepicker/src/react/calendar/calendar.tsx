import React, { KeyboardEvent, useEffect, useState } from 'react';
import {
  dateIsWithinMinMaxBoundary,
  formatDate,
  getDayName,
  getWeekDayNames,
  isSameDay,
} from '../dateHelpers';
import { DatepickerRangeProps, DateRange } from '../elviaDatepicker.types';

import { Container, CalendarHeader, DayButton, DayName, GridContainer, MonthName } from './calendarStyles';
import { DateRangeHighlighter } from './DateRangeHighlighter';
import { IconButton, IconWrapper } from '@elvia/elvis-toolbox';
import arrowLongLeftBold from '@elvia/elvis-assets-icons/dist/icons/arrowLongLeftBold';
import arrowLongRightBold from '@elvia/elvis-assets-icons/dist/icons/arrowLongRightBold';

interface Props {
  selectedDate?: Date | null;
  viewedDate: Date;
  onDateChange: (newDate: Date, closeOverlay?: boolean) => void;
  setViewedDate: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  disableDate?: (date: Date) => boolean;
  dateRangeProps?: DatepickerRangeProps;
}

export const Calendar: React.FC<Props> = ({
  selectedDate,
  viewedDate,
  onDateChange,
  setViewedDate,
  minDate,
  maxDate,
  disableDate,
  dateRangeProps,
}) => {
  const [calendarHasFocus, setCalendarHasFocus] = useState(false);
  const [hoveredDate, setHoveredDate] = useState<Date | undefined>();
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  const createListOfDays = (): Date[] => {
    const lastDayOfMonth = new Date(viewedDate.getFullYear(), viewedDate.getMonth() + 1, 0).getDate();
    const weekIndexOfFirstDayInMonth = getWeekDayNames().findIndex((dayName) => {
      const firstDayOfMonth = getDayName(new Date(viewedDate.getFullYear(), viewedDate.getMonth(), 1));
      return dayName === firstDayOfMonth;
    });

    const dayList = [
      ...new Array(weekIndexOfFirstDayInMonth).fill(null), // Padding to align dates with week days
      ...new Array(lastDayOfMonth).fill(null).map((_, index) => {
        return new Date(viewedDate.getFullYear(), viewedDate.getMonth(), index + 1, 0, 0, 0, 0);
      }),
    ];

    return dayList;
  };

  const [daysInMonth, setDaysInMonth] = useState<(Date | null)[]>(createListOfDays);

  const shuffleViewedMonth = (dir: 1 | -1): void => {
    const newDate = new Date(viewedDate);
    newDate.setMonth(newDate.getMonth() + dir);
    setViewedDate(newDate);
  };

  const formatCalendarDay = (date?: Date | null): string => {
    const dateString = formatDate(date, { day: 'numeric' });
    return dateString.substring(0, dateString.length - 1);
  };

  const getNumberOfDaysToJump = (event: KeyboardEvent<HTMLDivElement>): number => {
    let jumpInDays = 0;

    if (event.key === 'ArrowRight') {
      jumpInDays = 1;
    } else if (event.key === 'ArrowLeft') {
      jumpInDays = -1;
    } else if (event.key === 'ArrowUp') {
      jumpInDays = -7;
    } else if (event.key === 'ArrowDown') {
      jumpInDays = 7;
    }

    return jumpInDays;
  };

  const updateViewedDate = (event: KeyboardEvent<HTMLDivElement>) => {
    const daysToJump = getNumberOfDaysToJump(event);

    if (daysToJump !== 0) {
      event.preventDefault();
      const newDate = new Date(viewedDate ? viewedDate : new Date());
      newDate.setDate(newDate.getDate() + daysToJump);

      while (dateIsWithinMinMaxBoundary(newDate, minDate, maxDate) && dateIsDisabled(newDate)) {
        newDate.setDate(newDate.getDate() + daysToJump);
      }

      if (!dateIsDisabled(newDate)) {
        setViewedDate(newDate);
        setHoveredDate(newDate);
      }
    }
  };

  const handleCalendarKeydown = (event: KeyboardEvent<HTMLDivElement>): void => {
    if ((event.key === 'Enter' || event.key === 'Space') && !dateIsDisabled(viewedDate)) {
      event.preventDefault();
      onDateChange(new Date(viewedDate || new Date()));
    } else {
      updateViewedDate(event);
    }
  };

  const dateIsDisabled = (date: Date | null): boolean => {
    if (!date) {
      return true;
    }

    const disableDateMethodExcludesDate = !!disableDate && disableDate(date);
    return !dateIsWithinMinMaxBoundary(date, minDate, maxDate) || disableDateMethodExcludesDate;
  };

  useEffect(() => setDaysInMonth(createListOfDays()), [viewedDate]);

  // Destructure dateRangeProps for cleaner code
  useEffect(() => {
    setDateRange(dateRangeProps?.selectedDateRange);
  }, [dateRangeProps]);

  useEffect(() => {
    if (hoveredDate && dateRange) {
      if (dateRangeProps?.whichRangePicker === 'start') {
        setDateRange({ start: hoveredDate, end: dateRange.end });
      } else if (dateRangeProps?.whichRangePicker === 'end') {
        setDateRange({ start: dateRange.start, end: hoveredDate });
      }
    } else {
      setDateRange(dateRangeProps?.selectedDateRange);
    }
  }, [hoveredDate]);

  return (
    <Container>
      <CalendarHeader>
        <IconButton
          onClick={() => shuffleViewedMonth(-1)}
          aria-label="Forrige måned"
          data-testid="prev-month-btn"
          $size="sm"
        >
          <IconWrapper icon={arrowLongLeftBold} size="xs" />
        </IconButton>
        <MonthName data-testid="month-name" aria-live="polite">
          {formatDate(viewedDate, { month: 'long', year: 'numeric' })}
        </MonthName>
        <IconButton
          onClick={() => shuffleViewedMonth(1)}
          aria-label="Neste måned"
          data-testid="next-month-btn"
          $size="sm"
        >
          <IconWrapper icon={arrowLongRightBold} size="xs" />
        </IconButton>
      </CalendarHeader>
      <GridContainer>
        {getWeekDayNames().map((dayName) => (
          <DayName key={dayName}>{dayName}</DayName>
        ))}
      </GridContainer>
      <GridContainer
        tabIndex={0}
        onKeyDown={(ev) => handleCalendarKeydown(ev)}
        onFocus={() => setCalendarHasFocus(true)}
        onBlur={() => setCalendarHasFocus(false)}
        aria-activedescendant={`date-${formatDate(viewedDate, {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        })}`}
        aria-label="Kalender. Bruk piltaster for navigasjon."
      >
        {daysInMonth.map((day, index) => (
          <DateRangeHighlighter
            key={index}
            setHoveredDate={(date) => {
              if (date) {
                setViewedDate(date);
              }
              setHoveredDate(date);
            }}
            date={day}
            dateRange={dateRange}
            whichPicker={dateRangeProps?.whichRangePicker}
            hoveredDate={hoveredDate}
            disabled={dateIsDisabled(day)}
            onClick={() => day && !dateIsDisabled(day) && onDateChange(day, true)}
            isFocused={isSameDay(day, viewedDate) && calendarHasFocus}
          >
            <DayButton
              tabIndex={-1}
              aria-label={formatDate(day, { day: 'numeric', month: 'long', year: 'numeric' })}
              $isToday={isSameDay(day, new Date())}
              $isActive={isSameDay(day, selectedDate)}
              disabled={dateIsDisabled(day)}
              type="button"
              aria-current={isSameDay(day, selectedDate) ? 'date' : undefined}
              id={`date-${formatDate(day, { day: '2-digit', month: '2-digit', year: 'numeric' })}`}
            >
              {formatCalendarDay(day)}
            </DayButton>
          </DateRangeHighlighter>
        ))}
      </GridContainer>
    </Container>
  );
};
