import React, { FC, useEffect, useState } from 'react';
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
} from './elviaDatepickerRange.types';
import { Timepicker } from '@elvia/elvis-timepicker/react';

type Picker = 'startDate' | 'startTime' | 'endDate' | 'endTime';

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
  hasTimepicker = false,
  timepickerInterval = '15',
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
  const [openPicker, setOpenPicker] = useState<Picker>();
  const [isRequiredState, setIsRequiredState] = useState<IsRequired>();
  const [currentErrorMessages, setCurrentErrorMessages] = useState<CustomError>(emptyErrorMessage);
  const [shouldOpenNextPicker, setShouldOpenNextPicker] = useState(false);
  const [startTimepickerHasBeenTouched, setStartTimepickerHasBeenTouched] = useState(false);
  const [endTimepickerHasBeenTouched, setEndTimepickerHasBeenTouched] = useState(false);

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

  const setTime = (date: Date | number, when: 'start' | 'end'): Date => {
    const dateCopy = new Date(date);
    if (when === 'start') {
      dateCopy.setHours(0, 0, 0, 0);
    } else {
      dateCopy.setHours(23, 59, 59, 59);
    }

    return dateCopy;
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
      webcomponent.triggerEvent('valueOnChange', selectedDateRange);
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

  const handleStartDateValueOnChange = (newDate: Date | null, change: 'date' | 'time') => {
    setShouldOpenNextPicker(
      !selectedDateRange.start ||
        !selectedDateRange.end ||
        newDate?.getTime() !== selectedDateRange.start.getTime(),
    );
    // If start datepicker is set to a date after the end datepicker, set the end date to newValue.
    if (newDate) {
      let date = newDate;
      if (change === 'date' && !startTimepickerHasBeenTouched) {
        date = setTime(newDate, 'start');
        setStartTimepickerHasBeenTouched(false);
      }

      if (selectedDateRange?.end && date > selectedDateRange.end) {
        setSelectedDateRange({ start: date, end: date });
      } else {
        setSelectedDateRange((current) => {
          return { ...current, start: date };
        });
      }
    }
  };

  const handleEndDatepickerValueOnChange = (newDate: Date | null, change: 'date' | 'time') => {
    // If end datepicker is set to a date before the start date, set both to end datepicker value.
    if (newDate) {
      const date = newDate;
      if (change === 'date' && !endTimepickerHasBeenTouched) {
        setTime(newDate, 'end');
        setEndTimepickerHasBeenTouched(false);
      }

      if (selectedDateRange?.start && date < selectedDateRange.start) {
        setSelectedDateRange({ start: date, end: date });
      } else {
        setSelectedDateRange((current) => {
          return { ...current, end: date };
        });
      }
    }
  };

  const onStartPickerOpen = () => {
    setOpenPicker('startDate');

    if (hasSelectDateOnOpen && !selectedDateRange.start) {
      const endDate = selectedDateRange.end?.getTime();
      const startDate =
        endDate && endDate < Date.now() ? setTime(endDate, 'start') : setTime(new Date(), 'start');
      setSelectedDateRange((current) => {
        return { ...current, start: startDate };
      });
    }
  };

  const onEndPickerOpen = () => {
    setOpenPicker('endDate');

    if (hasSelectDateOnOpen && !selectedDateRange.end) {
      const startDate = selectedDateRange.start?.getTime();
      const endDate =
        startDate && Date.now() < startDate ? setTime(startDate, 'end') : setTime(new Date(), 'end');
      setSelectedDateRange((current) => {
        return { ...current, end: endDate };
      });
    }
  };

  const openNextPicker = (): void => {
    if (!shouldOpenNextPicker || !hasAutoOpenEndDatepicker) {
      return;
    }

    if (openPicker === 'startDate') {
      setOpenPicker(hasTimepicker ? 'startTime' : 'endDate');
    } else if (openPicker === 'startTime') {
      setOpenPicker('endDate');
    } else if (openPicker === 'endDate') {
      if (hasTimepicker) {
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
    isCompact,
    isFullWidth,
    isDisabled,
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
          valueOnChange={(date) => handleStartDateValueOnChange(date, 'date')}
          isRequired={isRequiredState?.start}
          onClose={openNextPicker}
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
        {hasTimepicker && (
          <Timepicker
            label=""
            isCompact={isCompact}
            isDisabled={isDisabled}
            value={startTimepickerHasBeenTouched ? selectedDateRange.start : undefined}
            valueOnChange={(time) => handleStartDateValueOnChange(time, 'time')}
            onInputFocus={() => setStartTimepickerHasBeenTouched(true)}
            isRequired={isRequiredState?.start}
            selectNowOnOpen={false}
            minuteInterval={timepickerInterval}
            onOpen={() => {
              setStartTimepickerHasBeenTouched(true);
              setOpenPicker('startTime');
            }}
            onClose={openNextPicker}
            isOpen={openPicker === 'startTime'}
          />
        )}
      </RowContainer>
      <RowContainer>
        <Datepicker
          {...passThroughProps}
          label={labelOptions?.end ?? defaultLabelOptions.end}
          value={selectedDateRange.end}
          valueOnChange={(date) => handleEndDatepickerValueOnChange(date, 'date')}
          isRequired={isRequiredState?.end}
          onClose={openNextPicker}
          onOpen={onEndPickerOpen}
          onReset={() => {
            setSelectedDateRange({ ...selectedDateRange, end: null });
          }}
          isOpen={openPicker === 'endDate'}
          dateRangeProps={{
            selectedDateRange: selectedDateRange,
            whichRangePicker: 'end',
          }}
          disableDate={disableDatesWrapper()?.end}
          errorOptions={errorOptions?.end}
          errorOnChange={(error: string) =>
            setCurrentErrorMessages((current) => ({ ...current, end: error }))
          }
          hasSelectDateOnOpen={false}
        ></Datepicker>
        {hasTimepicker && (
          <Timepicker
            label=""
            isCompact={isCompact}
            isDisabled={isDisabled}
            value={endTimepickerHasBeenTouched ? selectedDateRange.end : undefined}
            valueOnChange={(time) => handleEndDatepickerValueOnChange(time, 'time')}
            onInputFocus={() => setEndTimepickerHasBeenTouched(true)}
            isRequired={isRequiredState?.end}
            selectNowOnOpen={false}
            minuteInterval={timepickerInterval}
            onOpen={() => {
              setEndTimepickerHasBeenTouched(true);
              setOpenPicker('endTime');
            }}
            onClose={openNextPicker}
            isOpen={openPicker === 'endTime'}
          />
        )}
      </RowContainer>
    </DatepickerRangeWrapper>
  );
};

export default DatepickerRange;
