import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { ErrorType } from './elviaDatepicker.types';

import { Input } from './styledComponents';

interface Props {
  disabled?: boolean;
  required: boolean;
  date?: Date | null;
  isCompact?: boolean;
  placeholder?: string;
  onChange: (newValue: Date) => void;
  onErrorChange: (error?: ErrorType) => void;
}

export const DatepickerInput: React.FC<Props> = ({
  disabled,
  required,
  date,
  isCompact,
  placeholder,
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
    const selectionStart = inputElement.current?.selectionStart || 0;
    const selectionEnd = inputElement.current?.selectionEnd || 0;

    setCaretIndex(selectionStart);
    setHasSelectedText(selectionEnd - selectionStart > 0);
  };

  const setInputValueFromCaretIndexRules = (newInputValue: string, pressedKey: string): void => {
    switch (caretIndex) {
      case 0:
      case 3:
      case 4: {
        if (isNumericValue(pressedKey)) {
          setInputValue(newInputValue);
        }
        break;
      }
      case 1: {
        if (newInputValue.length === 2 && isNumericValue(pressedKey)) {
          setInputValue(`${newInputValue}.`);
        } else if (isNumericValue(pressedKey)) {
          setInputValue(newInputValue);
        }
        break;
      }
      case 2: {
        if (pressedKey === '.') {
          setInputValue(newInputValue);
        }
        break;
      }
    }
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

      const key = (ev.nativeEvent as InputEvent).data || '';
      setInputValueFromCaretIndexRules(newInputValue, key);
    }
  };

  const emitNewValue = (formattedValue: string): void => {
    if (!date || formattedValue !== getFormattedInputValue(date)) {
      const newValue = date ? new Date(date) : new Date();

      const parts = formattedValue.split('.');
      newValue.setHours(+parts[0], +parts[1], 0, 0);
      onChange(newValue);
    }
  };

  const validateInputValue = (hour: string, minute: string): boolean => {
    const parsedHour = hour.length > 2 ? hour.substring(0, 2) : hour;
    let parsedMinute = hour.length > 2 ? hour.substring(2) : '';

    if (minute) {
      // Always use parsed minute if it exists
      parsedMinute = minute;
    }

    if (!parsedHour.length && required) {
      onErrorChange('required');
      return false;
    } else if ((+parsedHour === 24 && +parsedMinute > 0) || +parsedHour > 24 || +parsedMinute >= 60) {
      onErrorChange('invalidDate');
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
    const newValue = `${normalizedHour}.${minute}`;
    setInputValue(newValue);
    emitNewValue(newValue);
  };

  const getFormattedInputValue = (date?: Date | null): string => {
    if (!date) {
      return '';
    }

    return date.toLocaleString('nb-NO', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  useEffect(() => {
    setInputValue(getFormattedInputValue(date));
    onErrorChange(undefined);
  }, [date]);

  // Focus and select the text when the parent container is double clicked
  useEffect(() => {
    const focusOnInput = () => {
      inputElement.current?.focus();
      inputElement.current?.select();
    };

    inputElement.current?.parentElement?.addEventListener('dblclick', focusOnInput);

    return () => {
      inputElement.current?.parentElement?.removeEventListener('dblclick', focusOnInput);
    };
  }, [inputElement]);

  return (
    <Input
      ref={inputElement}
      disabled={disabled}
      type="text"
      placeholder={placeholder}
      value={inputValue}
      onKeyDown={onKeyDown}
      onChange={parseInput}
      onBlur={onBlur}
      isCompact={isCompact}
      data-testid="input"
      aria-live="polite"
      required={required}
    />
  );
};
