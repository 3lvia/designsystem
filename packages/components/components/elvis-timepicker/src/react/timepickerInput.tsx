import React, { ChangeEvent, useEffect, useState } from 'react';
import { ErrorType } from './elviaTimepicker.types';

import { padDigit } from './padDigit';
import { Input } from './styledComponents';

interface Props {
  disabled?: boolean;
  required: boolean;
  time?: Date;
  isCompact?: boolean;
  onChange: (newValue: Date) => void;
  onErrorChange: (error?: ErrorType) => void;
}

export const TimepickerInput: React.FC<Props> = ({
  disabled,
  required,
  time,
  isCompact,
  onChange,
  onErrorChange,
}) => {
  const [inputValue, setInputValue] = useState('');

  const isNumericValue = (value: string): boolean => {
    return /^\d+$/.test(value);
  };

  const parseInput = (ev: ChangeEvent<HTMLInputElement>): void => {
    const key = (ev.nativeEvent as InputEvent).data || '';

    const isModifierKey = ['deleteContentBackward', 'deleteContentForward'].includes(
      (ev.nativeEvent as InputEvent).inputType,
    );

    if ((inputValue.length >= 5 && !isModifierKey) || !(isNumericValue(key) || isModifierKey)) {
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

  const emitNewValue = (formattedValue: string): void => {
    if (!time || formattedValue !== getFormattedInputValue(time)) {
      const newValue = time ? new Date(time) : new Date();

      const parts = formattedValue.split('.');
      newValue.setHours(+parts[0], +parts[1], 0, 0);
      onChange(newValue);
    }
  };

  const validateInputValue = (hour: string, minute: string): boolean => {
    if (!hour.length && required) {
      onErrorChange('required');
      return false;
    } else if ((+hour === 24 && +minute > 0) || +hour > 24 || +minute >= 60) {
      onErrorChange('invalidTime');
      return false;
    }

    onErrorChange(undefined);
    return true;
  };

  const onBlur = (): void => {
    let [hour, minute] = inputValue.split('.');

    const isValid = validateInputValue(hour, minute);
    if (!isValid) {
      return;
    }

    if (!inputValue.length) {
      return;
    } else if (inputValue.length <= 2 && isNumericValue(inputValue)) {
      hour = inputValue;
      minute = '';
    } else if (inputValue.length >= 3 && inputValue.length <= 4 && isNumericValue(inputValue)) {
      hour = inputValue.substring(0, 2);
      minute = inputValue.substring(2);
    }

    const normalizedHour = +hour === 24 ? 0 : +hour;
    const newValue = `${padDigit(normalizedHour)}.${padDigit(+minute)}`;
    setInputValue(newValue);
    emitNewValue(newValue);
  };

  const getFormattedInputValue = (date: Date): string => {
    return `${padDigit(date.getHours())}.${padDigit(date.getMinutes())}`;
  };

  useEffect(() => {
    if (time) {
      setInputValue(getFormattedInputValue(time));
      onErrorChange(undefined);
    }
  }, [time]);

  return (
    <Input
      disabled={disabled}
      type="text"
      placeholder="tt.mm"
      value={inputValue}
      onChange={parseInput}
      onBlur={onBlur}
      isCompact={isCompact}
      data-test="input"
      aria-live="polite"
      required={required}
    />
  );
};
