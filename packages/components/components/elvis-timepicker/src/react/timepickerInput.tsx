import React, { ChangeEvent, useEffect, useState } from 'react';

import { padDigit } from './padDigit';
import { Input } from './styledComponents';

interface Props {
  disabled?: boolean;
  time?: Date;
}

export const TimepickerInput: React.FC<Props> = ({ disabled, time }) => {
  let previousValidValue = '';
  const [inputValue, setInputValue] = useState('');

  const parseInput = (ev: ChangeEvent<HTMLInputElement>): void => {
    const key = (ev.nativeEvent as InputEvent).data || '';

    const isNumericValue = /^\d+$/.test(key);
    const isModifierKey = ['deleteContentBackward', 'deleteContentForward'].includes(
      (ev.nativeEvent as InputEvent).inputType,
    );
    const hasCharsSelected = (ev.target.selectionEnd || 0) - (ev.target.selectionStart || 0) > 0;
    if (
      (inputValue.length >= 5 && !isModifierKey && !hasCharsSelected) ||
      !(isNumericValue || isModifierKey)
    ) {
      return;
    }

    const newInputValue = ev.target.value;
    if (isModifierKey) {
      setInputValue(newInputValue);
    } else {
      if (newInputValue.length === 2) {
        setInputValue(`${newInputValue}.`);
      } else {
        setInputValue(newInputValue);
      }
    }
  };

  const validateInputValue = (): void => {
    const parts = inputValue.split('.');

    if (parts.length !== 2) {
      setInputValue(previousValidValue);
    } else {
      const validHour = +parts[0] % 24;
      const validMinute = +parts[1] % 60;
      const newValue = `${padDigit(validHour)}.${padDigit(validMinute)}`;
      setInputValue(newValue);
      previousValidValue = newValue;
    }
  };

  useEffect(() => {
    if (time) {
      setInputValue(`${padDigit(time.getHours())}.${padDigit(time.getMinutes())}`);
    }
  }, [time]);

  return (
    <Input
      disabled={disabled}
      type="text"
      placeholder="tt.mm"
      value={inputValue}
      onChange={parseInput}
      onBlur={validateInputValue}
    />
  );
};
