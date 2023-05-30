import React, { useEffect, useRef, useState } from 'react';
import { OverlayContainer } from './popup/overlayContainer';
import { ChangeType, ErrorType, TimepickerProps } from './elviaTimepicker.types';
import {
  useConnectedOverlay,
  useFocusTrap,
  IconButton,
  FormFieldContainer,
  FormFieldLabel,
  FormFieldInputContainer,
  IconWrapper,
} from '@elvia/elvis-toolbox';
import clock from '@elvia/elvis-assets-icons/dist/icons/clock';
import { TimepickerInput } from './timepickerInput';
import { TimepickerError } from './error/timepickerError';
import { getErrorText } from './getErrorText';

export const Timepicker: React.FC<Partial<TimepickerProps>> = ({
  value,
  valueOnChange,
  errorOnChange,
  label = 'Velg tid',
  minuteInterval = '15',
  size = 'medium',
  isFullWidth = false,
  isDisabled = false,
  isRequired = false,
  isOpen = false,
  errorOptions = { hideText: false, isErrorState: false, hasErrorPlaceholder: true },
  onOpen,
  onClose,
  onFocus,
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
    horizontalPosition: 'right-inside',
    verticalPosition: 'bottom',
    alignWidths: false,
  });
  const { trapFocus, releaseFocusTrap } = useFocusTrap();

  const updateValue = (newTime: Date | null, emit = true): void => {
    setTime(newTime);

    if (!emit) {
      return;
    }

    valueOnChange?.(newTime);
    webcomponent?.setProps({ value: newTime }, true);
    webcomponent?.triggerEvent('valueOnChange', newTime);
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

    const errorText = getErrorText(newError);
    errorOnChange?.(errorText);
    webcomponent?.triggerEvent('errorOnChange', errorText);
  };

  const emitOnClose = () => {
    onClose?.();
    webcomponent?.triggerEvent('onClose');
  };

  const emitOnOpen = () => {
    onOpen?.();
    webcomponent?.triggerEvent('onOpen');
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

  // Allows app to open the time picker programatically
  useEffect(() => {
    if (isShowing !== isOpen) {
      setVisibility(isOpen);
    }
  }, [isOpen]);

  /**
   * Needed for webcomponent -> To update the default value
   */
  useEffect(() => {
    updateValue(value || null, false);
  }, [value]);

  return (
    <>
      <FormFieldContainer
        size={size}
        className={className ?? ''}
        style={{ ...inlineStyle }}
        isDisabled={isDisabled}
        isFullWidth={isFullWidth}
        isActive={isShowing}
        isInvalid={!!error || !!errorOptions.text || !!errorOptions.isErrorState}
        hasErrorPlaceholder={!!error || !!errorOptions.hasErrorPlaceholder || !!errorOptions.text}
      >
        {!!label && <FormFieldLabel data-testid="label">{label}</FormFieldLabel>}
        <FormFieldInputContainer ref={connectedElementRef}>
          <TimepickerInput
            time={time}
            disabled={isDisabled}
            isFullWidth={isFullWidth}
            onChange={updateValue}
            onFocus={() => onFocus?.()}
            required={isRequired}
            onErrorChange={onError}
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
            aria-label="Åpne tidvelger"
            aria-haspopup="dialog"
          >
            <IconWrapper
              icon={clock}
              color={isDisabled ? 'text-disabled-1' : undefined}
              size={size === 'small' ? 'xs' : 'sm'}
            />
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
