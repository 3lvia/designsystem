import React, { ChangeEvent, useEffect, useState } from 'react';
import { isSsr } from '@elvia/elvis-toolbox';

import { padDigit } from './padDigit';
import { Input } from './styledComponents';

interface Props {
  disabled?: boolean;
  time?: Date;
  isCompact?: boolean;
  onChange: (newValue: Date) => void;
}

export const TimepickerInput: React.FC<Props> = ({ disabled, time, isCompact, onChange }) => {
  let previousValidValue = '';
  const [inputValue, setInputValue] = useState('');

  const hasSelection = (): boolean => {
    if (isSsr()) {
      return false;
    }

    return !!window.getSelection() || !!document.getSelection();
  };

  const parseInput = (ev: ChangeEvent<HTMLInputElement>): void => {
    const key = (ev.nativeEvent as InputEvent).data || '';

    const isNumericValue = /^\d+$/.test(key);
    const isModifierKey = ['deleteContentBackward', 'deleteContentForward'].includes(
      (ev.nativeEvent as InputEvent).inputType,
    );
    if ((inputValue.length >= 5 && !isModifierKey && !hasSelection()) || !(isNumericValue || isModifierKey)) {
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

  const emitNewValue = (): void => {
    if (!time || previousValidValue !== getFormattedInputValue(time)) {
      const parts = previousValidValue.split('.');
      const newValue = time ? new Date(time) : new Date();
      newValue.setHours(+parts[0], +parts[1], 0, 0);
      onChange(newValue);
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

    emitNewValue();
  };

  const getFormattedInputValue = (date: Date): string => {
    return `${padDigit(date.getHours())}.${padDigit(date.getMinutes())}`;
  };

  useEffect(() => {
    if (time) {
      setInputValue(getFormattedInputValue(time));
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
      isCompact={isCompact}
    />
  );
};
