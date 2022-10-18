import { Icon } from '@elvia/elvis-icon/react';
import React, { KeyboardEvent, useEffect, useState } from 'react';
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

  const getDayName = (date: Date): string => {
    return date.toLocaleDateString('nb-NO', { weekday: 'short' }).substring(0, 2);
  };

  const getDayNames = (): string[] => {
    const date = new Date(2022, 9, 10); // A monday
    return new Array(7).fill('').map(() => {
      const dayName = getDayName(date);
      date.setDate(date.getDate() + 1);
      return dayName;
    });
  };

  const createListOfDays = () => {
    const lastDayOfMonth = new Date(viewedDate.getFullYear(), viewedDate.getMonth() + 1, 0).getDate();
    const weekIndexOfFirstDayInMonth = getDayNames().findIndex((dayName) => {
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

  const isSameDay = (d1?: Date | null, d2?: Date | null): boolean => {
    if (!d1 || !d2) {
      return false;
    }

    return (
      `${d1.getFullYear()}${d1.getMonth()}${d1.getDate()}` ===
      `${d2.getFullYear()}${d2.getMonth()}${d2.getDate()}`
    );
  };

  const shuffleViewedMonth = (dir: 1 | -1): void => {
    const newDate = new Date(viewedDate);
    newDate.setMonth(newDate.getMonth() + dir);
    setViewedDate(newDate);
  };

  const formatDate = (date?: Date | null): string => {
    if (!date) {
      return '';
    }

    const dateString = date.toLocaleString('nb-NO', { day: 'numeric' });
    return dateString.substring(0, dateString.length - 1);
  };

  function updateViewedDate(event: KeyboardEvent<HTMLDivElement>) {
    let jumpInDays = 0;

    switch (event.key) {
      case 'ArrowRight': {
        jumpInDays = 1;
        break;
      }
      case 'ArrowLeft': {
        jumpInDays = -1;
        break;
      }
      case 'ArrowUp': {
        jumpInDays = -7;
        break;
      }
      case 'ArrowDown': {
        jumpInDays = 7;
        break;
      }
    }

    if (jumpInDays !== 0) {
      const newDate = new Date(viewedDate ? viewedDate : new Date());
      newDate.setDate(newDate.getDate() + jumpInDays);
      setViewedDate(newDate);
    }
  }

  const handleCalendarKeydown = (event: KeyboardEvent<HTMLDivElement>): void => {
    event.preventDefault();
    if (event.key === 'Enter' && !dateIsDisabled(viewedDate)) {
      onDateChange(new Date(viewedDate || new Date()));
    } else {
      updateViewedDate(event);
    }
  };

  const dateIsDisabled = (date: Date): boolean => {
    const dateIsAfterMinDate = !minDate || date.getTime() >= minDate.getTime();
    const dateIsBeforeMaxDate = !maxDate || date.getTime() <= maxDate.getTime();
    const disableDateMethodExcludesDate = !!disableDate && disableDate(date);
    return !dateIsAfterMinDate || !dateIsBeforeMaxDate || disableDateMethodExcludesDate;
  };

  useEffect(() => {
    setDayNames(getDayNames());
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
        <IconButton onClick={() => shuffleViewedMonth(-1)}>
          <Icon name="arrowLongLeftBold" size="xs" />
        </IconButton>
        <MonthName>{viewedDate.toLocaleString('nb-NO', { month: 'long' })}</MonthName>
        <IconButton onClick={() => shuffleViewedMonth(1)}>
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
      >
        {daysInMonth.map((day, index) => (
          <DayButton
            key={index}
            invisible={!day}
            tabIndex={-1}
            aria-label={day?.toLocaleString('nb-NO', { day: 'numeric', month: 'long', year: 'numeric' })}
            isToday={isSameDay(day, new Date())}
            isActive={isSameDay(day, selectedDate)}
            isFocused={isSameDay(day, viewedDate) && calendarHasFocus}
            disabled={!day || dateIsDisabled(day)}
            onClick={() => day && onDateChange(day, true)}
          >
            {formatDate(day)}
          </DayButton>
        ))}
      </GridContainer>
    </CalendarContainer>
  );
};
