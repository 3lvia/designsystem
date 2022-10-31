import React, { useEffect, useRef, useState } from 'react';
import { Icon } from '@elvia/elvis-icon/react';
import { OverlayContainer } from './popup/overlayContainer';
import { ErrorType, DatepickerProps } from './elviaDatepicker.types';
import {
  useConnectedOverlay,
  useFocusTrap,
  IconButton,
  FormFieldContainer,
  FormFieldLabel,
  FormFieldInputContainer,
} from '@elvia/elvis-toolbox';
import { DatepickerInput } from './datepickerInput';
import { DatepickerError } from './error/datepickerError';
import { getErrorText } from './getErrorText';
import { copyDay, isValidDate } from './dateHelpers';

export const Datepicker: React.FC<DatepickerProps> = ({
  clearButtonText = 'Nullstill',
  dateRangeProps,
  disableDate,
  errorOptions = { hideText: false, isErrorState: false },
  hasOptionalText,
  hasSelectDateOnOpen = true,
  isCompact = false,
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
  const { isShowing, setIsShowing, updatePreferredPosition } = useConnectedOverlay(
    connectedElementRef,
    popoverRef,
    {
      offset: 8,
      horizontalPosition: 'left-inside',
      verticalPosition: 'bottom',
      alignWidths: false,
    },
  );

<<<<<<< HEAD
  const selectedDateRange = dateRangeProps?.selectedDateRange;
  const hoveredDateRange = dateRangeProps?.hoveredDateRange;
  const onDateElementPointerMove = dateRangeProps?.onDateElementPointerMove;
  const onDatepickerPopoverPointerMove = dateRangeProps?.onDatepickerPopoverPointerMove;
  const whichRangePicker = dateRangeProps?.whichRangePicker;

  // Unicode character U+00AD - Hack used to avoid date-fns from formatting date before date is valid
  const unicodeChar = '­';
  const showError =
    (showValidationState || customError) &&
    ((showValidation && currentErrorMessage !== '') ||
      ((!hasFocus || hasShownError) && (customError || (currentErrorMessage !== '' && hasHadFocus))));

  useEffect(() => {
    if (showError) {
      setHasShownError(true);
    } else if (currentErrorMessage === '') {
      setHasShownError(false);
    }
  }, [showError, currentErrorMessage]);

  useEffect(() => {
    setIsDatepickerOpen(isOpen);
  }, [isOpen]);

  useEffect(() => {
    hasValidation && validateDate(selectedDate);
  }, [minDate]);

  useEffect(() => {
    hasValidation && validateDate(selectedDate);
  }, [maxDate]);

  /**
   * Needed for webcomponent -> To update the default value
   */
  useEffect(() => handleDateChange(value), [value]);

  useEffect(() => {
    updateCaretPositionWhenDotIsAdded();
  }, [selectedDate]);

  /**
   * When there are changes to the selected date and they have not been emitted yet,
   * emit the change once the datepicker does not have focus.
   */
  useEffect(() => {
    !hasFocus && emitValueOnChangeEvents();
  }, [hasChangeToEmit, hasFocus]);

  /**
   * Used to update hovered date range highlight when user changes date with keyboard.
   */
  useEffect(() => {
    if (selectedDate) {
      onDateElementPointerMove?.(selectedDate);
    }
  }, [selectedDate]);

  /**
   * Start outline listener
   *
   * Set initial focused date based on minDate and maxDate
   */
  useEffect(() => {
    addOutlineListenerDatepickerPopover(datepickerRef.current);

    if (hasSelectDateOnOpen) return;
    if (maxDate) {
      setInitialFocusedDate(maxDate);
    } else if (minDate) {
      setInitialFocusedDate(minDate);
    }

    return () => {
      removeOutlineListenerDatepickerPopover(datepickerRef.current);
    };
  }, []);

  /**
   * Update error state when:
   * - datepicker has had focus.
   * - datepicker open state changes.
   */
  useEffect(() => {
    validateDate(selectedDate);
  }, [hasHadFocus, isDatepickerOpen]);

  /**
   * Trigger `updateInputWithSelectedDate` when datepicker is opened by the `isOpen`-prop.
   */
  useEffect(() => {
    if (isDatepickerOpen) {
      updateInputWithSelectedDate();
    }
  }, [isDatepickerOpen]);

  /**
   * Sets the selected date and dispatches the valueOnChange event
   */
  const handleDateChange = (date: Date | null): void => {
    if (date?.toString() === selectedDate?.toString()) {
      return;
    }
    hasValidation && validateDate(date);

    // Set time component of the selected date to 0 by creating a new date object.
    const newDate = date ? new Date(date.getFullYear(), date.getMonth(), date.getDate()) : null;
    if (isEqual(selectedDate, newDate)) return;
    setSelectedDate(newDate);
    setShouldHaveSelected(true);
    setHasChangeToEmit(true);
  };

  /**
   * Emits a new valueOnChange event.
   */
  const emitValueOnChangeEvents = (): void => {
    if (hasChangeToEmit) {
      handleValueOnChangeISOString(selectedDate);
      if (!webcomponent) {
        valueOnChange?.(selectedDate);
      } else {
        webcomponent.setProps({ value: selectedDate }, true);
        webcomponent.triggerEvent('valueOnChange', selectedDate);
      }
      setHasChangeToEmit(false);
    }
  };

  /**
   * Handle valueOnChangeISOString event. If newDate is not valid, formatISO crashes the component.
   */
=======
>>>>>>> origin/master
  const handleValueOnChangeISOString = (newDate: Date | null): void => {
    let dateISO;
    if (newDate && isValidDate(newDate)) {
      dateISO = newDate.toISOString().substring(0, 10);
    } else if (newDate === null) {
      dateISO = null;
    } else {
      dateISO = 'Invalid Date';
    }
    if (!webcomponent) {
      valueOnChangeISOString?.(dateISO);
    } else {
      webcomponent.triggerEvent('valueOnChangeISOString', dateISO);
    }
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
    }
  };

  const emitOnClose = () => {
    if (!webcomponent && onClose) {
      onClose();
    } else if (webcomponent) {
      webcomponent.triggerEvent('onClose');
    }
  };

  const emitOnOpen = () => {
    if (!webcomponent && onOpen) {
      onOpen();
    } else if (webcomponent) {
      webcomponent.triggerEvent('onOpen');
    }
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

    const errorText = getErrorText(newError, minDate, maxDate);
    if (!webcomponent && errorOnChange) {
      errorOnChange(errorText);
    } else if (webcomponent) {
      webcomponent.triggerEvent('errorOnChange', errorText);
    }
  };

  const triggerResetEvent = (): void => {
    if (!webcomponent && onReset) {
      onReset();
    } else if (webcomponent) {
      webcomponent.triggerEvent('onReset');
    }
  };

  // We need to re-initiate the focus-trap since the DOM has changed
  const reinitiateFocusTrap = () => {
    releaseFocusTrap();
    trapFocus(popoverRef);
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
  useEffect(() => setDate(value), [value]);

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

  return (
    <>
      <FormFieldContainer
        isCompact={isCompact}
        className={className ?? ''}
        style={{ ...inlineStyle }}
        fullWidth={isFullWidth}
        data-testid="wrapper"
      >
        {!!label && (
          <FormFieldLabel data-testid="label" hasOptionalText={hasOptionalText}>
            {label}
          </FormFieldLabel>
        )}
        <FormFieldInputContainer
          ref={connectedElementRef}
          isDisabled={isDisabled}
          isActive={isShowing}
          isInvalid={!!error || !!errorOptions.text || !!errorOptions.isErrorState}
          data-testid="input-container"
        >
          <DatepickerInput
            date={date}
            disabled={isDisabled}
            placeholder={placeholder}
            onChange={updateValue}
            required={isRequired}
            currentError={error}
            onErrorChange={onError}
            minDate={minDate}
            maxDate={maxDate}
          />
          <IconButton
            disabled={isDisabled}
            isActive={isShowing}
            onClick={() => setVisibility(!isShowing)}
            ref={openPopoverButtonRef}
            size={isCompact ? 'sm' : 'md'}
            data-testid="popover-toggle"
            aria-label="Åpne datovelger"
            aria-haspopup="dialog"
          >
            <Icon name="calendar" color={isDisabled ? 'disabled' : 'black'} size={isCompact ? 'xs' : 'sm'} />
          </IconButton>
        </FormFieldInputContainer>
        {((error && !errorOptions.hideText) || errorOptions.text) && (
          <DatepickerError customText={errorOptions.text} errorText={getErrorText(error, minDate, maxDate)} />
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
