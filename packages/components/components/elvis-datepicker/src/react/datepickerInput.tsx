import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { isSameDay, isValidDate } from './dateHelpers';
import { ErrorType } from './elviaDatepicker.types';

import { Input } from './styledComponents';

interface Props {
  disabled?: boolean;
  required: boolean;
  date?: Date | null;
  isCompact?: boolean;
  placeholder?: string;
  onChange: (newValue: Date | null) => void;
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
      case 6:
      case 7:
      case 8:
      case 9: {
        if (isNumericValue(pressedKey)) {
          setInputValue(newInputValue);
        }
        break;
      }
      case 1:
      case 4: {
        if ([2, 5].includes(newInputValue.length) && isNumericValue(pressedKey)) {
          setInputValue(`${newInputValue}.`);
        } else if (isNumericValue(pressedKey)) {
          setInputValue(newInputValue);
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
      if (inputValue.length === 10 && !hasSelectedText) {
        return;
      }

      const key = (ev.nativeEvent as InputEvent).data || '';
      setInputValueFromCaretIndexRules(newInputValue, key);
    }
  };

  const emitNewValue = (newValue: Date | null): void => {
    if (!isSameDay(newValue, date)) {
      onChange(newValue);
    }
  };

  const validateInputValue = (day: string, month: string, year: string): boolean => {
    const date = new Date(`${year}-${month}-${day}`);

    if (!(day || month || year) && required) {
      onErrorChange('required');
      return false;
    } else if (!isValidDate(date)) {
      onErrorChange('invalidDate');
      return false;
    }

    onErrorChange(undefined);
    return true;
  };

  const onBlur = (): void => {
    if (!inputValue.length) {
      emitNewValue(null);
      return;
    }

    const [day, month, year] = inputValue.split('.');
    const isValid = validateInputValue(day, month, year);

    if (isValid) {
      const newValue = new Date(date ? date : new Date());
      newValue.setFullYear(+year, +month - 1, +day);
      emitNewValue(newValue);
    }
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
