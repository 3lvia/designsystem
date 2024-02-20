import { Datepicker, DatepickerProps } from '@elvia/elvis-datepicker/react';
import { Timepicker } from '@elvia/elvis-timepicker/react';
import { FormFieldContainer, useUpdateEffect } from '@elvia/elvis-toolbox';
import React, { FC, useEffect, useMemo, useState } from 'react';

import { isSameDate, isValidDate, localISOTime } from './dateHelpers';
import {
  CustomError,
  DateRange,
  DateRangeString,
  DatepickerRangeProps,
  DisableDates,
  ErrorOptions,
  IsRequired,
  defaultLabelOptions,
  emptyDateRange,
  emptyErrorMessage,
} from './elviaDatepickerRange.types';
import { DatepickerRangeError } from './error/datepickerRangeError';
import { DatepickerRangeWrapper, RowContainer } from './styledComponents';

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

  const [currentTimepickerErrorMessages, setCurrentTimepickerErrorMessages] =
    useState<CustomError>(emptyErrorMessage);
  const [currentDatepickerErrorMessages, setCurrentDatepickerErrorMessages] =
    useState<CustomError>(emptyErrorMessage);
  const currentErrorMessages: CustomError = {
    start: currentDatepickerErrorMessages.start ?? currentTimepickerErrorMessages.start,
    end: currentDatepickerErrorMessages.end ?? currentTimepickerErrorMessages.end,
  };
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

  useUpdateEffect(() => {
    if (!webcomponent) {
      errorOnChange?.(currentErrorMessages);
    } else {
      webcomponent.triggerEvent('errorOnChange', currentErrorMessages);
    }
  }, [currentDatepickerErrorMessages, currentTimepickerErrorMessages]);

  const setTime = (date: Date | number, when: 'startOfDay' | 'endOfDay'): Date => {
    const dateCopy = new Date(date);
    if (when === 'startOfDay') {
      if (minDate && isSameDate(dateCopy, minDate)) {
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
      if (maxDate && isSameDate(dateCopy, maxDate)) {
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
    },
    end: {
      ...defaultErrorOptions.end,
      ...errorOptions?.end,
    },
  };

  /**
   * Handle valueOnChangeISOString event. If newDate.start/end is not valid, formatISO crashes the component.
   */
  const handleValueOnChangeISOString = (newDateRange: DateRange): void => {
    const dateISO: DateRangeString = { start: null, end: null };
    if (newDateRange.start && isValidDate(newDateRange.start)) {
      dateISO.start = localISOTime(newDateRange.start);
    } else if (newDateRange.start === null) {
      dateISO.start = null;
    } else {
      dateISO.start = 'Invalid Date';
    }
    if (newDateRange.end && isValidDate(newDateRange.end)) {
      dateISO.end = localISOTime(newDateRange.end);
    } else if (newDateRange.end === null) {
      dateISO.end = null;
    } else {
      dateISO.end = 'Invalid Date';
    }

    valueOnChangeISOString?.(dateISO);
    webcomponent?.triggerEvent('valueOnChangeISOString', dateISO);
  };

  const setNewDateRange = (newDateRange: DateRange, emit = true): void => {
    setSelectedDateRange(newDateRange);

    if (!emit) {
      return;
    }

    handleValueOnChangeISOString(newDateRange);
    valueOnChange?.(newDateRange);
    webcomponent?.setProps({ value: newDateRange }, true);
    webcomponent?.triggerEvent('valueOnChange', newDateRange);
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
      if (change === 'date' && !selectedDateRange.start && !isTouched('startTime')) {
        date = setTime(newDate, 'startOfDay');
      } else if (change === 'time' && !selectedDateRange.start && !isTouched('startDate') && minDate) {
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
      let date = newDate;
      if (change === 'date' && !selectedDateRange.end && !isTouched('endTime')) {
        date = setTime(newDate, 'endOfDay');
      } else if (change === 'time' && !selectedDateRange.end && !isTouched('endDate') && maxDate) {
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
      size={size}
      className={className}
      style={inlineStyle}
      data-testid="datepicker-range-wrapper"
      {...rest}
    >
      <FormFieldContainer isFullWidth={isFullWidth}>
        <RowContainer size={size}>
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
            }}
            disableDate={disableDatesWrapper()?.start}
            errorOptions={{
              ...mergedErrorOptions?.start,
              hideText: true,
              hasErrorPlaceholder:
                !!mergedErrorOptions?.start?.hasErrorPlaceholder || !!mergedErrorOptions?.start?.text,
            }}
            errorOnChange={(error) =>
              setCurrentDatepickerErrorMessages((current) => ({
                ...current,
                start: error || undefined,
              }))
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
                isErrorState: !!currentDatepickerErrorMessages.start,
                hasErrorPlaceholder:
                  !!mergedErrorOptions?.start?.hasErrorPlaceholder || !!mergedErrorOptions?.start?.text,
              }}
              errorOnChange={(error) => {
                setCurrentTimepickerErrorMessages((current) => ({
                  ...current,
                  start: error || undefined,
                }));
              }}
              minTime={isSameDate(selectedDateRange.start, minDate) ? minDate : undefined}
              maxTime={isSameDate(selectedDateRange.start, maxDate) ? maxDate : undefined}
            />
          )}
        </RowContainer>
        {currentErrorMessages.start && <DatepickerRangeError errorText={currentErrorMessages.start} />}
      </FormFieldContainer>
      <FormFieldContainer isFullWidth={isFullWidth}>
        <RowContainer size={size}>
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
            }}
            disableDate={disableDatesWrapper()?.end}
            errorOptions={{
              ...mergedErrorOptions?.end,
              hideText: true,
              hasErrorPlaceholder:
                !!mergedErrorOptions?.end?.hasErrorPlaceholder || !!mergedErrorOptions?.end?.text,
            }}
            errorOnChange={(error) =>
              setCurrentDatepickerErrorMessages((current) => ({
                ...current,
                end: error || undefined,
              }))
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
                isErrorState: !!currentDatepickerErrorMessages.end,
                hideText: true,
                hasErrorPlaceholder:
                  !!mergedErrorOptions?.end?.hasErrorPlaceholder || !!mergedErrorOptions?.end?.text,
              }}
              errorOnChange={(error) => {
                setCurrentTimepickerErrorMessages((current) => ({
                  ...current,
                  end: error || undefined,
                }));
              }}
              minTime={isSameDate(selectedDateRange.end, minDate) ? minDate : undefined}
              maxTime={isSameDate(selectedDateRange.end, maxDate) ? maxDate : undefined}
            />
          )}
        </RowContainer>
        {currentErrorMessages.end && <DatepickerRangeError errorText={currentErrorMessages.end} />}
      </FormFieldContainer>
    </DatepickerRangeWrapper>
  );
};
