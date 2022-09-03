import React, { useEffect, useRef, useState } from 'react';
import {
  TimePickerContainer,
  TimePickerLabel,
  InputContainer,
  Input,
  IconButton,
  LabelText,
} from './styledComponents';
import { Icon } from '@elvia/elvis-icon/react';
import { OverlayContainer } from './popup/overlayContainer';
import { ChangeType, TimepickerProps } from './elviaTimepicker.types';
import { useConnectedOverlay } from '@elvia/elvis-toolbox';
import { useFocusTrap } from '@elvia/elvis-modal/dist/react/js/useFocusTrap';

// Returns number always as two digits
export const padDigit = (d: number): string => {
  const paddedNumber = `0${d}`;
  return paddedNumber.substring(paddedNumber.length - 2);
};

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

  const updateTime = (type: ChangeType, value: number): void => {
    const newTime = time ? new Date(time) : new Date();

    if (!time) {
      newTime.setHours(0, 0, 0, 0);
    }

    if (type === 'hour') {
      newTime.setHours(value);
    } else {
      newTime.setMinutes(value);
    }

    setTime(newTime);
    if (!webcomponent && valueOnChange) {
      valueOnChange(newTime);
    } else if (webcomponent) {
      webcomponent.setProps({ value: newTime }, true);
    }
  };

  useEffect(() => {
    if (!isShowing) {
      return;
    }

    useFocusTrap(popoverRef);

    const closeOnEsc = (ev: KeyboardEvent) => {
      if (ev.key === 'Escape') {
        setIsShowing(false);
        openPopoverButtonRef.current?.focus();
      }
    };

    window.addEventListener('keydown', closeOnEsc);

    return () => {
      useFocusTrap(popoverRef, true);
      window.removeEventListener('keydown', closeOnEsc);
    };
  }, [isShowing]);

  return (
    <TimePickerContainer className={`${className ? className : ''}`} style={{ ...inlineStyle }} {...rest}>
      <TimePickerLabel>
        <LabelText>{label}</LabelText>
        <InputContainer ref={connectedElementRef} disabled={disabled} isCompact={isCompact}>
          <Input
            disabled={disabled}
            type="text"
            placeholder="tt.mm"
            value={time ? `${padDigit(time.getHours())}.${padDigit(time.getMinutes())}` : ''}
            onChange={(ev) => console.log(ev.target.value)}
          />
          <IconButton
            disabled={disabled}
            active={isShowing}
            onClick={() => setIsShowing(true)}
            ref={openPopoverButtonRef}
            size={isCompact ? 'small' : 'medium'}
          >
            <Icon name="clock" color={disabled ? 'grey-30' : 'black'} size={isCompact ? 'xs' : 'sm'} />
          </IconButton>
        </InputContainer>
      </TimePickerLabel>
      {isShowing && (
        <OverlayContainer
          ref={popoverRef}
          onClose={() => setIsShowing(false)}
          onChange={(type, value) => updateTime(type, value)}
          currentTime={time}
          minuteGranularity={minuteGranularity}
        />
      )}
    </TimePickerContainer>
  );
};

export default Timepicker;
