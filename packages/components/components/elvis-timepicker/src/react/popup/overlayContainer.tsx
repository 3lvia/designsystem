import React from 'react';
import { createPortal } from 'react-dom';
import { ChangeType, MinuteGranularity } from '../elviaTimepicker.types';
import { NumberPicker } from './numberPicker';

import { Backdrop, OverlayContainer as Container } from './popupStyles';

interface Props {
  onClose: () => void;
  onChange: (changeType: ChangeType, newValue: number) => void;
  minuteGranularity: MinuteGranularity;
  currentTime: Date | undefined;
}

export const OverlayContainer = React.forwardRef<HTMLDivElement, Props>(
  ({ onClose, onChange, minuteGranularity, currentTime }, ref) => {
    const hours = new Array(24).fill('').map((_, index) => index);
    const minutes = new Array(60 / +minuteGranularity).fill('').map((_, index) => index * +minuteGranularity);

    return createPortal(
      <>
        <Backdrop onClick={onClose} />
        <Container ref={ref}>
          <NumberPicker
            title="Time"
            currentValue={currentTime?.getHours()}
            numbers={hours}
            onSelect={(val) => onChange('hour', val)}
          />
          <NumberPicker
            title="Minutt"
            currentValue={currentTime?.getMinutes()}
            numbers={minutes}
            onSelect={(val) => onChange('minute', val)}
          />
        </Container>
      </>,
      document.body,
    );
  },
);

OverlayContainer.displayName = 'TimepickerOverlayContainer';
