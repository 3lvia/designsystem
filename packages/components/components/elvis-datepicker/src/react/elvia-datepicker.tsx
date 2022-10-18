import React, { useEffect, useRef, useState } from 'react';
import {
  DatePickerContainer,
  DatePickerLabel,
  InputContainer,
  IconButton,
  LabelText,
} from './styledComponents';
import { Icon } from '@elvia/elvis-icon/react';
import { OverlayContainer } from './popup/overlayContainer';
import { ErrorType, DatepickerProps } from './elviaDatepicker.types';
import { useConnectedOverlay, useFocusTrap } from '@elvia/elvis-toolbox';
import { DatepickerInput } from './datepickerInput';
import { TimepickerError } from './error/datepickerError';
import { getErrorText } from './getErrorText';
import { formatISO, isValid } from 'date-fns';

export const Datepicker: React.FC<DatepickerProps> = ({
  value,
  label = 'Velg dato',
  isCompact = false,
  isDisabled = false,
  isFullWidth = false,
  isRequired = false,
  hasSelectDateOnOpen = true,
  customError,
  minDate,
  maxDate,
  valueOnChange,
  valueOnChangeISOString,
  onOpen,
  onClose,
  onReset,
  webcomponent,
  placeholder = 'dd.mm.åååå',
  isOpen = false,
  className,
  inlineStyle,
  hasOptionalText,
  showValidation,
  showValidationState = true,
  clearButtonText = 'Nullstill',
  isErrorState,
  hasValidation = true,
  hasErrorPlaceholderElement = true,
  errorOnChange,
  disableDate,
  dateRangeProps,
}) => {
  const [date, setDate] = useState<Date | undefined | null>(value);
  const [error, setError] = useState<ErrorType | undefined>();
  const connectedElementRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const openPopoverButtonRef = useRef<HTMLButtonElement>(null);
  const { isShowing, setIsShowing } = useConnectedOverlay(connectedElementRef, popoverRef, {
    offset: 8,
    horizontalPosition: 'center',
    verticalPosition: 'bottom',
    alignWidths: false,
  });

  /**
   * Handle valueOnChangeISOString event. If newDate is not valid, formatISO crashes the component.
   */
  const handleValueOnChangeISOString = (newDate: Date | null): void => {
    let dateISO;
    if (newDate && isValid(newDate)) {
      dateISO = formatISO(newDate, { representation: 'date' });
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

  const setVisibility = (isShowing: boolean): void => {
    setIsShowing(isShowing);

    if (!isShowing) {
      openPopoverButtonRef.current?.focus();

      if (!webcomponent && onClose) {
        onClose();
      } else if (webcomponent) {
        webcomponent.triggerEvent('onClose');
      }
    } else {
      if (!webcomponent && onOpen) {
        onOpen();
      } else if (webcomponent) {
        webcomponent.triggerEvent('onOpen');
      }
    }
  };

  const onError = (newError?: ErrorType): void => {
    if (newError === error) {
      return;
    }
    setError(newError);

    const errorText = getErrorText(newError);
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
  const onCalendarViewToggle = () => {
    useFocusTrap(popoverRef, true);
    useFocusTrap(popoverRef);
  };

  useEffect(() => {
    if (!isShowing) {
      return;
    }

    if (isShowing && hasSelectDateOnOpen && !date) {
      updateValue(new Date());
    }

    useFocusTrap(popoverRef);

    return () => useFocusTrap(popoverRef, true);
  }, [isShowing]);

  // Needed for webcomponent -> To update the default value
  useEffect(() => {
    if (value != null) {
      updateValue(value, false);
    }
  }, [value]);

  // Allows app to open the datepicker programatically
  useEffect(() => {
    setVisibility(isOpen);
  }, [isOpen]);

  return (
    <DatePickerContainer>
      <DatePickerLabel
        isCompact={isCompact}
        className={className ?? ''}
        style={{ ...inlineStyle }}
        fullWidth={isFullWidth}
      >
        {!!label && (
          <LabelText data-testid="label" isCompact={isCompact} hasOptionalText={hasOptionalText}>
            {label}
          </LabelText>
        )}
        <InputContainer
          ref={connectedElementRef}
          disabled={isDisabled}
          isCompact={isCompact}
          isActive={isShowing}
          isInvalid={!!error || !!customError || !!isErrorState}
        >
          <DatepickerInput
            date={date}
            disabled={isDisabled}
            isCompact={isCompact}
            placeholder={placeholder}
            onChange={updateValue}
            required={isRequired}
            onErrorChange={onError}
          />
          <IconButton
            disabled={isDisabled}
            active={isShowing}
            onClick={() => setVisibility(!isShowing)}
            ref={openPopoverButtonRef}
            size={isCompact ? 'small' : 'medium'}
            data-testid="popover-toggle"
            type="button"
            aria-label="Åpne tidvelger"
            aria-haspopup="dialog"
          >
            <Icon name="calendar" color={isDisabled ? 'disabled' : 'black'} size={isCompact ? 'xs' : 'sm'} />
          </IconButton>
        </InputContainer>
        {((error && showValidationState) || customError) && (
          <TimepickerError customText={customError} errorType={error} isCompact={isCompact} />
        )}
      </DatePickerLabel>
      {isShowing && (
        <OverlayContainer
          ref={popoverRef}
          onClose={() => setVisibility(false)}
          onChange={(newDate) => updateValue(newDate)}
          onCalendarViewToggle={onCalendarViewToggle}
          onReset={triggerResetEvent}
          selectedDate={date}
          clearButtonText={clearButtonText}
          minDate={minDate}
          maxDate={maxDate}
        />
      )}
    </DatePickerContainer>
  );
};

export default Datepicker;
