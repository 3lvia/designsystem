import React, { KeyboardEvent, useEffect, useRef, useState } from 'react';
import { buttonHeight, ScrollContainer, YearButton, YearPickerContainer } from './yearPickerStyles';

interface Props {
  selectedDate?: Date | null;
  onYearChange: (year: number) => void;
  minDate?: Date;
  maxDate?: Date;
}

interface Year {
  year: number;
  isActive: boolean;
  isDisabled: boolean;
}

export const YearPicker: React.FC<Props> = ({ selectedDate, onYearChange, minDate, maxDate }) => {
  const scrollContainer = useRef<HTMLDivElement>(null);
  const [years, setYears] = useState(
    new Array(150).fill('').map((_, index) => {
      const year: Year = { year: 1950 + index, isActive: false, isDisabled: false };
      return year;
    }),
  );
  const [focusedYearIndex, setFocusedYearIndex] = useState<number>(0);

  const scrollToActiveButton = (scrollToIndex: number): void => {
    scrollContainer.current?.scrollTo({ top: buttonHeight * (scrollToIndex - 1) });
  };

  const getNewIndex = (event: KeyboardEvent<HTMLDivElement>): number => {
    let newIndex = focusedYearIndex;
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (focusedYearIndex - 1 >= 0) {
        newIndex = focusedYearIndex - 1;
      }
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (focusedYearIndex + 1 <= years.length - 1) {
        newIndex = focusedYearIndex + 1;
      }
    }

    while (newIndex > 0 && newIndex < years.length - 1 && years[newIndex].isDisabled) {
      newIndex > 0 ? newIndex++ : newIndex--;
    }

    return newIndex;
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      onYearChange(years[focusedYearIndex].year);
    } else {
      const newYearIndex = getNewIndex(event);

      if (!years[newYearIndex].isDisabled) {
        setFocusedYearIndex(newYearIndex);
        scrollToActiveButton(newYearIndex);
      }
    }
  };

  const yearIsWithinMinMaxBoundary = (year: number): boolean => {
    const yearIsAfterMinDate = !minDate || year >= minDate.getFullYear();
    const yearIsBeforeMaxDate = !maxDate || year <= maxDate.getFullYear();

    return yearIsAfterMinDate && yearIsBeforeMaxDate;
  };

  useEffect(() => {
    const setActiveYear = () => {
      const listClone = years.slice();
      const selectedYear = selectedDate ? selectedDate?.getFullYear() : new Date().getFullYear();
      listClone.forEach((year) => (year.isActive = year.year === selectedYear));
      const activeYearIndex = listClone.findIndex((year) => year.isActive);
      if (activeYearIndex !== -1) {
        setFocusedYearIndex(activeYearIndex);
        scrollToActiveButton(activeYearIndex);
      }
      setYears(listClone);
    };

    setActiveYear();
  }, [selectedDate]);

  useEffect(() => {
    const yearClone = years.slice();
    yearClone.forEach((year) => (year.isDisabled = !yearIsWithinMinMaxBoundary(year.year)));
  }, [minDate, maxDate]);

  return (
    <YearPickerContainer data-testid="year-picker">
      <ScrollContainer ref={scrollContainer} tabIndex={0} onKeyDown={handleKeyDown}>
        {years.map((year, index) => (
          <YearButton
            tabIndex={-1}
            key={year.year}
            $isActive={year.isActive}
            $isFocused={focusedYearIndex === index}
            onClick={() => onYearChange(year.year)}
            disabled={year.isDisabled}
          >
            {year.year}
          </YearButton>
        ))}
      </ScrollContainer>
    </YearPickerContainer>
  );
};
