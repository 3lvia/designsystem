import { Overlay } from '@elvia/elvis-toolbox';
import React from 'react';
import { ChangeType, MinuteInterval } from '../elviaTimepicker.types';
import { NumberPicker } from './numberPicker';

import { OverlayContainer as Container } from './popupStyles';

interface Props {
  onClose: () => void;
  onChange: (changeType: ChangeType, newValue: number, isDisabled?: boolean) => void;
  minuteInterval: MinuteInterval;
  hasSecondPicker: boolean;
  currentTime?: Date | null;
  minTime?: Date;
  maxTime?: Date;
}

export const OverlayContainer = React.forwardRef<HTMLDivElement, Props>(
  ({ onClose, onChange, minuteInterval, hasSecondPicker, currentTime, minTime, maxTime }, ref) => {
    const hours = new Array(24).fill('').map((_, index) => index);
    const minutes = new Array(60 / +minuteInterval).fill('').map((_, index) => index * +minuteInterval);
    const seconds = new Array(60 / +minuteInterval).fill('').map((_, index) => index * +minuteInterval);

    return (
      <Overlay ref={ref} onClose={onClose}>
        <Container hasSecondPicker={hasSecondPicker} data-testid="popover">
          <NumberPicker
            title="Time"
            currentTime={currentTime}
            numbers={hours}
            onSelect={(changeType, val, isDisabled) => onChange(changeType, val, isDisabled)}
            timeUnit="hour"
            minTime={minTime}
            maxTime={maxTime}
          />
          {minuteInterval !== '60' && (
            <NumberPicker
              title="Minutt"
              currentTime={currentTime}
              numbers={minutes}
              onSelect={(changeType, val, isDisabled) => onChange(changeType, val, isDisabled)}
              timeUnit="minute"
              minTime={minTime}
              maxTime={maxTime}
            />
          )}
          {hasSecondPicker && (
            <NumberPicker
              title="Sekund"
              currentTime={currentTime}
              numbers={seconds}
              onSelect={(changeType, val, isDisabled) => onChange(changeType, val, isDisabled)}
              timeUnit="second"
              minTime={minTime}
              maxTime={maxTime}
            />
          )}
        </Container>
      </Overlay>
    );
  },
);

OverlayContainer.displayName = 'TimepickerOverlayContainer';
