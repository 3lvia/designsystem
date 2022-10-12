import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
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
  const inputElement = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState('');
  const [hasSelectedText, setHasSelectedText] = useState(false);
  const [caretIndex, setCaretIndex] = useState(0);

  const isNumericValue = (value: string): boolean => {
    return /^\d+$/.test(value);
  };

  const onKeyDown = () => {
    setCaretIndex(inputElement.current?.selectionStart || 0);
    setHasSelectedText(!!window.getSelection()?.toString());
  };

  const parseInput = (ev: ChangeEvent<HTMLInputElement>): void => {
    const isModifierKey = ['deleteContentBackward', 'deleteContentForward'].includes(
      (ev.nativeEvent as InputEvent).inputType,
    );

    const newInputValue = ev.target.value;
    if (isModifierKey) {
      setInputValue(newInputValue);
    } else {
      if (inputValue.length === 5 && !hasSelectedText) {
        return;
      }

      /**
       * We handle each caret position with separate rules
       */
      const key = (ev.nativeEvent as InputEvent).data || '';
      switch (caretIndex) {
        case 0:
        case 3:
        case 4: {
          if (isNumericValue(key)) {
            setInputValue(newInputValue);
          }
          break;
        }
        case 1: {
          if (newInputValue.length === 2 && isNumericValue(key)) {
            setInputValue(`${newInputValue}.`);
          } else if (isNumericValue(key)) {
            setInputValue(newInputValue);
          }
          break;
        }
        case 2: {
          if (key === '.') {
            setInputValue(newInputValue);
          }
          break;
        }
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
    const parsedHour = hour.length > 2 ? hour.substring(0, 2) : hour;
    const parsedMinute = minute ? minute : hour.length > 2 ? hour.substring(2) : '';

    if (!parsedHour.length && required) {
      onErrorChange('required');
      return false;
    } else if ((+parsedHour === 24 && +parsedMinute > 0) || +parsedHour > 24 || +parsedMinute >= 60) {
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
      ref={inputElement}
      disabled={disabled}
      type="text"
      placeholder="tt.mm"
      value={inputValue}
      onKeyDown={onKeyDown}
      onChange={parseInput}
      onBlur={onBlur}
      isCompact={isCompact}
      data-test="input"
      aria-live="polite"
      required={required}
    />
  );
};
