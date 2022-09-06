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
import { ChangeType, TimepickerProps } from './elviaTimepicker.types';
import { useConnectedOverlay, useFocusTrap } from '@elvia/elvis-toolbox';
import { TimepickerInput } from './timepickerInput';

export const Timepicker: React.FC<Partial<TimepickerProps>> = ({
  value,
  valueOnChange,
  label = 'Velg tid',
  minuteGranularity = '15',
  isCompact = false,
  disabled = false,
  className,
  inlineStyle,
  webcomponent,
  ...rest
}) => {
  const [time, setTime] = useState<Date | undefined>(value);
  const connectedElementRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const openPopoverButtonRef = useRef<HTMLButtonElement>(null);
  const [isShowing, setIsShowing] = useConnectedOverlay(connectedElementRef, popoverRef);

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

  useEffect(() => {
    if (!isShowing) {
      return;
    }

    useFocusTrap(popoverRef);

    return () => useFocusTrap(popoverRef, true);
  }, [isShowing]);

  /**
   * Needed for webcomponent -> To update the default value
   */
  useEffect(() => value && updateValue(value, false), [value]);

  return (
    <TimePickerContainer className={`${className ? className : ''}`} style={{ ...inlineStyle }} {...rest}>
      <TimePickerLabel isCompact={isCompact}>
        {!!label && (
          <LabelText data-test="label" isCompact={isCompact}>
            {label}
          </LabelText>
        )}
        <InputContainer ref={connectedElementRef} disabled={disabled} isCompact={isCompact}>
          <TimepickerInput time={time} disabled={disabled} isCompact={isCompact} onChange={updateValue} />
          <IconButton
            disabled={disabled}
            active={isShowing}
            onClick={() => setVisibility(true)}
            ref={openPopoverButtonRef}
            size={isCompact ? 'small' : 'medium'}
            data-test="popover-toggle"
          >
            <Icon name="clock" color={disabled ? 'grey-30' : 'black'} size={isCompact ? 'xs' : 'sm'} />
          </IconButton>
        </InputContainer>
      </TimePickerLabel>
      {isShowing && (
        <OverlayContainer
          ref={popoverRef}
          onClose={() => setVisibility(false)}
          onChange={(type, value) => setHourOrMinute(type, value)}
          currentTime={time}
          minuteGranularity={minuteGranularity}
        />
      )}
    </TimePickerContainer>
  );
};

export default Timepicker;
