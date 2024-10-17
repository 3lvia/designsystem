import { LanguageCode, Overlay } from '@elvia/elvis-toolbox';
import React from 'react';

import { ChangeType, MinuteInterval } from '../publicApi.public';
import { NumberPicker } from './numberPicker';
import { OverlayContainer as Container } from './popupStyles';

interface Props {
  onClose: () => void;
  onChange: (changeType: ChangeType, newValue: number, isDisabled?: boolean) => void;
  minuteInterval: MinuteInterval;
  hasSecondPicker: boolean;
  lang: LanguageCode;
  currentTime?: Date | null;
  minTime?: Date;
  maxTime?: Date;
}

export const OverlayContainer = React.forwardRef<HTMLDivElement, Props>(
  ({ onClose, onChange, minuteInterval, hasSecondPicker, currentTime, minTime, maxTime, lang }, ref) => {
    const hours = new Array(24).fill('').map((_, index) => index);
    const minutes = new Array(60 / +minuteInterval).fill('').map((_, index) => index * +minuteInterval);
    const seconds = new Array(60 / +minuteInterval).fill('').map((_, index) => index * +minuteInterval);

    const labels =
      lang === 'no'
        ? {
            hour: 'Time',
            minute: 'Minutt',
            second: 'Sekund',
          }
        : {
            hour: 'Hour',
            minute: 'Minute',
            second: 'Second',
          };

    return (
      <Overlay ref={ref} onClose={onClose}>
        <Container hasSecondPicker={hasSecondPicker} data-testid="popover">
          <NumberPicker
            title={labels.hour}
            currentTime={currentTime}
            numbers={hours}
            onSelect={(changeType, val, isDisabled) => onChange(changeType, val, isDisabled)}
            timeUnit="hour"
            minTime={minTime}
            maxTime={maxTime}
            lang={lang}
          />
          {minuteInterval !== '60' && (
            <NumberPicker
              title={labels.minute}
              currentTime={currentTime}
              numbers={minutes}
              onSelect={(changeType, val, isDisabled) => onChange(changeType, val, isDisabled)}
              timeUnit="minute"
              minTime={minTime}
              maxTime={maxTime}
              lang={lang}
            />
          )}
          {hasSecondPicker && (
            <NumberPicker
              title={labels.second}
              currentTime={currentTime}
              numbers={seconds}
              onSelect={(changeType, val, isDisabled) => onChange(changeType, val, isDisabled)}
              timeUnit="second"
              minTime={minTime}
              maxTime={maxTime}
              lang={lang}
            />
          )}
        </Container>
      </Overlay>
    );
  },
);

OverlayContainer.displayName = 'TimepickerOverlayContainer';
