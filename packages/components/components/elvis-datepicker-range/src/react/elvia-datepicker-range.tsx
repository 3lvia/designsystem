import React, { CSSProperties, FC, useEffect, useState } from 'react';
import { Datepicker, DatepickerProps } from '@elvia/elvis-datepicker/react';
import { DatepickerRangeWrapper } from './styledComponents';
import type { ElvisComponentWrapper } from '@elvia/elvis-component-wrapper';

export type BothDatepickers<T> = {
  start: T;
  end: T;
};

export type DateRange = BothDatepickers<Date | null>;
export type DateRangeString = BothDatepickers<string | null>;
export type LabelOptions = Partial<BothDatepickers<string>>;
export type DisableDates = Partial<BothDatepickers<(day: Date) => boolean>>;
export type IsRequired = Partial<BothDatepickers<boolean>>;
export type IsErrorState = Partial<BothDatepickers<boolean>>;
export type CustomError = Partial<BothDatepickers<string>>;
export type ErrorOptions = Partial<BothDatepickers<SinglePickerErrorOptions>>;

const emptyDateRange: DateRange = {
  start: null,
  end: null,
};

const defaultLabelOptions: LabelOptions = {
  start: 'Fra dato',
  end: 'Til dato',
};

const emptyErrorMessage: CustomError = {
  start: '',
  end: '',
};

// This interface is copied from timepicker. Move to shared folder later.
export interface SinglePickerErrorOptions {
  text: string;
  hideText: boolean;
  isErrorState: boolean;
}

export interface DatepickerRangeProps {
  value?: DateRange;
  valueOnChange?: (value: DateRange) => void;
  valueOnChangeISOString?: (value: DateRangeString) => void;
  labelOptions?: LabelOptions;
  isCompact?: boolean;
  isFullWidth?: boolean;
  isDisabled?: boolean;
  isRequired?: IsRequired | boolean;
  isVertical?: boolean;
  hasSelectDateOnOpen?: boolean;
  errorOptions?: ErrorOptions;
  hasAutoOpenEndDatepicker?: boolean;
  errorOnChange?: (errors: CustomError) => void;
  minDate?: Date;
  maxDate?: Date;
  className?: string;
  inlineStyle?: CSSProperties;
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
  isVertical,
  hasSelectDateOnOpen,
  hasAutoOpenEndDatepicker,
  errorOptions = {
    start: { hideText: false, isErrorState: false, text: '' },
    end: { hideText: false, isErrorState: false, text: '' },
  },
  errorOnChange,
  minDate,
  maxDate,
  className,
  inlineStyle,
  disableDates,
  webcomponent,
  ...rest
}) => {
  const [selectedDateRange, setSelectedDateRange] = useState(value ?? emptyDateRange);
  const [endDatepickerIsOpen, setEndDatepickerIsOpen] = useState(false);
  const [isRequiredState, setIsRequiredState] = useState<IsRequired>();
  const [currentErrorMessages, setCurrentErrorMessages] = useState<CustomError>(emptyErrorMessage);

  useEffect(() => {
    if (typeof isRequired === 'boolean') {
      setIsRequiredState({ start: isRequired, end: isRequired });
    } else {
      setIsRequiredState(isRequired);
    }
  }, [isRequired]);

  useEffect(() => {
    if (!webcomponent) {
      errorOnChange?.(currentErrorMessages);
    } else {
      webcomponent.triggerEvent('errorOnChange', currentErrorMessages);
    }
  }, [currentErrorMessages]);

  const isValidDate = (date: unknown): boolean => {
    return !isNaN(date as number) && date instanceof Date;
  };

  /**
   * Handle valueOnChangeISOString event. If newDate.start/end is not valid, formatISO crashes the component.
   */
  const handleValueOnChangeISOString = (newDateRange: DateRange): void => {
    const dateISO: DateRangeString = { start: null, end: null };
    if (newDateRange.start && isValidDate(newDateRange.start)) {
      dateISO.start = newDateRange.start?.toISOString().substring(0, 10);
    } else if (newDateRange.start === null) {
      dateISO.start = null;
    } else {
      dateISO.start = 'Invalid Date';
    }
    if (newDateRange.end && isValidDate(newDateRange.end)) {
      dateISO.end = newDateRange.end?.toISOString().substring(0, 10);
    } else if (newDateRange.end === null) {
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

  const handleStartDatepickerValueOnChange = (newDate: Date | null) => {
    // If start datepicker is set to a date after the end datepicker, set the end date to newValue.
    if (newDate && selectedDateRange?.end && newDate > selectedDateRange.end) {
      setSelectedDateRange({ start: newDate, end: newDate });
    } else {
      setSelectedDateRange((current) => {
        return { ...current, start: newDate };
      });
    }
  };

  const handleEndDatepickerValueOnChange = (newDate: Date | null) => {
    // If end datepicker is set to a date before the start date, set both to end datepicker value.
    if (newDate && selectedDateRange?.start && newDate < selectedDateRange.start) {
      setSelectedDateRange({ start: newDate, end: newDate });
    } else {
      setSelectedDateRange((current) => {
        return { ...current, end: newDate };
      });
    }
  };

  /** These props are passed through directly to both the underlying datepickers. */
  const passThroughProps: Partial<DatepickerProps> = {
    minDate,
    maxDate,
    isCompact,
    isFullWidth,
    isDisabled,
    hasSelectDateOnOpen,
  };

  return (
    <DatepickerRangeWrapper
      isVertical={isVertical ?? false}
      className={className}
      style={inlineStyle}
      data-testid="datepicker-range-wrapper"
      {...rest}
    >
      <Datepicker
        {...passThroughProps}
        label={labelOptions?.start ?? defaultLabelOptions.start}
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
          setSelectedDateRange({ ...selectedDateRange, start: null });
        }}
        dateRangeProps={{
          selectedDateRange: selectedDateRange,
          whichRangePicker: 'start',
        }}
        disableDate={disableDatesWrapper()?.start}
        errorOptions={errorOptions?.start}
        errorOnChange={(error: string) =>
          setCurrentErrorMessages((current) => ({ ...current, start: error }))
        }
      ></Datepicker>
      <Datepicker
        {...passThroughProps}
        label={labelOptions?.end ?? defaultLabelOptions.end}
        value={selectedDateRange.end}
        valueOnChange={handleEndDatepickerValueOnChange}
        isRequired={isRequiredState?.end}
        onClose={() => {
          setEndDatepickerIsOpen(false);
        }}
        onOpen={() => setEndDatepickerIsOpen(true)}
        onReset={() => {
          setSelectedDateRange({ ...selectedDateRange, end: null });
        }}
        isOpen={endDatepickerIsOpen}
        dateRangeProps={{
          selectedDateRange: selectedDateRange,
          whichRangePicker: 'end',
        }}
        disableDate={disableDatesWrapper()?.end}
        errorOptions={errorOptions?.end}
        errorOnChange={(error: string) => setCurrentErrorMessages((current) => ({ ...current, end: error }))}
      ></Datepicker>
    </DatepickerRangeWrapper>
  );
};

export default DatepickerRange;
