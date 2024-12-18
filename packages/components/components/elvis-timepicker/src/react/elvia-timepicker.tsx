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
  useLanguage,
  useUpdateEffect,
} from '@elvia/elvis-toolbox';
import React, { useEffect, useRef, useState } from 'react';

import { TimepickerProps } from './elviaTimepicker.types';
import { TimepickerError } from './error/timepickerError';
import { getErrorText } from './getErrorText';
import { OverlayContainer } from './popup/overlayContainer';
import { ChangeType, ErrorType } from './publicApi.public';
import { isAfter, isBefore } from './timeHelpers';
import { TimepickerInput } from './timepickerInput';

const defaultErrorOptions = {
  hideText: false,
  isErrorState: false,
  hasErrorPlaceholder: true,
} satisfies Partial<ErrorOptions>;

let elvisTimePickerErrorId = 0;

export const Timepicker: React.FC<Partial<TimepickerProps>> = ({
  value,
  valueOnChange,
  errorOnChange,
  label,
  maxTime,
  minTime,
  minuteInterval = '15',
  size = 'medium',
  hasSecondPicker = false,
  isFullWidth = false,
  isDisabled = false,
  isRequired = false,
  isOpen = false,
  errorOptions,
  onOpen,
  onClose,
  onFocus,
  selectNowOnOpen = true,
  className,
  inlineStyle,
  webcomponent,
}) => {
  const lang = useLanguage();

  const labels =
    lang === 'no'
      ? {
          label: label ?? 'Velg tid',
          timeSelector: 'Tidvelger',
        }
      : {
          label: label ?? 'Select time',
          timeSelector: 'Time picker',
        };

  const [errorId] = useState(`ewc-timerpicker-error-${elvisTimePickerErrorId++}`);
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

  const mergedErrorOptions: Partial<ErrorOptions> = { ...defaultErrorOptions, ...errorOptions };

  const updateValue = (newTime: Date | null, emit = true): void => {
    setTime(newTime);

    if (!emit) {
      return;
    }

    valueOnChange?.(newTime);
    webcomponent?.setProps({ value: newTime }, true);
    webcomponent?.triggerEvent('valueOnChange', newTime);
  };

  const setHourOrMinute = (type: ChangeType, value: number, isDisabled?: boolean): void => {
    const newTime = time ? new Date(time) : new Date();

    if (!time) {
      newTime.setHours(0, 0, 0, 0);
    }

    if (isDisabled) {
      return;
    }

    switch (type) {
      case 'hour':
        newTime.setHours(value, newTime.getMinutes(), newTime.getSeconds(), 0);
        break;
      case 'minute':
        newTime.setMinutes(value, newTime.getSeconds(), 0);
        break;
      case 'second':
        newTime.setSeconds(value, 0);
        break;
      default: {
        const notReachable: never = type;
        return notReachable;
      }
    }

    if (maxTime && isAfter(newTime, maxTime)) {
      updateValue(maxTime);
    } else if (minTime && isBefore(newTime, minTime)) {
      updateValue(minTime);
    } else {
      updateValue(newTime);
    }
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

    const errorText = getErrorText(lang, newError, minTime, maxTime, hasSecondPicker);
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
      if (!hasSecondPicker) {
        initialTime.setSeconds(0);
      }
      initialTime.setMilliseconds(0);
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

  useUpdateEffect(() => {
    validateMinMax(time);
  }, [time, minTime, maxTime]);

  const validateMinMax = (d?: Date | null): void => {
    if (!d) {
      onError();
      return;
    }

    if (minTime && isBefore(d, minTime)) {
      onError('beforeMinTime');
      return;
    }

    if (maxTime && isAfter(d, maxTime)) {
      onError('afterMaxTime');
      return;
    }
    onError();
  };

  return (
    <>
      <FormFieldContainer
        size={size}
        className={className ?? ''}
        style={{ ...inlineStyle }}
        isDisabled={isDisabled}
        isFullWidth={isFullWidth}
        isActive={isShowing}
        isInvalid={!!error || !!mergedErrorOptions.text || !!mergedErrorOptions.isErrorState}
        hasErrorPlaceholder={!!error || !!mergedErrorOptions.hasErrorPlaceholder || !!mergedErrorOptions.text}
      >
        {!!labels.label && <FormFieldLabel data-testid="label">{labels.label}</FormFieldLabel>}
        <FormFieldInputContainer ref={connectedElementRef}>
          <TimepickerInput
            time={time}
            hasSecondPicker={hasSecondPicker}
            disabled={isDisabled}
            isFullWidth={isFullWidth}
            onChange={updateValue}
            onFocus={() => onFocus?.()}
            required={isRequired}
            onErrorChange={onError}
            lang={lang}
            isInvalid={!!error || !!mergedErrorOptions.text || !!mergedErrorOptions.isErrorState}
            errorId={errorId}
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
            aria-label={labels.timeSelector}
            aria-haspopup="dialog"
          >
            <IconWrapper
              icon={clock}
              color={isDisabled ? 'text-disabled-1' : undefined}
              size={size === 'small' ? 'xs' : 'sm'}
            />
          </IconButton>
        </FormFieldInputContainer>

        <div aria-live="polite">
          {((error && !mergedErrorOptions.hideText) || mergedErrorOptions.text) && (
            <TimepickerError
              customText={mergedErrorOptions.text}
              errorType={error}
              errorId={errorId}
              minTime={minTime}
              maxTime={maxTime}
              hasSecondPicker={hasSecondPicker}
              lang={lang}
            />
          )}
        </div>
      </FormFieldContainer>
      {isShowing && (
        <OverlayContainer
          ref={popoverRef}
          onClose={() => setVisibility(false)}
          onChange={(type, value, isDisabled) => setHourOrMinute(type, value, isDisabled)}
          currentTime={time}
          minuteInterval={minuteInterval}
          hasSecondPicker={hasSecondPicker}
          minTime={minTime}
          maxTime={maxTime}
          lang={lang}
        />
      )}
    </>
  );
};
