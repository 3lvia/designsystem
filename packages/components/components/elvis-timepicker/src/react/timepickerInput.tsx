import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { ErrorType } from './elviaTimepicker.types';

import { padDigit } from './padDigit';
import { Input } from './styledComponents';

interface Props {
  disabled?: boolean;
  isFullWidth: boolean;
  required: boolean;
  hasSecondPicker: boolean;
  time?: Date | null;
  onChange: (newValue: Date | null) => void;
  onFocus: () => void;
  onErrorChange: (error?: ErrorType) => void;
}

export const TimepickerInput: React.FC<Props> = ({
  disabled,
  isFullWidth,
  required,
  hasSecondPicker,
  time,
  onChange,
  onFocus,
  onErrorChange,
}) => {
  const inputElement = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState('');
  const [hasSelectedText, setHasSelectedText] = useState(false);
  const [caretIndex, setCaretIndex] = useState(0);
  const [touched, setTouched] = useState(false);

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
      case 6:
      case 7: {
        if (isNumericValue(pressedKey)) {
          setInputValue(newInputValue);
        }
        break;
      }
      case 1:
      case 4: {
        if (
          (newInputValue.length === 2 && isNumericValue(pressedKey)) ||
          (hasSecondPicker && newInputValue.length === 5 && isNumericValue(pressedKey))
        ) {
          setInputValue(`${newInputValue}.`);
        } else if (isNumericValue(pressedKey)) {
          setInputValue(newInputValue);
        } else if (pressedKey === '.') {
          if (caretIndex === 1) {
            setInputValue(`0${newInputValue}`);
          } else {
            const newVal = `${newInputValue.substring(0, 3)}0${newInputValue.substring(3)}`;
            setInputValue(newVal);
          }
        }
        break;
      }
      case 2:
      case 5: {
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
    if (!time || formattedValue !== getFormattedInputValue(time)) {
      const newValue = time ? new Date(time) : new Date();

      const [hour, minute, second] = formattedValue.split('.');
      newValue.setHours(+hour, +minute, +(second ?? 0), 0);
      onChange(newValue);
    }
  };

  const validateInputValue = (
    hour: string,
    minute: string | undefined,
    second: string | undefined,
  ): boolean => {
    const parsedHour = hour.length > 2 ? hour.substring(0, 2) : hour;
    let parsedMinute = hour.length > 2 ? hour.substring(2, 4) : '';
    let parsedSecond = hour.length > 4 ? hour.substring(4, 6) : '';

    if (minute) {
      // Always use parsed minute if it exists
      parsedMinute = minute;
    }
    parsedMinute = padDigit(+parsedMinute);

    if (second) {
      parsedSecond = second;
    }
    parsedSecond = padDigit(+parsedSecond);

    if (!parsedHour.length && required) {
      onErrorChange('required');
      return false;
    } else if (
      (+parsedHour === 24 && +parsedMinute > 0) ||
      +parsedHour > 24 ||
      +parsedMinute >= 60 ||
      (hasSecondPicker && +parsedSecond >= 60)
    ) {
      onErrorChange('invalidTime');
      return false;
    }

    onErrorChange(undefined);
    return true;
  };

  const onBlur = (): void => {
    let [hour, minute, second] = inputValue.split('.');

    const isValid = validateInputValue(hour, minute, second);

    // Always emit empty values
    if (!inputValue.length) {
      onChange(null);
      return;
    }

    if (!isValid) {
      return;
    }

    if (inputValue.length <= 2 && isNumericValue(inputValue)) {
      hour = inputValue;
      minute = '';
      second = '';
    } else if (inputValue.length >= 3 && inputValue.length <= 4 && isNumericValue(inputValue)) {
      hour = inputValue.substring(0, 2);
      minute = inputValue.substring(2);
      second = '';
    } else if (inputValue.length >= 5 && inputValue.length <= 5 && isNumericValue(inputValue)) {
      hour = inputValue.substring(0, 2);
      minute = inputValue.substring(2, 4);
      second = inputValue.substring(4);
    }
    second = second ?? '00';

    const normalizedHour = +hour === 24 ? 0 : +hour;
    const newValue =
      `${padDigit(normalizedHour)}.${padDigit(+minute)}` + (hasSecondPicker ? `.${padDigit(+second)}` : '');

    setInputValue(newValue);
    emitNewValue(newValue);
  };

  const getFormattedInputValue = (date?: Date | null): string => {
    if (!date) {
      return '';
    }

    return (
      `${padDigit(date.getHours())}.${padDigit(date.getMinutes())}` +
      (hasSecondPicker ? `.${padDigit(date.getSeconds())}` : '')
    );
  };

  const onInputFocus = (): void => {
    setTouched(true);
    onFocus();
  };

  useEffect(() => {
    if (touched) {
      const [hour, minute, second] = inputValue.split('.');
      validateInputValue(hour, minute, second);
    }
  }, [required]);

  useEffect(() => {
    const formattedInputValue = getFormattedInputValue(time);
    setInputValue(formattedInputValue);

    const [hour, minute, second] = formattedInputValue.split('.');
    validateInputValue(hour, minute, second);
  }, [time]);

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

  // Resets the showing/hiding of seconds in the input field
  useEffect(() => {
    onBlur();
  }, [hasSecondPicker]);

  return (
    <Input
      ref={inputElement}
      disabled={disabled}
      isFullWidth={isFullWidth}
      hasSecondPicker={hasSecondPicker}
      placeholder={hasSecondPicker ? 'tt.mm.ss' : 'tt.mm'}
      value={inputValue}
      onKeyDown={onKeyDown}
      onChange={parseInput}
      onBlur={onBlur}
      onFocus={onInputFocus}
      data-testid="input"
      aria-live="polite"
      required={required}
    />
  );
};
