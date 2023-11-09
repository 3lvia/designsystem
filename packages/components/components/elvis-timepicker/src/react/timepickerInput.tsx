import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { ErrorType } from './publicApi.public';

import { padDigit } from './padDigit';
import { Input } from './styledComponents';
import { getFormattedInputValue } from './timeHelpers';

interface Props {
  disabled?: boolean;
  isFullWidth: boolean;
  required: boolean;
  hasSecondPicker: boolean;
  time?: Date | null;
  onChange: (newValue: Date | null) => void;
  onFocus: () => void;
  onErrorChange: (error?: ErrorType) => void;
  isInvalid?: boolean;
  errorId?: string;
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
  isInvalid,
  errorId,
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
    const delimiterKeys = ['.', ':'];
    const sanitizedNewInputValue = newInputValue.replace(/\./g, ':');
    switch (caretIndex) {
      case 0:
      case 3:
      case 6:
      case 7: {
        if (isNumericValue(pressedKey)) {
          setInputValue(sanitizedNewInputValue);
        }
        break;
      }
      case 1:
      case 4: {
        if (
          (sanitizedNewInputValue.length === 2 && isNumericValue(pressedKey)) ||
          (hasSecondPicker && sanitizedNewInputValue.length === 5 && isNumericValue(pressedKey))
        ) {
          setInputValue(`${sanitizedNewInputValue}:`);
        } else if (isNumericValue(pressedKey)) {
          setInputValue(sanitizedNewInputValue);
        } else if (delimiterKeys.includes(pressedKey)) {
          if (caretIndex === 1) {
            setInputValue(`0${sanitizedNewInputValue}`);
          } else {
            setInputValue(`${sanitizedNewInputValue.substring(0, 3)}0${sanitizedNewInputValue.substring(3)}`);
          }
        }
        break;
      }
      case 2:
      case 5: {
        if (delimiterKeys.includes(pressedKey)) {
          setInputValue(sanitizedNewInputValue);
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
    const inputFieldIsFull =
      (!hasSecondPicker && inputValue.length === 5) || (hasSecondPicker && inputValue.length === 8);
    if (isModifierKey) {
      setInputValue(newInputValue);
    } else {
      if (inputFieldIsFull && !hasSelectedText) {
        return;
      }

      const key = (ev.nativeEvent as InputEvent).data || '';
      setInputValueFromCaretIndexRules(newInputValue, key);
    }
  };

  const emitNewValue = (formattedValue: string): void => {
    if (!time || formattedValue !== getFormattedInputValue(time, hasSecondPicker)) {
      const newValue = time ? new Date(time) : new Date();

      const [hour, minute, second] = formattedValue.split(':');
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

    if (!parsedHour.length && touched && required) {
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
    return true;
  };

  const onBlur = (): void => {
    let [hour, minute, second] = inputValue.split(':');

    const isValid = validateInputValue(hour, minute, second);

    // Always emit empty values
    if (!inputValue.length) {
      onChange(null);
      onErrorChange(!isValid ? 'required' : undefined);
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
      `${padDigit(normalizedHour)}:${padDigit(+minute)}` + (hasSecondPicker ? `:${padDigit(+second)}` : '');

    setInputValue(newValue);
    emitNewValue(newValue);
  };

  const onInputFocus = (): void => {
    setTouched(true);
    onFocus();
  };

  useEffect(() => {
    if (touched) {
      const [hour, minute, second] = inputValue.split(':');
      validateInputValue(hour, minute, second);
    }
  }, [required]);

  useEffect(() => {
    const formattedInputValue = getFormattedInputValue(time, hasSecondPicker);
    setInputValue(formattedInputValue);

    const [hour, minute, second] = formattedInputValue.split(':');
    validateInputValue(hour, minute, second);
  }, [time, hasSecondPicker]);

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
      isFullWidth={isFullWidth}
      hasSecondPicker={hasSecondPicker}
      placeholder={hasSecondPicker ? 'tt:mm:ss' : 'tt:mm'}
      value={inputValue}
      onKeyDown={onKeyDown}
      onChange={parseInput}
      onBlur={onBlur}
      onFocus={onInputFocus}
      aria-live="polite"
      required={required}
      aria-invalid={isInvalid}
      aria-errormessage={isInvalid ? errorId : undefined}
    />
  );
};
