import clock from '@elvia/elvis-assets-icons/dist/icons/clock';
import {
  ErrorOptions,
  FormFieldContainer,
  FormFieldInputContainer,
  FormFieldLabel,
  IconButton,
  IconWrapper,
  useConnectedOverlay,
  useFocusTrap,
} from '@elvia/elvis-toolbox';
import React, { FocusEventHandler, useEffect, useRef, useState } from 'react';

import { copyDay, isSameDay, isValidDate, localISOTime } from './dateHelpers';
import { DatepickerInput } from './datepickerInput';
import { DatepickerProps, ErrorType } from './elviaDatepicker.types';
import { DatepickerError } from './error/datepickerError';
import { getErrorText } from './getErrorText';
import { OverlayContainer } from './popup/overlayContainer';
import { validateDate } from './validateDate';

const defaultErrorOptions = {
  hideText: false,
  isErrorState: false,
  hasErrorPlaceholder: true,
} satisfies Partial<ErrorOptions>;

export const Datepicker: React.FC<DatepickerProps> = ({
  clearButtonText = 'Nullstill',
  dateRangeProps,
  onFocus,
  disableDate,
  errorOptions,
  hasOptionalText,
  hasSelectDateOnOpen = true,
  size = 'medium',
  isDisabled = false,
  isFullWidth = false,
  isOpen = false,
  isRequired = false,
  label = 'Velg dato',
  maxDate,
  minDate,
  onClose,
  onOpen,
  onReset,
  placeholder = 'dd.mm.åååå',
  resetTime,
  value,
  valueOnChange,
  valueOnChangeISOString,
  errorOnChange,
  className,
  inlineStyle,
  webcomponent,
}) => {
  const [date, setDate] = useState<Date | undefined | null>(value || null);
  const [error, setError] = useState<ErrorType | undefined>();
  const [minDateWithoutTime, setMinDateWithoutTime] = useState(minDate);
  const [maxDateWithoutTime, setMaxDateWithoutTime] = useState(maxDate);
  const inputRef = useRef<HTMLInputElement>(null);
  const connectedElementRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const openPopoverButtonRef = useRef<HTMLButtonElement>(null);
  const { trapFocus, releaseFocusTrap } = useFocusTrap();
  const [isInitialized, setIsInitialized] = useState(false);
  const { isShowing, setIsShowing } = useConnectedOverlay(connectedElementRef, popoverRef, {
    offset: 8,
    horizontalPosition: 'right-inside',
    verticalPosition: 'bottom',
    alignWidths: false,
  });

  const mergedErrorOptions: Partial<ErrorOptions> = { ...defaultErrorOptions, ...errorOptions };

  const handleValueOnChangeISOString = (newDate: Date | null): void => {
    let dateISO: string | null = null;
    if (newDate && isValidDate(newDate)) {
      dateISO = localISOTime(newDate).substring(0, 10);
    } else if (newDate === null) {
      dateISO = null;
    } else {
      dateISO = 'Invalid Date';
    }

    valueOnChangeISOString?.(dateISO);
    webcomponent?.triggerEvent('valueOnChangeISOString', dateISO);
  };

  const updateValue = (newDate: Date | null, emit = true): void => {
    if (resetTime) {
      newDate?.setHours(0, 0, 0, 0);
    } else if (!resetTime && date) {
      newDate?.setHours(date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds());
    }

    setDate(newDate);

    if (!emit) {
      return;
    }

    handleValueOnChangeISOString(newDate);
    valueOnChange?.(newDate);
    webcomponent?.setProps({ value: newDate }, true);
    webcomponent?.triggerEvent('valueOnChange', newDate);
  };

  const emitOnClose = () => {
    onClose?.();
    webcomponent?.triggerEvent('onClose');
  };

  const emitOnOpen = () => {
    onOpen?.();
    webcomponent?.triggerEvent('onOpen');
  };

  const setDateToFirstValidDate = () => {
    if (minDateWithoutTime && new Date().getTime() < minDateWithoutTime.getTime()) {
      updateValue(copyDay(minDateWithoutTime, new Date()));
    } else if (maxDateWithoutTime && new Date().getTime() > maxDateWithoutTime.getTime()) {
      updateValue(copyDay(maxDateWithoutTime, new Date()));
    } else {
      updateValue(new Date());
    }
  };

  const revalidateInputValue = () => {
    const [day, month, year] = (inputRef.current?.value ?? '').split('.');
    const error = validateDate({
      inputValue: { day: parseInt(day), month: parseInt(month), year: parseInt(year) },
      minDate: minDateWithoutTime,
      maxDate: maxDateWithoutTime,
      required: isRequired,
    });

    switch (error) {
      case 'invalidDate':
      case 'beforeMinDate':
      case 'afterMaxDate':
      case 'required':
        onError(error);
        break;
      default:
        onError();
        break;
    }
  };

  const setVisibility = (isShowing: boolean): void => {
    setIsShowing(isShowing);

    if (!isShowing) {
      openPopoverButtonRef.current?.focus();
      revalidateInputValue();

      emitOnClose();
      releaseFocusTrap();
    } else {
      emitOnOpen();

      if (hasSelectDateOnOpen && !date) {
        setDateToFirstValidDate();
      }
    }
  };

  useEffect(() => {
    if (isShowing && popoverRef.current) {
      trapFocus(popoverRef);
    }

    return () => releaseFocusTrap();
  }, [isShowing]);

  const onError = (newError?: ErrorType): void => {
    if (newError === error) {
      return;
    }
    setError(newError);

    const errorText = getErrorText(newError, minDate, maxDate, dateRangeProps?.showTimeInError);

    errorOnChange?.(errorText);
    webcomponent?.triggerEvent('errorOnChange', errorText);
  };

  const triggerResetEvent = (): void => {
    onReset?.();
    webcomponent?.triggerEvent('onReset');
  };

  // We need to re-initiate the focus-trap since the DOM has changed
  const reinitiateFocusTrap = () => {
    releaseFocusTrap();
    trapFocus(popoverRef);
  };

  const validateMinMax = (d?: Date | null): void => {
    if (!d) {
      onError();
      return;
    }

    const error = validateDate({
      inputValue: { year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate() },
      minDate: minDateWithoutTime,
      maxDate: maxDateWithoutTime,
      required: isRequired,
    });

    switch (error) {
      case 'invalidDate':
      case 'beforeMinDate':
      case 'afterMaxDate':
        onError(error);
        return;
      default:
        onError();
        return;
    }
  };

  const handleTriggerButtonBlur: FocusEventHandler<HTMLButtonElement> = (event) => {
    // Don't run validation on blur of the trigger button if new focused element is the input field
    // Don't run validation on blur when opening the overlay
    if (event.relatedTarget?.isSameNode(inputRef.current) || isShowing) {
      return;
    }

    const inputValue = inputRef.current?.value ?? '';

    const [dayString, monthString, yearString] = inputValue.split('.');
    const [day, month, year] = [parseInt(dayString), parseInt(monthString), parseInt(yearString)];

    const error = validateDate({
      inputValue: { day, month, year },
      minDate: minDateWithoutTime,
      maxDate: maxDateWithoutTime,
      required: isRequired,
    });

    let newDate: Date | null = new Date(`${year}/${month}/${day}`);
    newDate = isValidDate(newDate) ? newDate : null;

    if (!isSameDay(newDate, date) && newDate !== date) {
      updateValue(newDate);
    }
    onError(error === 'valid' ? undefined : error);
  };

  // Needed for webcomponent -> To update the default value
  useEffect(() => {
    if (date && !value && isRequired && isInitialized) {
      onError('required');
    }
    setDate(value);
  }, [value]);

  useEffect(() => {
    if (isInitialized) {
      validateMinMax(value);
    }
  }, [value, maxDateWithoutTime, minDateWithoutTime]);

  // Allows app to open the datepicker programmatically
  useEffect(() => {
    if (isShowing !== isOpen) {
      // Allow the DOM to stabilize
      setTimeout(() => {
        setVisibility(isOpen);
      });
    }
  }, [isOpen]);

  useEffect(() => {
    if (minDate) {
      const d = new Date(minDate);
      d.setHours(0, 0, 0, 0);
      if (!isSameDay(d, minDateWithoutTime)) {
        setMinDateWithoutTime(d);
      }
    } else {
      setMinDateWithoutTime(undefined);
    }
  }, [minDate]);

  useEffect(() => {
    if (maxDate) {
      const d = new Date(maxDate);
      d.setHours(23, 59, 59, 59); // End of day
      if (!isSameDay(d, maxDateWithoutTime)) {
        setMaxDateWithoutTime(d);
      }
    } else {
      setMaxDateWithoutTime(undefined);
    }
  }, [maxDate]);

  // We flag when the component is initialized, so that we don't
  // run validation on init.
  useEffect(() => setIsInitialized(true), []);

  return (
    <>
      <FormFieldContainer
        size={size}
        className={className ?? ''}
        style={{ ...inlineStyle }}
        isFullWidth={isFullWidth}
        isDisabled={isDisabled}
        hasErrorPlaceholder={!!error || !!mergedErrorOptions.hasErrorPlaceholder || !!mergedErrorOptions.text}
        isActive={isShowing}
        isInvalid={!!error || !!mergedErrorOptions.text || !!mergedErrorOptions.isErrorState}
        data-testid="wrapper"
      >
        {!!label && (
          <FormFieldLabel data-testid="label" hasOptionalText={hasOptionalText}>
            {label}
          </FormFieldLabel>
        )}
        <FormFieldInputContainer ref={connectedElementRef} data-testid="input-container">
          <DatepickerInput
            ref={inputRef}
            date={date}
            disabled={isDisabled}
            placeholder={placeholder}
            onChange={updateValue}
            onFocus={() => onFocus?.()}
            required={isRequired}
            onErrorChange={onError}
            minDate={minDateWithoutTime}
            maxDate={maxDateWithoutTime}
            overlayTriggerRef={openPopoverButtonRef}
          />
          <IconButton
            disabled={isDisabled}
            isActive={isShowing}
            onClick={() => {
              onFocus?.();
              setVisibility(!isShowing);
            }}
            onBlur={handleTriggerButtonBlur}
            ref={openPopoverButtonRef}
            size={size}
            data-testid="popover-toggle"
            aria-label="Åpne datovelger"
            aria-haspopup="dialog"
          >
            <IconWrapper
              icon={clock}
              color={isDisabled ? 'text-disabled-1' : undefined}
              size={size === 'small' ? 'xs' : 'sm'}
            />
          </IconButton>
        </FormFieldInputContainer>
        {((error && !mergedErrorOptions.hideText) || mergedErrorOptions.text) && (
          <DatepickerError
            customText={mergedErrorOptions.text}
            errorText={getErrorText(error, minDate, maxDate, dateRangeProps?.showTimeInError)}
          />
        )}
      </FormFieldContainer>
      {isShowing && (
        <OverlayContainer
          ref={popoverRef}
          onClose={() => setVisibility(false)}
          onChange={(newDate) => updateValue(newDate)}
          onCalendarViewToggle={reinitiateFocusTrap}
          onReset={triggerResetEvent}
          selectedDate={date}
          clearButtonText={clearButtonText}
          minDate={minDateWithoutTime}
          maxDate={maxDateWithoutTime}
          disableDate={disableDate}
          dateRangeProps={dateRangeProps}
        />
      )}
    </>
  );
};
