import React, { FC, useEffect, useState } from 'react';
import { Datepicker, DatepickerProps } from '@elvia/elvis-datepicker/react';
import { DatepickerRangeWrapper } from './styledComponents';
import {
  DatepickerRangeProps,
  emptyDateRange,
  IsRequired,
  CustomError,
  emptyErrorMessage,
  DateRange,
  DateRangeString,
  DisableDates,
  defaultLabelOptions,
} from './elviaDatepickerRange.types';

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
  hasSelectDateOnOpen = true,
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
  const [shouldOpenEndDatePicker, setShouldOpenEndDatePicker] = useState(false);

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
    setShouldOpenEndDatePicker(
      !selectedDateRange.start ||
        !selectedDateRange.end ||
        newDate?.getTime() !== selectedDateRange.start.getTime(),
    );
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

  const onStartPickerOpen = () => {
    if (hasSelectDateOnOpen && !selectedDateRange.start) {
      const endDate = selectedDateRange.end?.getTime();
      const startDate = endDate && endDate < Date.now() ? new Date(endDate) : new Date();
      setSelectedDateRange((current) => {
        return { ...current, start: startDate };
      });
    }
  };

  const onEndPickerOpen = () => {
    setEndDatepickerIsOpen(true);

    if (hasSelectDateOnOpen && !selectedDateRange.end) {
      const startDate = selectedDateRange.start?.getTime();
      const endDate = startDate && Date.now() < startDate ? new Date(startDate) : new Date();
      setSelectedDateRange((current) => {
        return { ...current, end: endDate };
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
          hasAutoOpenEndDatepicker && shouldOpenEndDatePicker && setEndDatepickerIsOpen(true);
        }}
        onOpen={onStartPickerOpen}
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
        hasSelectDateOnOpen={false}
      ></Datepicker>
      <Datepicker
        {...passThroughProps}
        label={labelOptions?.end ?? defaultLabelOptions.end}
        value={selectedDateRange.end}
        valueOnChange={handleEndDatepickerValueOnChange}
        isRequired={isRequiredState?.end}
        onClose={() => {
          setEndDatepickerIsOpen(false);
          setShouldOpenEndDatePicker(false);
        }}
        onOpen={onEndPickerOpen}
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
        hasSelectDateOnOpen={false}
      ></Datepicker>
    </DatepickerRangeWrapper>
  );
};

export default DatepickerRange;
