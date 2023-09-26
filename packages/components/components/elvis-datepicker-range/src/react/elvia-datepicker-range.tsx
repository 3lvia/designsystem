import React, { FC, useEffect, useMemo, useState } from 'react';
import { Datepicker, DatepickerProps } from '@elvia/elvis-datepicker/react';
import { DatepickerRangeWrapper, RowContainer } from './styledComponents';
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
  ErrorOptions,
} from './elviaDatepickerRange.types';
import { Timepicker } from '@elvia/elvis-timepicker/react';
import { isAfter, isBefore } from './dateHelpers';
export * from './elviaDatepickerRange.types';

type Picker = 'startDate' | 'startTime' | 'endDate' | 'endTime';

const defaultErrorOptions: ErrorOptions = {
  start: { hideText: false, text: '', hasErrorPlaceholder: true },
  end: { hideText: false, text: '', hasErrorPlaceholder: true },
};

export const DatepickerRange: FC<DatepickerRangeProps> = ({
  value,
  valueOnChange,
  valueOnChangeISOString,
  labelOptions,
  size,
  isFullWidth,
  isDisabled,
  isRequired,
  isVertical,
  hasSelectDateOnOpen = true,
  hasTimepickers = false,
  timepickerInterval = '15',
  hasAutoOpenEndDatepicker,
  errorOptions,
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
  const [touchedPickers, setTouchedPickers] = useState<Picker[]>([]);
  const [openPicker, setOpenPicker] = useState<Picker>();
  const [isRequiredState, setIsRequiredState] = useState<IsRequired>();
  const [currentErrorMessages, setCurrentErrorMessages] = useState<CustomError>(emptyErrorMessage);
  const [shouldOpenNextPicker, setShouldOpenNextPicker] = useState(false);

  /**
   * Usually the value in the inputs are hidden before its touched.
   * We should however not hide the value in the inputs if the date
   * is passed as a prop.
   */
  const valueIsSentAsProp = useMemo(() => !!value, [value]);

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

  const setTime = (date: Date | number, when: 'startOfDay' | 'endOfDay'): Date => {
    const dateCopy = new Date(date);
    if (when === 'startOfDay') {
      if (minDate) {
        dateCopy.setHours(
          minDate.getHours(),
          minDate.getMinutes(),
          minDate.getSeconds(),
          minDate.getMilliseconds(),
        );
      } else {
        dateCopy.setHours(0, 0, 0, 0);
      }
    } else {
      if (maxDate) {
        dateCopy.setHours(
          maxDate.getHours(),
          maxDate.getMinutes(),
          maxDate.getSeconds(),
          maxDate.getMilliseconds(),
        );
      } else {
        dateCopy.setHours(23, 59, 59, 59);
      }
    }

    return dateCopy;
  };

  const isTouched = (picker: Picker) => touchedPickers.includes(picker);

  const setTouched = (picker: Picker) => {
    if (!isTouched(picker)) {
      setTouchedPickers((pickers) => {
        const listCopy = pickers.slice();
        listCopy.push(picker);
        return listCopy;
      });
    }
  };

  const mergedErrorOptions: ErrorOptions = {
    start: {
      ...defaultErrorOptions.start,
      ...errorOptions?.start,
      text: currentErrorMessages.start,
    },
    end: {
      ...defaultErrorOptions.end,
      ...errorOptions?.end,
      text: currentErrorMessages.end,
    },
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

  const setNewDateRange = (newDateRange: DateRange, emit = true): void => {
    setSelectedDateRange(newDateRange);

    if (!emit) {
      return;
    }

    handleValueOnChangeISOString(newDateRange);
    if (!webcomponent) {
      valueOnChange?.(newDateRange);
    } else {
      webcomponent.setProps({ value: newDateRange }, true);
      webcomponent.triggerEvent('valueOnChange', newDateRange);
    }
  };

  useEffect(() => {
    if (value) {
      setNewDateRange(value, false);
    } else {
      setNewDateRange(emptyDateRange, false);
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

  const handleStartDateValueOnChange = (newDate: Date | null, change: 'date' | 'time') => {
    setShouldOpenNextPicker(
      !selectedDateRange.start ||
        !selectedDateRange.end ||
        newDate?.getTime() !== selectedDateRange.start.getTime(),
    );

    // If start datepicker is set to a date after the end datepicker, set the end date to newValue.
    if (newDate) {
      let date = newDate;
      if (change === 'date' && !isTouched('startTime')) {
        date = setTime(newDate, 'startOfDay');
      } else if (change === 'time' && !isTouched('startDate') && minDate) {
        date.setFullYear(minDate.getFullYear(), minDate.getMonth(), minDate.getDate());
      }

      if (selectedDateRange?.end && date > selectedDateRange.end) {
        setNewDateRange({ start: date, end: date });
      } else {
        setNewDateRange({ ...selectedDateRange, start: date });
      }
    }
  };

  const handleEndDatepickerValueOnChange = (newDate: Date | null, change: 'date' | 'time') => {
    // If end datepicker is set to a date before the start date, set both to end datepicker value.
    if (newDate) {
      const date = newDate;
      if (change === 'date' && !isTouched('endTime')) {
        setTime(newDate, 'endOfDay');
      } else if (change === 'time' && !isTouched('endDate') && maxDate) {
        date.setFullYear(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate());
      }

      if (selectedDateRange?.start && date < selectedDateRange.start) {
        setNewDateRange({ start: date, end: date });
      } else {
        setNewDateRange({ ...selectedDateRange, end: date });
      }
    }
  };

  const onStartPickerOpen = () => {
    setOpenPicker('startDate');

    if (hasSelectDateOnOpen && !selectedDateRange.start) {
      const endDate = selectedDateRange.end?.getTime();
      const startDate =
        endDate && !minDate && endDate < Date.now()
          ? setTime(endDate, 'startOfDay')
          : setTime(minDate || new Date(), 'startOfDay');
      setNewDateRange({ ...selectedDateRange, start: startDate });
    }
  };

  const onEndPickerOpen = () => {
    setOpenPicker('endDate');

    if (hasSelectDateOnOpen && !selectedDateRange.end) {
      const startDate = selectedDateRange.start?.getTime();
      const endDate =
        startDate && !maxDate && Date.now() < startDate
          ? setTime(startDate, 'endOfDay')
          : setTime(maxDate || new Date(), 'endOfDay');
      setNewDateRange({ ...selectedDateRange, end: endDate });
    }
  };

  const openNextPicker = (): void => {
    if (!shouldOpenNextPicker || !hasAutoOpenEndDatepicker) {
      return;
    }

    if (openPicker === 'startDate') {
      setOpenPicker(hasTimepickers ? 'startTime' : 'endDate');
    } else if (openPicker === 'startTime') {
      setOpenPicker('endDate');
    } else if (openPicker === 'endDate') {
      if (hasTimepickers) {
        setOpenPicker('endTime');
      } else {
        setOpenPicker(undefined);
        setShouldOpenNextPicker(false);
      }
    } else if (openPicker === 'endTime') {
      setOpenPicker(undefined);
      setShouldOpenNextPicker(false);
    }
  };

  const isOutsideMinMaxBoundary = (d?: Date | null): boolean => {
    return isBefore(d, minDate) || isAfter(d, maxDate);
  };

  /** These props are passed through directly to both the underlying datepickers. */
  const passThroughProps: Partial<DatepickerProps> = {
    minDate,
    maxDate,
    size,
    isFullWidth,
    isDisabled,
  };

  const handleStartDatePickerValueOnChange = (newDate: Date | null) => {
    handleStartDateValueOnChange(newDate, 'date');
  };

  const handleStartTimePickerValueOnChange = (newDate: Date | null) => {
    handleStartDateValueOnChange(newDate, 'time');
  };

  const handleEndDatePickerValueOnChange = (newDate: Date | null) => {
    handleEndDatepickerValueOnChange(newDate, 'date');
  };

  const handleEndTimePickerValueOnChange = (newDate: Date | null) => {
    handleEndDatepickerValueOnChange(newDate, 'time');
  };

  return (
    <DatepickerRangeWrapper
      isFullWidth={isFullWidth ?? false}
      isVertical={isVertical ?? false}
      className={className}
      style={inlineStyle}
      data-testid="datepicker-range-wrapper"
      {...rest}
    >
      <RowContainer>
        <Datepicker
          {...passThroughProps}
          label={labelOptions?.start ?? defaultLabelOptions.start}
          value={selectedDateRange.start}
          valueOnChange={handleStartDatePickerValueOnChange}
          isRequired={isRequiredState?.start}
          onClose={openNextPicker}
          onFocus={() => setTouched('startDate')}
          onOpen={onStartPickerOpen}
          onReset={() => {
            setNewDateRange({ ...selectedDateRange, start: null });
          }}
          dateRangeProps={{
            selectedDateRange: selectedDateRange,
            whichRangePicker: 'start',
            showTimeInError: hasTimepickers,
          }}
          disableDate={disableDatesWrapper()?.start}
          errorOptions={{
            isErrorState: isOutsideMinMaxBoundary(selectedDateRange.start),
            ...mergedErrorOptions?.start,
          }}
          errorOnChange={(error: string) =>
            setCurrentErrorMessages((current) => ({ ...current, start: error }))
          }
          hasSelectDateOnOpen={false}
        ></Datepicker>
        {hasTimepickers && (
          <Timepicker
            label=""
            size={size}
            isDisabled={isDisabled}
            value={isTouched('startTime') || valueIsSentAsProp ? selectedDateRange.start : undefined}
            valueOnChange={handleStartTimePickerValueOnChange}
            isFullWidth={isFullWidth && isVertical}
            onFocus={() => setTouched('startTime')}
            isRequired={isRequiredState?.start}
            selectNowOnOpen={false}
            minuteInterval={timepickerInterval}
            onOpen={() => setOpenPicker('startTime')}
            onClose={openNextPicker}
            isOpen={openPicker === 'startTime'}
            errorOptions={{
              hideText: true,
              isErrorState: isOutsideMinMaxBoundary(selectedDateRange.start),
              text: '',
              hasErrorPlaceholder:
                !!mergedErrorOptions?.start?.hasErrorPlaceholder || !!mergedErrorOptions?.start?.text,
            }}
            errorOnChange={(error: string) => {
              setCurrentErrorMessages((current) => ({ ...current, start: error }));
            }}
          />
        )}
      </RowContainer>
      <RowContainer>
        <Datepicker
          {...passThroughProps}
          label={labelOptions?.end ?? defaultLabelOptions.end}
          value={selectedDateRange.end}
          valueOnChange={handleEndDatePickerValueOnChange}
          isRequired={isRequiredState?.end}
          onClose={openNextPicker}
          onFocus={() => setTouched('endDate')}
          onOpen={onEndPickerOpen}
          onReset={() => {
            setNewDateRange({ ...selectedDateRange, end: null });
          }}
          isOpen={openPicker === 'endDate'}
          dateRangeProps={{
            selectedDateRange: selectedDateRange,
            whichRangePicker: 'end',
            showTimeInError: hasTimepickers,
          }}
          disableDate={disableDatesWrapper()?.end}
          errorOptions={{
            isErrorState: isOutsideMinMaxBoundary(selectedDateRange.end),
            ...mergedErrorOptions?.end,
          }}
          errorOnChange={(error: string) =>
            setCurrentErrorMessages((current) => ({ ...current, end: error }))
          }
          hasSelectDateOnOpen={false}
        ></Datepicker>
        {hasTimepickers && (
          <Timepicker
            label=""
            size={size}
            isDisabled={isDisabled}
            value={isTouched('endTime') || valueIsSentAsProp ? selectedDateRange.end : undefined}
            valueOnChange={handleEndTimePickerValueOnChange}
            isFullWidth={isFullWidth && isVertical}
            onFocus={() => setTouched('endTime')}
            isRequired={isRequiredState?.end}
            selectNowOnOpen={false}
            minuteInterval={timepickerInterval}
            onOpen={() => setOpenPicker('endTime')}
            onClose={openNextPicker}
            isOpen={openPicker === 'endTime'}
            errorOptions={{
              hideText: true,
              isErrorState: isOutsideMinMaxBoundary(selectedDateRange.end),
              text: '',
              hasErrorPlaceholder:
                !!mergedErrorOptions?.end?.hasErrorPlaceholder || !!mergedErrorOptions?.end?.text,
            }}
            errorOnChange={(error: string) => {
              setCurrentErrorMessages((current) => ({ ...current, end: error }));
            }}
          />
        )}
      </RowContainer>
    </DatepickerRangeWrapper>
  );
};
