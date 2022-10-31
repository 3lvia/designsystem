import React, { useEffect, useRef, useState } from 'react';
import { Icon } from '@elvia/elvis-icon/react';
import { OverlayContainer } from './popup/overlayContainer';
import { ChangeType, ErrorType, TimepickerProps } from './elviaTimepicker.types';
import {
  useConnectedOverlay,
  useFocusTrap,
  IconButton,
  FormFieldContainer,
  FormFieldLabel,
  FormFieldInputContainer,
} from '@elvia/elvis-toolbox';
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
  errorOptions = { hideText: false, isErrorState: false },
  selectNowOnOpen = true,
  className,
  inlineStyle,
  webcomponent,
}) => {
  const [time, setTime] = useState<Date | undefined | null>(value);
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
  const { trapFocus, releaseFocusTrap } = useFocusTrap();

  const updateValue = (newTime: Date | null, emit = true): void => {
    setTime(newTime);

    if (!emit) {
      return;
    }

    if (!webcomponent && valueOnChange) {
      valueOnChange(newTime);
    } else if (webcomponent) {
      webcomponent.setProps({ value: newTime }, true);
      webcomponent.triggerEvent('valueOnChange', newTime);
    }
  };

  const setHourOrMinute = (type: ChangeType, value: number): void => {
    const newTime = time ? new Date(time) : new Date();

    if (!time) {
      newTime.setHours(0, 0, 0, 0);
    }

    if (type === 'hour') {
      newTime.setHours(value, newTime.getMinutes(), 0, 0);
    } else {
      newTime.setMinutes(value, 0, 0);
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
      const initialTime = new Date();
      initialTime.setSeconds(0, 0);
      updateValue(initialTime);
    }

    trapFocus(popoverRef);

    return () => releaseFocusTrap();
  }, [isShowing]);

  /**
   * Needed for webcomponent -> To update the default value
   */
  useEffect(() => {
    if (value) {
      updateValue(value, false);
    }
  }, [value]);

  return (
    <>
      <FormFieldContainer isCompact={isCompact} className={className ?? ''} style={{ ...inlineStyle }}>
        {!!label && <FormFieldLabel data-testid="label">{label}</FormFieldLabel>}
        <FormFieldInputContainer
          ref={connectedElementRef}
          isDisabled={isDisabled}
          isActive={isShowing}
          isInvalid={!!error || !!errorOptions.text || !!errorOptions.isErrorState}
        >
          <TimepickerInput
            time={time}
            disabled={isDisabled}
            onChange={updateValue}
            required={isRequired}
            onErrorChange={onError}
          />
          <IconButton
            disabled={isDisabled}
            isActive={isShowing}
            onClick={() => setVisibility(!isShowing)}
            ref={openPopoverButtonRef}
            size={isCompact ? 'sm' : 'md'}
            data-testid="popover-toggle"
            aria-label="Åpne tidvelger"
            aria-haspopup="dialog"
          >
            <Icon name="clock" color={isDisabled ? 'disabled' : 'black'} size={isCompact ? 'xs' : 'sm'} />
          </IconButton>
        </FormFieldInputContainer>
        {((error && !errorOptions.hideText) || errorOptions.text) && (
          <TimepickerError customText={errorOptions.text} errorType={error} />
        )}
      </FormFieldContainer>
      {isShowing && (
        <OverlayContainer
          ref={popoverRef}
          onClose={() => setVisibility(false)}
          onChange={(type, value) => setHourOrMinute(type, value)}
          currentTime={time}
          minuteInterval={minuteInterval}
        />
      )}
    </>
  );
};

export default Timepicker;
