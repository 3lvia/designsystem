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
export type IsErrorState = Partial<BothDatepickers<boolean>>;
export type CustomError = Partial<BothDatepickers<string>>;

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
  hasAutoOpenEndDatepicker?: boolean;
  showValidationState?: boolean;
  isErrorState?: IsErrorState;
  customError?: CustomError;
  hasErrorPlaceholderElement?: boolean;
  errorOnChange?: (errors: CustomError) => void;
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
  isVertical,
  hasSelectDateOnOpen,
  hasAutoOpenEndDatepicker,
  showValidationState = true,
  isErrorState,
  customError,
  hasErrorPlaceholderElement = true,
  errorOnChange,
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
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const [currentErrorMessages, setCurrentErrorMessages] = useState<CustomError>(emptyErrorMessage);

  useEffect(() => {
    const getWindowDimensions = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', getWindowDimensions);
    return () => {
      window.removeEventListener('resize', getWindowDimensions);
    };
  });

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
    // Update hoveredDateRange, needed for keyboard navigation highlighting
    setHoveredDateRange(selectedDateRange);

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

  const handleEndDatepickerDateElementPointerMove = (day: Date, event?: PointerEvent<HTMLDivElement>) => {
    const isPointerEventAndTargetIsDayElementInCalendar =
      event && event.target instanceof Element && event.target.classList.contains('ewc-datepicker__day');

    if (isPointerEventAndTargetIsDayElementInCalendar || !event) {
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

  const handleStartDatepickerDateElementPointerMove = (day: Date, event?: PointerEvent<HTMLDivElement>) => {
    const isPointerEventAndTargetIsDayElementInCalendar =
      event && event.target instanceof Element && event.target.classList.contains('ewc-datepicker__day');

    if (isPointerEventAndTargetIsDayElementInCalendar || !event) {
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
    hasSelectDateOnOpen,
    showValidationState,
    hasErrorPlaceholderElement: hasErrorPlaceholderElement && windowWidth > 767 && !isVertical,
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
          setHoveredDateRange({ ...selectedDateRange, start: null });
          setSelectedDateRange({ ...selectedDateRange, start: null });
        }}
        dateRangeProps={{
          selectedDateRange: selectedDateRange,
          hoveredDateRange: hoveredDateRange,
          onDateElementPointerMove: handleStartDatepickerDateElementPointerMove,
          onDatepickerPopoverPointerMove: handleStartDatepickerPopoverPointerMove,
          whichRangePicker: 'start',
        }}
        disableDate={disableDatesWrapper()?.start}
        customError={customError?.start}
        isErrorState={isErrorState?.start}
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
          setHoveredDateRange({ ...selectedDateRange, end: null });
          setSelectedDateRange({ ...selectedDateRange, end: null });
        }}
        isOpen={endDatepickerIsOpen}
        dateRangeProps={{
          selectedDateRange: selectedDateRange,
          hoveredDateRange: hoveredDateRange,
          onDateElementPointerMove: handleEndDatepickerDateElementPointerMove,
          onDatepickerPopoverPointerMove: handleEndDatepickerPopoverPointerMove,
          whichRangePicker: 'end',
        }}
        disableDate={disableDatesWrapper()?.end}
        customError={customError?.end}
        isErrorState={isErrorState?.end}
        errorOnChange={(error: string) => setCurrentErrorMessages((current) => ({ ...current, end: error }))}
      ></Datepicker>
    </DatepickerRangeWrapper>
  );
};

export default DatepickerRange;
