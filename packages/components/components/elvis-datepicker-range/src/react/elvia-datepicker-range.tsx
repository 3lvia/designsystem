import React, { FC, MouseEvent, useEffect, useState } from 'react';
import { Datepicker } from '@elvia/elvis-datepicker/react';
import { DatepickerRangeWrapper } from './styledComponents';
import { ElvisComponentWrapper } from '@elvia/elvis-component-wrapper/src/elvia-component';

export interface DateRange {
  start: Date | null;
  end: Date | null;
}

const emptyDateRange: DateRange = {
  start: null,
  end: null,
};

export interface DatepickerRangeProps {
  isCompact?: boolean;
  value?: DateRange;
  valueOnChange?: (value: DateRange) => void;
  webcomponent?: ElvisComponentWrapper;
}

export const DatepickerRange: FC<DatepickerRangeProps> = ({
  isCompact,
  value,
  valueOnChange,
  webcomponent,
}) => {
  const [hoveredDateRange, setHoveredDateRange] = useState<DateRange>(value ?? emptyDateRange);
  const [selectedDateRange, setSelectedDateRange] = useState<DateRange>(value ?? emptyDateRange);
  const [endDatepickerIsOpen, setEndDatepickerIsOpen] = useState(false);

  useEffect(() => {
    if (!webcomponent) {
      valueOnChange?.(selectedDateRange);
    } else {
      webcomponent.setProps({ value: selectedDateRange }, true);
    }
  }, [selectedDateRange]);

  useEffect(() => {
    if (value) {
      setSelectedDateRange(value);
    }
  }, [value]);

  // const handleSelectedDateRangeChange = (value: DateRange) => {
  //   if (isEqual(value, selectedDateRange)) {
  //     return;
  //   }
  //   setSelectedDateRange(value);

  //   if (!webcomponent) {
  //     valueOnChange?.(selectedDateRange);
  //   } else {
  //     webcomponent.setProps({ value: selectedDateRange }, true);
  //   }
  // };

  /**
   * Handles events fired when one of the day elements inside the datepicker is hovered. This is used to add the grey "selected date range"-background.
   * @param event The event that was fired.
   * @param day The hovered day.
   */
  const handleEndDatepickerMouseOver = (
    event: MouseEvent<HTMLButtonElement> & { target: { classList: DOMTokenList; innerText: string } },
    day: Date,
  ) => {
    const eventTargetIsDayElementInCalendar = event.target.classList.contains('ewc-datepicker__day');

    if (eventTargetIsDayElementInCalendar) {
      setHoveredDateRange((current) => {
        if (current.start) {
          return {
            ...current,
            end: new Date(day),
          };
        } else {
          return current;
        }
      });
    }
  };

  const handleEndDatepickerPopoverMouseOver = (
    event: MouseEvent<HTMLDivElement> & { target: { classList: DOMTokenList; innerText: string } },
  ) => {
    const eventTargetIsDayElementInCalendar = event.target.classList.contains('ewc-datepicker__day');

    if (eventTargetIsDayElementInCalendar) {
      return;
    } else if (selectedDateRange.end) {
      setHoveredDateRange((current) => {
        if (current.start) {
          return {
            ...current,
            end: selectedDateRange.end,
          };
        } else {
          return current;
        }
      });
    } else {
      setHoveredDateRange((current) => {
        if (current.start) {
          return {
            ...current,
            end: null,
          };
        } else {
          return current;
        }
      });
    }
  };

  const handleStartDatepickerValueOnChange = (value: Date | null) => {
    setHoveredDateRange((current) => {
      return { ...current, start: value };
    });
    setSelectedDateRange((current) => {
      return { ...current, start: value };
    });
  };

  return (
    <DatepickerRangeWrapper>
      <Datepicker
        label="Fra dato"
        isCompact={isCompact}
        hasSelectDateOnOpen={false}
        value={selectedDateRange.start}
        valueOnChange={handleStartDatepickerValueOnChange}
        onClose={() => {
          setTimeout(() => {
            setEndDatepickerIsOpen(true);
          }, 100);
        }}
        onReset={() => {
          setHoveredDateRange(emptyDateRange);
          setSelectedDateRange(emptyDateRange);
        }}
      ></Datepicker>
      <Datepicker
        label="Til dato"
        isCompact={isCompact}
        hasSelectDateOnOpen={false}
        value={selectedDateRange.end}
        minDate={hoveredDateRange.start}
        valueOnChange={(selectedDate: Date | null) => {
          setHoveredDateRange((current) => {
            return { ...current, end: selectedDate };
          });
          setSelectedDateRange((current) => {
            return { ...current, end: selectedDate };
          });
        }}
        onClose={() => setEndDatepickerIsOpen(false)}
        onOpen={() => setEndDatepickerIsOpen(true)}
        onReset={() => {
          console.log('reset');
          setHoveredDateRange(emptyDateRange);
          setSelectedDateRange(emptyDateRange);
        }}
        onDateElementMouseOver={handleEndDatepickerMouseOver}
        onDatepickerPopoverMouseOver={handleEndDatepickerPopoverMouseOver}
        isOpen={endDatepickerIsOpen}
        hoveredDateRange={hoveredDateRange}
      ></Datepicker>
    </DatepickerRangeWrapper>
  );
};

export default DatepickerRange;
