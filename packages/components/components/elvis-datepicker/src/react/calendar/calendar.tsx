import { Icon } from '@elvia/elvis-icon/react';
import React, { KeyboardEvent, useEffect, useState } from 'react';
import {
  dateIsWithinMinMaxBoundary,
  formatDate,
  getDayName,
  getWeekDayNames,
  isSameDay,
} from '../dateHelpers';
import { IconButton } from '../styledComponents';
import {
  CalendarContainer,
  CalendarHeader,
  DayButton,
  DayName,
  GridContainer,
  MonthName,
} from './calendarStyles';

interface Props {
  selectedDate?: Date | null;
  viewedDate: Date;
  onDateChange: (newDate: Date, closeOverlay?: boolean) => void;
  setViewedDate: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  disableDate?: (date: Date) => boolean;
}

export const Calendar: React.FC<Props> = ({
  selectedDate,
  viewedDate,
  onDateChange,
  setViewedDate,
  minDate,
  maxDate,
  disableDate,
}) => {
  const [dayNames, setDayNames] = useState<string[]>([]);
  const [daysInMonth, setDaysInMonth] = useState<(Date | null)[]>([]);
  const [calendarHasFocus, setCalendarHasFocus] = useState(false);

  const createListOfDays = () => {
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
    setDaysInMonth(dayList);
  };

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

  const dateIsDisabled = (date: Date): boolean => {
    const disableDateMethodExcludesDate = !!disableDate && disableDate(date);
    return !dateIsWithinMinMaxBoundary(date, minDate, maxDate) || disableDateMethodExcludesDate;
  };

  useEffect(() => {
    setDayNames(getWeekDayNames());
    createListOfDays();
  }, []);

  useEffect(() => {
    if (selectedDate) {
      setViewedDate(selectedDate);
    }
  }, [selectedDate]);

  useEffect(createListOfDays, [viewedDate]);

  return (
    <CalendarContainer>
      <CalendarHeader>
        <IconButton onClick={() => shuffleViewedMonth(-1)} aria-label="Forrige måned">
          <Icon name="arrowLongLeftBold" size="xs" />
        </IconButton>
        <MonthName>{formatDate(viewedDate, { month: 'long', year: 'numeric' })}</MonthName>
        <IconButton onClick={() => shuffleViewedMonth(1)} aria-label="Neste måned">
          <Icon name="arrowLongRightBold" size="xs" />
        </IconButton>
      </CalendarHeader>
      <GridContainer>
        {dayNames.map((dayName) => (
          <DayName key={dayName}>{dayName}</DayName>
        ))}
      </GridContainer>
      <GridContainer
        tabIndex={0}
        onKeyDown={(ev) => handleCalendarKeydown(ev)}
        onFocus={() => setCalendarHasFocus(true)}
        onBlur={() => setCalendarHasFocus(false)}
        role="grid"
        aria-activedescendant={`date-${selectedDate?.getTime()}`}
        aria-colcount={7}
        aria-rowcount={Math.ceil(daysInMonth.length / 7)}
        aria-live="assertive"
      >
        {daysInMonth.map((day, index) => (
          <DayButton
            key={index}
            invisible={!day}
            tabIndex={-1}
            aria-label={formatDate(day, { day: 'numeric', month: 'long', year: 'numeric' })}
            isToday={isSameDay(day, new Date())}
            isActive={isSameDay(day, selectedDate)}
            isFocused={isSameDay(day, viewedDate) && calendarHasFocus}
            disabled={!day || dateIsDisabled(day)}
            onClick={() => day && onDateChange(day, true)}
            role="gridcell"
            type="button"
            aria-current={isSameDay(day, selectedDate) ? 'date' : undefined}
            id={`date-${day?.getTime()}`}
          >
            {formatCalendarDay(day)}
          </DayButton>
        ))}
      </GridContainer>
    </CalendarContainer>
  );
};
