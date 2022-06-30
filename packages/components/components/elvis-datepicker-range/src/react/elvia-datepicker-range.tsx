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
  value?: DateRange;
  valueOnChange?: (value: DateRange) => void;
  isCompact?: boolean;
  hasAutoOpenEndDatepicker?: boolean;
  webcomponent?: ElvisComponentWrapper;
}

export const DatepickerRange: FC<DatepickerRangeProps> = ({
  value,
  valueOnChange,
  isCompact,
  hasAutoOpenEndDatepicker,
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

  const handleStartDatepickerMouseOver = (
    event: MouseEvent<HTMLButtonElement> & { target: { classList: DOMTokenList; innerText: string } },
    day: Date,
  ) => {
    const eventTargetIsDayElementInCalendar = event.target.classList.contains('ewc-datepicker__day');

    if (eventTargetIsDayElementInCalendar) {
      setHoveredDateRange((current) => {
        if (current.end) {
          return {
            ...current,
            start: new Date(day),
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

  const handleStartDatepickerPopoverMouseOver = (
    event: MouseEvent<HTMLDivElement> & { target: { classList: DOMTokenList; innerText: string } },
  ) => {
    const eventTargetIsDayElementInCalendar = event.target.classList.contains('ewc-datepicker__day');

    if (eventTargetIsDayElementInCalendar) {
      return;
    } else if (selectedDateRange.start) {
      setHoveredDateRange((current) => {
        if (current.start) {
          return {
            ...current,
            start: selectedDateRange.start,
          };
        } else {
          return current;
        }
      });
    } else {
      setHoveredDateRange((current) => {
        if (current.end) {
          return {
            ...current,
            start: null,
          };
        } else {
          return current;
        }
      });
    }
  };

  const handleStartDatepickerValueOnChange = (value: Date | null) => {
    // If start datepicker is set to a date after the end datepicker, set the end date to null.
    if (value && selectedDateRange?.end && value > selectedDateRange.end) {
      setHoveredDateRange({ start: value, end: null });
      setSelectedDateRange({ start: value, end: null });
    } else {
      setHoveredDateRange((current) => {
        return { ...current, start: value };
      });
      setSelectedDateRange((current) => {
        return { ...current, start: value };
      });
    }
  };

  const handleEndDatepickerValueOnChange = (value: Date | null) => {
    // If end datepicker is set to a date before the start date, set both to end datepicker value.
    if (value && selectedDateRange?.start && value < selectedDateRange.start) {
      setHoveredDateRange({ start: value, end: value });
      setSelectedDateRange({ start: value, end: value });
    } else {
      setHoveredDateRange((current) => {
        return { ...current, end: value };
      });
      setSelectedDateRange((current) => {
        return { ...current, end: value };
      });
    }
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
          hasAutoOpenEndDatepicker &&
            setTimeout(() => {
              setEndDatepickerIsOpen(true);
            }, 100);
        }}
        onReset={() => {
          setHoveredDateRange(emptyDateRange);
          setSelectedDateRange(emptyDateRange);
        }}
        onDateElementMouseOver={handleStartDatepickerMouseOver}
        onDatepickerPopoverMouseOver={handleStartDatepickerPopoverMouseOver}
        hoveredDateRange={hoveredDateRange}
      ></Datepicker>
      <Datepicker
        label="Til dato"
        isCompact={isCompact}
        hasSelectDateOnOpen={false}
        value={selectedDateRange.end}
        valueOnChange={handleEndDatepickerValueOnChange}
        onClose={() => setEndDatepickerIsOpen(false)}
        onOpen={() => setEndDatepickerIsOpen(true)}
        onReset={() => {
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
