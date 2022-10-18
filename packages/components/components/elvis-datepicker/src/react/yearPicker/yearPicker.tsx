import React, { KeyboardEvent, useEffect, useRef, useState } from 'react';
import { buttonHeight, ScrollContainer, YearButton, YearPickerContainer } from './yearPickerStyles';

interface Props {
  selectedDate?: Date | null;
  onYearChange: (year: number) => void;
}

interface Year {
  year: number;
  isActive: boolean;
}

export const YearPicker: React.FC<Props> = ({ selectedDate, onYearChange }) => {
  const scrollContainer = useRef<HTMLDivElement>(null);
  const [years, setYears] = useState(
    new Array(150).fill('').map((_, index) => {
      const year: Year = { year: 1950 + index, isActive: false };
      return year;
    }),
  );
  const [focusedYearIndex, setFocusedYearIndex] = useState<number>(0);

  const scrollToActiveButton = (scrollToIndex: number): void => {
    scrollContainer.current?.scrollTo({ top: buttonHeight * (scrollToIndex - 1) });
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    switch (event.key) {
      case 'ArrowUp': {
        const newIndex = focusedYearIndex - 1;
        if (newIndex >= 0) {
          setFocusedYearIndex(newIndex);
          scrollToActiveButton(newIndex);
        }
        event.preventDefault();
        break;
      }
      case 'ArrowDown': {
        const newIndex = focusedYearIndex + 1;
        if (newIndex <= years.length - 1) {
          setFocusedYearIndex(newIndex);
          scrollToActiveButton(newIndex);
        }
        event.preventDefault();
        break;
      }
      case 'Enter': {
        onYearChange(years[focusedYearIndex].year);
        event.preventDefault();
        break;
      }
    }
  };

  useEffect(() => {
    const setActiveYear = () => {
      const listClone = years.slice();
      listClone.forEach((year) => (year.isActive = year.year === selectedDate?.getFullYear()));
      const activeYearIndex = listClone.findIndex((year) => year.isActive);
      if (activeYearIndex !== -1) {
        setFocusedYearIndex(activeYearIndex);
        scrollToActiveButton(activeYearIndex);
      }
      setYears(listClone);
    };

    if (selectedDate) {
      console.log('foo');
      setActiveYear();
    }
  }, [selectedDate]);

  return (
    <YearPickerContainer>
      <ScrollContainer ref={scrollContainer} tabIndex={0} onKeyDown={handleKeyDown}>
        {years.map((year, index) => (
          <YearButton
            tabIndex={-1}
            key={year.year}
            isActive={year.isActive}
            isFocused={focusedYearIndex === index}
            onClick={() => onYearChange(year.year)}
          >
            {year.year}
          </YearButton>
        ))}
      </ScrollContainer>
    </YearPickerContainer>
  );
};
