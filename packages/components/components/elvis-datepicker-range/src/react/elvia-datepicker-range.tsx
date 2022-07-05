import React, { CSSProperties, FC, PointerEvent, useEffect, useState } from 'react';
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

export interface DisableDates {
  start?: (day: Date) => boolean;
  end?: (day: Date) => boolean;
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
  isFullWidth?: boolean;
  isDisabled?: boolean;
  isRequired?: boolean;
  hasSelectDateOnOpen?: boolean;
  hasAutoOpenEndDatepicker?: boolean;
  labelOptions?: LabelOptions;
  webcomponent?: ElvisComponentWrapper;
  className?: string;
  inlineStyle?: { [style: string]: CSSProperties };
  disableDates?: DisableDates;
}

export const DatepickerRange: FC<DatepickerRangeProps> = ({
  value,
  valueOnChange,
  minDate,
  maxDate,
  isCompact,
  isFullWidth,
  isDisabled,
  isRequired,
  hasSelectDateOnOpen,
  hasAutoOpenEndDatepicker,
  labelOptions,
  webcomponent,
  className,
  inlineStyle,
  disableDates,
  ...rest
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
   * Returns functions for dates that should be disabled, one for start and one for end datepicker.
   * Gets the functions through getProp for webcomponents.
   */
  const disableDatesWrapper = (): DisableDates | undefined => {
    if (webcomponent) {
      return webcomponent.getProp('disableDates');
    }
    return disableDates;
  };

  const handleEndDatepickerDateElementPointerMove = (event: PointerEvent<HTMLDivElement>, day: Date) => {
    if (!(event.target instanceof Element)) {
      return;
    }
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

  const handleStartDatepickerDateElementPointerMove = (event: PointerEvent<HTMLDivElement>, day: Date) => {
    if (!(event.target instanceof Element)) {
      return;
    }
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

  const handleEndDatepickerPopoverPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!(event.target instanceof Element)) {
      return;
    }
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

  const handleStartDatepickerPopoverPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!(event.target instanceof Element)) {
      return;
    }
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

  const handleStartDatepickerValueOnChange = (newValue: Date | null) => {
    // If start datepicker is set to a date after the end datepicker, set the end date to newValue.
    if (newValue && selectedDateRange?.end && newValue > selectedDateRange.end) {
      setHoveredDateRange({ start: newValue, end: newValue });
      setSelectedDateRange({ start: newValue, end: newValue });
    } else {
      setHoveredDateRange((current) => {
        return { ...current, start: newValue };
      });
      setSelectedDateRange((current) => {
        return { ...current, start: newValue };
      });
    }
  };

  const handleEndDatepickerValueOnChange = (newValue: Date | null) => {
    // If end datepicker is set to a date before the start date, set both to end datepicker value.
    if (newValue && selectedDateRange?.start && newValue < selectedDateRange.start) {
      setHoveredDateRange({ start: newValue, end: newValue });
      setSelectedDateRange({ start: newValue, end: newValue });
    } else {
      setHoveredDateRange((current) => {
        return { ...current, end: newValue };
      });
      setSelectedDateRange((current) => {
        return { ...current, end: newValue };
      });
    }
  };

  /** These props are passed through directly to both the underlying datepickers. */
  const passThroughProps = {
    minDate,
    maxDate,
    isCompact,
    isFullWidth,
    isDisabled,
    isRequired,
    hasSelectDateOnOpen,
  };

  return (
    <DatepickerRangeWrapper className={className ?? undefined} style={inlineStyle} {...rest}>
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
          setHoveredDateRange({ ...selectedDateRange, start: null });
          setSelectedDateRange({ ...selectedDateRange, start: null });
        }}
        dateRangeProps={{
          hoveredDateRange: hoveredDateRange,
          onDateElementPointerMove: handleStartDatepickerDateElementPointerMove,
          onDatepickerPopoverPointerMove: handleStartDatepickerPopoverPointerMove,
        }}
        disableDate={disableDatesWrapper()?.start}
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
          setHoveredDateRange({ ...selectedDateRange, end: null });
          setSelectedDateRange({ ...selectedDateRange, end: null });
        }}
        isOpen={endDatepickerIsOpen}
        dateRangeProps={{
          hoveredDateRange: hoveredDateRange,
          onDateElementPointerMove: handleEndDatepickerDateElementPointerMove,
          onDatepickerPopoverPointerMove: handleEndDatepickerPopoverPointerMove,
        }}
        disableDate={disableDatesWrapper()?.end}
      ></Datepicker>
    </DatepickerRangeWrapper>
  );
};

export default DatepickerRange;
