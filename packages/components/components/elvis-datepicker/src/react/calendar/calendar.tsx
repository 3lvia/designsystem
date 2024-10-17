import arrowLongLeftBold from '@elvia/elvis-assets-icons/dist/icons/arrowLongLeftBold';
import arrowLongRightBold from '@elvia/elvis-assets-icons/dist/icons/arrowLongRightBold';
import reset from '@elvia/elvis-assets-icons/dist/icons/reset';
import { IconButton, IconWrapper, LanguageCode } from '@elvia/elvis-toolbox';
import React, { KeyboardEvent, useEffect, useState } from 'react';

import {
  dateIsWithinMinMaxBoundary,
  formatDate,
  getDayName,
  getWeekDayNames,
  isSameDay,
} from '../dateHelpers';
import { DateRange, DatepickerRangeProps } from '../elviaDatepicker.types';
import { DateRangeHighlighter } from './DateRangeHighlighter';
import {
  CalendarHeader,
  Container,
  DayButton,
  DayName,
  GridContainer,
  MonthName,
  ResetButton,
} from './calendarStyles';

interface Props {
  selectedDate?: Date | null;
  viewedDate: Date;
  onDateChange: (newDate: Date, closeOverlay?: boolean) => void;
  setViewedDate: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  disableDate?: (date: Date) => boolean;
  resetDate: () => void;
  clearButtonText: string;
  dateRangeProps?: DatepickerRangeProps;
  lang: LanguageCode;
}

export const Calendar: React.FC<Props> = ({
  selectedDate,
  viewedDate,
  onDateChange,
  setViewedDate,
  minDate,
  maxDate,
  disableDate,
  resetDate,
  clearButtonText,
  dateRangeProps,
  lang,
}) => {
  const [calendarHasFocus, setCalendarHasFocus] = useState(false);
  const [hoveredDate, setHoveredDate] = useState<Date | undefined>();
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  const createListOfDays = (): Date[] => {
    const lastDayOfMonth = new Date(viewedDate.getFullYear(), viewedDate.getMonth() + 1, 0).getDate();
    const weekIndexOfFirstDayInMonth = getWeekDayNames(lang).findIndex((dayName) => {
      const firstDayOfMonth = getDayName(lang, new Date(viewedDate.getFullYear(), viewedDate.getMonth(), 1));
      return dayName === firstDayOfMonth;
    });

    const dayList = [
      ...new Array(weekIndexOfFirstDayInMonth).fill(null), // Padding to align dates with week days
      ...new Array(lastDayOfMonth).fill(null).map((_, index) => {
        return new Date(viewedDate.getFullYear(), viewedDate.getMonth(), index + 1, 0, 0, 0, 0);
      }),
    ];
    // Add rest of days as null to ensure there are always six rows of height in the calendar grid
    const lastDayPlaceholders = new Array(7 * 6 - dayList.length).fill(null);

    return [...dayList, ...lastDayPlaceholders];
  };

  const [daysInMonth, setDaysInMonth] = useState<(Date | null)[]>(createListOfDays);

  const shuffleViewedMonth = (dir: 1 | -1): void => {
    const newDate = new Date(viewedDate);
    newDate.setMonth(newDate.getMonth() + dir);
    setViewedDate(newDate);
  };

  const formatCalendarDay = (date?: Date | null): string => {
    const dateString = formatDate(lang, date, { day: 'numeric' });
    return dateString.replace('.', '');
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

  const labels =
    lang === 'no'
      ? {
          prevMonth: 'Forrige måned',
          nextMonth: 'Neste måned',
          calendarDescription: 'Kalender. Bruk piltaster for navigasjon.',
          resetDate: 'Nullstill dato',
        }
      : {
          prevMonth: 'Previous month',
          nextMonth: 'Next month',
          calendarDescription: 'Calendar. Use arrow keys for navigation.',
          resetDate: 'Reset date',
        };

  return (
    <Container>
      <CalendarHeader>
        <IconButton
          onClick={() => shuffleViewedMonth(-1)}
          aria-label={labels.prevMonth}
          data-testid="prev-month-btn"
          size="sm"
        >
          <IconWrapper icon={arrowLongLeftBold} size="xs" />
        </IconButton>
        <MonthName data-testid="month-name" aria-live="polite">
          {formatDate(lang, viewedDate, { month: 'long', year: 'numeric' })}
        </MonthName>
        <IconButton
          onClick={() => shuffleViewedMonth(1)}
          aria-label={labels.nextMonth}
          data-testid="next-month-btn"
          size="sm"
        >
          <IconWrapper icon={arrowLongRightBold} size="xs" />
        </IconButton>
      </CalendarHeader>
      <GridContainer>
        {getWeekDayNames(lang).map((dayName) => (
          <DayName key={dayName}>{dayName}</DayName>
        ))}
      </GridContainer>
      <GridContainer
        tabIndex={0}
        onKeyDown={(ev) => handleCalendarKeydown(ev)}
        onFocus={() => setCalendarHasFocus(true)}
        onBlur={() => setCalendarHasFocus(false)}
        aria-activedescendant={`date-${formatDate(lang, viewedDate, {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        })}`}
        aria-label={labels.calendarDescription}
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
            isFocused={isSameDay(lang, day, viewedDate) && calendarHasFocus}
            lang={lang}
          >
            <DayButton
              tabIndex={-1}
              aria-label={formatDate(lang, day, { day: 'numeric', month: 'long', year: 'numeric' })}
              isToday={isSameDay(lang, day, new Date())}
              isActive={isSameDay(lang, day, selectedDate)}
              disabled={dateIsDisabled(day)}
              type="button"
              aria-current={isSameDay(lang, day, selectedDate) ? 'date' : undefined}
              id={`date-${formatDate(lang, day, { day: '2-digit', month: '2-digit', year: 'numeric' })}`}
            >
              {formatCalendarDay(day)}
            </DayButton>
          </DateRangeHighlighter>
        ))}
      </GridContainer>
      <ResetButton onClick={resetDate} aria-label={labels.resetDate} size="sm">
        <IconWrapper icon={reset} size="xs" />
        {clearButtonText}
      </ResetButton>
    </Container>
  );
};
