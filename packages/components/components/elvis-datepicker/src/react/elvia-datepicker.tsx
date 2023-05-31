import React, { useEffect, useRef, useState } from 'react';
import calendar from '@elvia/elvis-assets-icons/dist/icons/calendar';
import { OverlayContainer } from './popup/overlayContainer';
import { ErrorType, DatepickerProps } from './elviaDatepicker.types';
import {
  useConnectedOverlay,
  useFocusTrap,
  IconButton,
  FormFieldContainer,
  FormFieldLabel,
  FormFieldInputContainer,
  IconWrapper,
} from '@elvia/elvis-toolbox';
import { DatepickerInput } from './datepickerInput';
import { DatepickerError } from './error/datepickerError';
import { getErrorText } from './getErrorText';
import { copyDay, isValidDate } from './dateHelpers';

export const Datepicker: React.FC<DatepickerProps> = ({
  clearButtonText = 'Nullstill',
  dateRangeProps,
  onFocus,
  disableDate,
  errorOptions = { hideText: false, isErrorState: false, hasErrorPlaceholder: true },
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
  const connectedElementRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const openPopoverButtonRef = useRef<HTMLButtonElement>(null);
  const { trapFocus, releaseFocusTrap } = useFocusTrap();
  const [isInitialized, setIsInitialized] = useState(false);
  const { isShowing, setIsShowing, updatePreferredPosition } = useConnectedOverlay(
    connectedElementRef,
    popoverRef,
    {
      offset: 8,
      horizontalPosition: 'right-inside',
      verticalPosition: 'bottom',
      alignWidths: false,
    },
  );

  const handleValueOnChangeISOString = (newDate: Date | null): void => {
    let dateISO;
    if (newDate && isValidDate(newDate)) {
      dateISO = newDate.toISOString().substring(0, 10);
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
    if (!webcomponent && valueOnChange) {
      valueOnChange(newDate);
    } else if (webcomponent) {
      webcomponent.setProps({ value: newDate }, true);
      webcomponent.triggerEvent('valueOnChange', newDate);
    }
  };

  const emitOnClose = () => {
    onClose?.();
    webcomponent?.triggerEvent('onClose');
  };

  const emitOnOpen = () => {
    onOpen?.();
    webcomponent?.triggerEvent('onOpen');
  };

  const setVisibility = (isShowing: boolean): void => {
    setIsShowing(isShowing);

    if (!isShowing) {
      openPopoverButtonRef.current?.focus();

      if (isRequired && (!error || error === 'required')) {
        setError(!date ? 'required' : undefined);
      }

      emitOnClose();
    } else {
      emitOnOpen();
    }
  };

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

  const validateDate = (dates: { d?: Date | null; min?: Date; max?: Date }): void => {
    const { d, min, max } = dates;
    if (!isInitialized) {
      return;
    }

    if (!d) {
      onError(isRequired ? 'required' : undefined);
    } else {
      if (d.getFullYear() < 1800 || !isValidDate(d)) {
        onError('invalidDate');
      } else if (min && d.getTime() < min.getTime()) {
        onError('beforeMinDate');
      } else if (max && d.getTime() > max.getTime()) {
        onError('afterMaxDate');
      } else {
        onError();
      }
    }
  };

  useEffect(() => {
    if (!isShowing) {
      return;
    }

    if (hasSelectDateOnOpen && !date) {
      if (minDate && new Date().getTime() < minDate.getTime()) {
        updateValue(copyDay(minDate, new Date()));
      } else if (maxDate && new Date().getTime() > maxDate.getTime()) {
        updateValue(copyDay(maxDate, new Date()));
      } else {
        updateValue(new Date());
      }
    }

    trapFocus(popoverRef);

    /** We need to update the position, because the dimensions of the
     * overlay has changed.
     */
    setTimeout(() => {
      updatePreferredPosition();
    });

    return () => releaseFocusTrap();
  }, [isShowing]);

  // Needed for webcomponent -> To update the default value
  useEffect(() => {
    setDate(value);
  }, [value]);

  useEffect(() => {
    validateDate({ d: value, min: minDate, max: maxDate });
  }, [value, maxDate, minDate]);

  // Allows app to open the datepicker programatically
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
      setMinDateWithoutTime(d);
    } else {
      setMinDateWithoutTime(undefined);
    }
  }, [minDate]);

  useEffect(() => {
    if (maxDate) {
      const d = new Date(maxDate);
      d.setHours(23, 59, 59, 59); // End of day
      setMaxDateWithoutTime(d);
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
        hasErrorPlaceholder={!!error || !!errorOptions.hasErrorPlaceholder || !!errorOptions.text}
        isActive={isShowing}
        isInvalid={!!error || !!errorOptions.text || !!errorOptions.isErrorState}
        data-testid="wrapper"
      >
        {!!label && (
          <FormFieldLabel data-testid="label" hasOptionalText={hasOptionalText}>
            {label}
          </FormFieldLabel>
        )}
        <FormFieldInputContainer ref={connectedElementRef} data-testid="input-container">
          <DatepickerInput
            date={date}
            disabled={isDisabled}
            placeholder={placeholder}
            onChange={updateValue}
            onFocus={() => onFocus?.()}
            required={isRequired}
            currentError={error}
            onErrorChange={onError}
            minDate={minDate}
            maxDate={maxDate}
          />
          <IconButton
            disabled={isDisabled}
            isActive={isShowing}
            onClick={() => {
              onFocus?.();
              setVisibility(!isShowing);
            }}
            ref={openPopoverButtonRef}
            size={size === 'small' ? 'sm' : 'md'}
            data-testid="popover-toggle"
            aria-label="Åpne datovelger"
            aria-haspopup="dialog"
          >
            <IconWrapper
              icon={calendar}
              color={isDisabled ? 'text-disabled-1' : undefined}
              size={size === 'small' ? 'xs' : 'sm'}
            />
          </IconButton>
        </FormFieldInputContainer>
        {((error && !errorOptions.hideText) || errorOptions.text) && (
          <DatepickerError
            customText={errorOptions.text}
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

export default Datepicker;
