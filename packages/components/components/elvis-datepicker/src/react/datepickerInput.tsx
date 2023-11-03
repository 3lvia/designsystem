import React, {
  ChangeEvent,
  FocusEventHandler,
  RefObject,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { formatDate, isSameDay } from './dateHelpers';
import { ErrorType } from './elviaDatepicker.types';

import { Input } from './styledComponents';
import { validateDate } from './validateDate';

interface Props {
  disabled?: boolean;
  required: boolean;
  date?: Date | null;
  minDate?: Date;
  maxDate?: Date;
  placeholder?: string;
  onChange: (newValue: Date | null) => void;
  onFocus: () => void;
  onErrorChange: (error?: ErrorType) => void;
  overlayTriggerRef: RefObject<HTMLButtonElement>;
}

export const DatepickerInput = forwardRef<HTMLInputElement, Props>(
  (
    {
      disabled,
      required,
      date,
      minDate,
      maxDate,
      placeholder,
      onChange,
      onFocus,
      onErrorChange,
      overlayTriggerRef,
    },
    ref,
  ) => {
    const inputElement = useRef<HTMLInputElement>(null);
    const [inputValue, setInputValue] = useState('');
    const [hasSelectedText, setHasSelectedText] = useState(false);
    const [caretIndex, setCaretIndex] = useState(0);
    const [touched, setTouched] = useState(false);

    /** This makes the input element ref accessible inside this component, and the forwardRef */
    useImperativeHandle(ref, () => inputElement.current!, []);

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
      if (!isSameDay(newValue, date) && newValue !== date) {
        onChange(newValue);
      }
    };

    const validateInputValue = (day = NaN, month = NaN, year = NaN): boolean => {
      const error = validateDate({
        inputValue: { day, month, year },
        minDate: minDate,
        maxDate: maxDate,
        required: required,
      });

      switch (error) {
        case 'required':
        case 'invalidDate':
        case 'beforeMinDate':
        case 'afterMaxDate':
          onErrorChange(error);
          return false;
        case 'valid':
          onErrorChange(undefined);
          return true;
        default:
          return false;
      }
    };

    const onBlur: FocusEventHandler<HTMLInputElement> = (event) => {
      // Don't run validation on blur of the input field if the overlay is opened
      if (event.relatedTarget?.isSameNode(overlayTriggerRef.current)) {
        return;
      }

      // Handle empty value first
      if (!inputValue.length) {
        emitNewValue(null);
        validateInputValue();
        return;
      }

      const [day, month, year] = inputValue.split('.');
      const isValid = validateInputValue(parseInt(day), parseInt(month), parseInt(year));

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

      return formatDate(date, { day: '2-digit', month: '2-digit', year: 'numeric' });
    };

    const onInputFocus = (): void => {
      setTouched(true);
      onFocus();
    };

    useEffect(() => {
      setInputValue(getFormattedInputValue(date));

      if (touched && getFormattedInputValue(date) !== inputValue) {
        // Month is 0 indexed
        validateInputValue(date?.getDate(), date ? date.getMonth() + 1 : undefined, date?.getFullYear());
      }
    }, [date]);

    useEffect(() => {
      if (touched) {
        const [day, month, year] = inputValue.split('.');
        validateInputValue(parseInt(day), parseInt(month), parseInt(year));
      }
    }, [required]);

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
        placeholder={placeholder}
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
  },
);

DatepickerInput.displayName = 'DatepickerInput';
