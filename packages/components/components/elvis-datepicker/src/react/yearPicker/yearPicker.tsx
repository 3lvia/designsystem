import React, { useEffect, useRef, useState } from 'react';
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

  useEffect(() => {
    const listClone = years.slice();
    listClone.forEach((year) => (year.isActive = year.year === selectedDate?.getFullYear()));
    const activeYearIndex = listClone.findIndex((year) => year.isActive);
    if (activeYearIndex !== -1) {
      scrollContainer.current?.scrollTo({ top: buttonHeight * (activeYearIndex - 1) });
    }
    setYears(listClone);
  }, [selectedDate]);

  return (
    <YearPickerContainer>
      <ScrollContainer ref={scrollContainer}>
        {years.map((year) => (
          <YearButton key={year.year} isActive={year.isActive} onClick={() => onYearChange(year.year)}>
            {year.year}
          </YearButton>
        ))}
      </ScrollContainer>
    </YearPickerContainer>
  );
};
