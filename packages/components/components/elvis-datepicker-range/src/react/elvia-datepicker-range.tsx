import React, { CSSProperties, FC, PointerEvent, useEffect, useState } from 'react';
import { Datepicker } from '@elvia/elvis-datepicker/react';
import { DatepickerRangeWrapper } from './styledComponents';
import { ElvisComponentWrapper } from '@elvia/elvis-component-wrapper/src/elvia-component';
import isValid from 'date-fns/isValid';
import formatISO from 'date-fns/formatISO';

export type BothDatepickers<T> = {
  start: T;
  end: T;
};

export type DateRange = BothDatepickers<Date | null>;
export type DateRangeString = BothDatepickers<string | null>;
export type LabelOptions = Partial<BothDatepickers<string>>;
export type DisableDates = Partial<BothDatepickers<(day: Date) => boolean>>;
export type IsRequired = Partial<BothDatepickers<boolean>>;

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
  valueOnChangeISOString?: (value: DateRangeString) => void;
  labelOptions?: LabelOptions;
  isCompact?: boolean;
  isFullWidth?: boolean;
  isDisabled?: boolean;
  isRequired?: IsRequired | boolean;
  hasSelectDateOnOpen?: boolean;
  hasAutoOpenEndDatepicker?: boolean;
  minDate?: Date;
  maxDate?: Date;
  className?: string;
  inlineStyle?: { [style: string]: CSSProperties };
  disableDates?: DisableDates;
  webcomponent?: ElvisComponentWrapper;
}

export const DatepickerRange: FC<DatepickerRangeProps> = ({
  value,
  valueOnChange,
  valueOnChangeISOString,
  labelOptions,
  isCompact,
  isFullWidth,
  isDisabled,
  isRequired,
  hasSelectDateOnOpen,
  hasAutoOpenEndDatepicker,
  minDate,
  maxDate,
  className,
  inlineStyle,
  disableDates,
  webcomponent,
  ...rest
}) => {
  const [hoveredDateRange, setHoveredDateRange] = useState(value ?? emptyDateRange);
  const [selectedDateRange, setSelectedDateRange] = useState(value ?? emptyDateRange);
  const [endDatepickerIsOpen, setEndDatepickerIsOpen] = useState(false);
  const [isRequiredState, setIsRequiredState] = useState<IsRequired>();

  useEffect(() => {
    if (typeof isRequired === 'boolean') {
      setIsRequiredState({ start: isRequired, end: isRequired });
    } else {
      setIsRequiredState(isRequired);
    }
  }, [isRequired]);

  /**
   * Handle valueOnChangeISOString event. If newDate.start/end is not valid, formatISO crashes the component.
   */
  const handleValueOnChangeISOString = (newDate: DateRange): void => {
    const dateISO: DateRangeString = { start: null, end: null };
    if (newDate.start && isValid(newDate.start)) {
      dateISO.start = formatISO(newDate.start, { representation: 'date' });
    } else if (newDate.start === null) {
      dateISO.start = null;
    } else {
      dateISO.start = 'Invalid Date';
    }
    if (newDate.end && isValid(newDate.end)) {
      dateISO.end = formatISO(newDate.end, { representation: 'date' });
    } else if (newDate.end === null) {
      dateISO.end = null;
    } else {
      dateISO.end = 'Invalid Date';
    }

    if (!webcomponent) {
      valueOnChangeISOString?.(dateISO);
    } else {
      webcomponent.triggerEvent('valueOnChangeISOString', dateISO);
    }
  };

  useEffect(() => {
    handleValueOnChangeISOString(selectedDateRange);
    if (!webcomponent) {
      valueOnChange?.(selectedDateRange);
    } else {
      webcomponent.setProps({ value: selectedDateRange }, true);
    }
  }, [selectedDateRange]);

  useEffect(() => {
    if (value) {
      setSelectedDateRange(value);
    } else {
      setSelectedDateRange(emptyDateRange);
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
    // If newValue is an invalid date, do not update any states
    if (newValue && !isValid(newValue)) {
      return;
    }
    // If start datepicker is set to a date after the end datepicker, set the end date to newValue.
    else if (newValue && selectedDateRange?.end && newValue > selectedDateRange.end) {
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
    // If newValue is an invalid date, do not update any states
    if (newValue && !isValid(newValue)) {
      return;
    }
    // If end datepicker is set to a date before the start date, set both to end datepicker value.
    else if (newValue && selectedDateRange?.start && newValue < selectedDateRange.start) {
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
    hasSelectDateOnOpen,
  };

  return (
    <DatepickerRangeWrapper
      className={className ?? undefined}
      style={inlineStyle}
      data-testid="datepicker-range-wrapper"
      {...rest}
    >
      <Datepicker
        {...passThroughProps}
        label={labelOptions?.start ?? defaultLabelOptions.start}
        hasSelectDateOnOpen={hasSelectDateOnOpen}
        value={selectedDateRange.start}
        valueOnChange={handleStartDatepickerValueOnChange}
        isRequired={isRequiredState?.start}
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
          selectedDateRange: selectedDateRange,
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
        isRequired={isRequiredState?.end}
        onClose={() => setEndDatepickerIsOpen(false)}
        onOpen={() => setEndDatepickerIsOpen(true)}
        onReset={() => {
          setHoveredDateRange({ ...selectedDateRange, end: null });
          setSelectedDateRange({ ...selectedDateRange, end: null });
        }}
        isOpen={endDatepickerIsOpen}
        dateRangeProps={{
          selectedDateRange: selectedDateRange,
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
