import { Overlay } from '@elvia/elvis-toolbox';
import React from 'react';
import { ChangeType, MinuteInterval } from '../elviaTimepicker.types';
import { NumberPicker } from './numberPicker';

import { OverlayContainer as Container } from './popupStyles';

interface Props {
  onClose: () => void;
  onChange: (changeType: ChangeType, newValue: number) => void;
  minuteInterval: MinuteInterval;
  currentTime?: Date | null;
}

export const OverlayContainer = React.forwardRef<HTMLDivElement, Props>(
  ({ onClose, onChange, minuteInterval, currentTime }, ref) => {
    const hours = new Array(24).fill('').map((_, index) => index);
    const minutes = new Array(60 / +minuteInterval).fill('').map((_, index) => index * +minuteInterval);

    return (
      <Overlay ref={ref} onClose={onClose}>
        <Container data-testid="popover">
          <NumberPicker
            title="Time"
            currentValue={currentTime?.getHours()}
            numbers={hours}
            onSelect={(val) => onChange('hour', val)}
          />
          {minuteInterval !== '60' && (
            <NumberPicker
              title="Minutt"
              currentValue={currentTime?.getMinutes()}
              numbers={minutes}
              onSelect={(val) => onChange('minute', val)}
            />
          )}
        </Container>
      </Overlay>
    );
  },
);

OverlayContainer.displayName = 'TimepickerOverlayContainer';
