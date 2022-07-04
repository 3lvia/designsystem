import React, { CSSProperties, FC, MouseEvent, useEffect, useState } from 'react';
import { Datepicker } from '@elvia/elvis-datepicker/react';
import { DatepickerRangeWrapper } from './styledComponents';
import { ElvisComponentWrapper } from '@elvia/elvis-component-wrapper/src/elvia-component';

export interface DateRange {
  start: Date | null;
  end: Date | null;
}

export interface LabelOptions {
  start?: string;
  end?: string;
}

const emptyDateRange: DateRange = {
  start: null,
  end: null,
};

const defaultLabelOptions: LabelOptions = {
  start: 'Fra dato',
  end: 'Til dato',
};

export interface DatepickerRangeProps {
  value?: DateRange;
  valueOnChange?: (value: DateRange) => void;
  minDate?: Date;
  maxDate?: Date;
  isCompact?: boolean;
  isDisabled?: boolean;
  isRequired?: boolean;
  hasSelectDateOnOpen?: boolean;
  hasAutoOpenEndDatepicker?: boolean;
  labelOptions?: LabelOptions;
  webcomponent?: ElvisComponentWrapper;
  className?: string;
  inlineStyle?: { [style: string]: CSSProperties };
}

export const DatepickerRange: FC<DatepickerRangeProps> = ({
  value,
  valueOnChange,
  minDate,
  maxDate,
  isCompact,
  isDisabled,
  isRequired,
  hasSelectDateOnOpen,
  hasAutoOpenEndDatepicker,
  labelOptions,
  webcomponent,
  className,
  inlineStyle,
}) => {
  const [hoveredDateRange, setHoveredDateRange] = useState<DateRange>(value ?? emptyDateRange);
  const [selectedDateRange, setSelectedDateRange] = useState<DateRange>(value ?? emptyDateRange);
  const [endDatepickerIsOpen, setEndDatepickerIsOpen] = useState(false);

  /** These props are passed through directly to both the underlying datepickers. */
  const passThroughProps = {
    minDate,
    maxDate,
    isCompact,
    isDisabled,
    isRequired,
    hasSelectDateOnOpen,
  };

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

  const handleEndDatepickerPopoverPointerMove = (
    event: MouseEvent<HTMLDivElement> & { target: { classList: DOMTokenList; innerText: string } },
  ) => {
    const eventTargetIsDayElementInCalendar = event.target.classList.contains('ewc-datepicker__day');
    if (!eventTargetIsDayElementInCalendar) {
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
    }
  };

  const handleStartDatepickerPopoverPointerMove = (
    event: MouseEvent<HTMLDivElement> & { target: { classList: DOMTokenList; innerText: string } },
  ) => {
    const eventTargetIsDayElementInCalendar = event.target.classList.contains('ewc-datepicker__day');
    if (!eventTargetIsDayElementInCalendar) {
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
    }
  };

  const handleStartDatepickerValueOnChange = (value: Date | null) => {
    // If start datepicker is set to a date after the end datepicker, set the end date to value.
    if (value && selectedDateRange?.end && value > selectedDateRange.end) {
      setHoveredDateRange({ start: value, end: value });
      setSelectedDateRange({ start: value, end: value });
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
    <DatepickerRangeWrapper className={className ?? undefined} style={inlineStyle}>
      <Datepicker
        {...passThroughProps}
        label={labelOptions?.start ?? defaultLabelOptions.start}
        hasSelectDateOnOpen={hasSelectDateOnOpen}
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
        dateRangeProps={{
          hoveredDateRange: hoveredDateRange,
          onDateElementMouseOver: handleStartDatepickerMouseOver,
          onDatepickerPopoverPointerMove: handleStartDatepickerPopoverPointerMove,
        }}
      ></Datepicker>
      <Datepicker
        {...passThroughProps}
        label={labelOptions?.end ?? defaultLabelOptions.end}
        hasSelectDateOnOpen={hasSelectDateOnOpen}
        value={selectedDateRange.end}
        valueOnChange={handleEndDatepickerValueOnChange}
        onClose={() => setEndDatepickerIsOpen(false)}
        onOpen={() => setEndDatepickerIsOpen(true)}
        onReset={() => {
          setHoveredDateRange(emptyDateRange);
          setSelectedDateRange(emptyDateRange);
        }}
        isOpen={endDatepickerIsOpen}
        dateRangeProps={{
          hoveredDateRange: hoveredDateRange,
          onDateElementMouseOver: handleEndDatepickerMouseOver,
          onDatepickerPopoverPointerMove: handleEndDatepickerPopoverPointerMove,
        }}
      ></Datepicker>
    </DatepickerRangeWrapper>
  );
};

export default DatepickerRange;
