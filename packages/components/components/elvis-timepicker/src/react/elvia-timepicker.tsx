import React, { useEffect, useRef, useState } from 'react';
import {
  TimePickerContainer,
  TimePickerLabel,
  InputContainer,
  IconButton,
  LabelText,
} from './styledComponents';
import { Icon } from '@elvia/elvis-icon/react';
import { OverlayContainer } from './popup/overlayContainer';
import { ChangeType, ErrorType, TimepickerProps } from './elviaTimepicker.types';
import { useConnectedOverlay, useFocusTrap } from '@elvia/elvis-toolbox';
import { TimepickerInput } from './timepickerInput';
import { TimepickerError } from './error/timepickerError';
import { getErrorText } from './getErrorText';

export const Timepicker: React.FC<Partial<TimepickerProps>> = ({
  value,
  valueOnChange,
  errorOnChange,
  label = 'Velg tid',
  minuteInterval = '15',
  isCompact = false,
  isDisabled = false,
  isRequired = false,
  selectNowOnOpen = true,
  className,
  inlineStyle,
  webcomponent,
  ...rest
}) => {
  const [time, setTime] = useState<Date | undefined>(value);
  const [error, setError] = useState<ErrorType | undefined>();
  const connectedElementRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const openPopoverButtonRef = useRef<HTMLButtonElement>(null);
  const { isShowing, setIsShowing } = useConnectedOverlay(connectedElementRef, popoverRef, {
    offset: 8,
    horizontalPosition: 'center',
    verticalPosition: 'bottom',
    alignWidths: true,
  });

  const updateValue = (newTime: Date, emit = true): void => {
    setTime(newTime);

    if (!emit) {
      return;
    }

    if (!webcomponent && valueOnChange) {
      valueOnChange(newTime);
    } else if (webcomponent) {
      webcomponent.setProps({ value: newTime }, true);
    }
  };

  const setHourOrMinute = (type: ChangeType, value: number): void => {
    const newTime = time ? new Date(time) : new Date();

    if (!time) {
      newTime.setHours(0, 0, 0, 0);
    }

    if (type === 'hour') {
      newTime.setHours(value);
    } else {
      newTime.setMinutes(value);
    }

    updateValue(newTime);
  };

  const setVisibility = (isShowing: boolean): void => {
    setIsShowing(isShowing);

    if (!isShowing) {
      openPopoverButtonRef.current?.focus();
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

  useEffect(() => {
    if (!isShowing) {
      return;
    }

    if (isShowing && selectNowOnOpen && !time) {
      updateValue(new Date());
    }

    useFocusTrap(popoverRef);

    return () => useFocusTrap(popoverRef, true);
  }, [isShowing]);

  /**
   * Needed for webcomponent -> To update the default value
   */
  useEffect(() => value && updateValue(value, false), [value]);

  return (
    <TimePickerContainer className={className ?? ''} style={{ ...inlineStyle }} {...rest}>
      <TimePickerLabel isCompact={isCompact}>
        {!!label && (
          <LabelText data-test="label" isCompact={isCompact}>
            {label}
          </LabelText>
        )}
        <InputContainer
          ref={connectedElementRef}
          disabled={isDisabled}
          isCompact={isCompact}
          isActive={isShowing}
          isInvalid={!!error}
        >
          <TimepickerInput
            time={time}
            disabled={isDisabled}
            isCompact={isCompact}
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
            data-test="popover-toggle"
            type="button"
            aria-label="Åpne tidvelger"
            aria-haspopup="dialog"
          >
            <Icon name="clock" color={isDisabled ? 'disabled' : 'black'} size={isCompact ? 'xs' : 'sm'} />
          </IconButton>
        </InputContainer>
        {error && <TimepickerError errorType={error} isCompact={isCompact} />}
      </TimePickerLabel>
      {isShowing && (
        <OverlayContainer
          ref={popoverRef}
          onClose={() => setVisibility(false)}
          onChange={(type, value) => setHourOrMinute(type, value)}
          currentTime={time}
          minuteInterval={minuteInterval}
        />
      )}
    </TimePickerContainer>
  );
};

export default Timepicker;
