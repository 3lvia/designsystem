import React, { FC, useState, useRef, useEffect, CSSProperties } from 'react';
import './style.scss';
import classnames from 'classnames';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { ToolbarComponentProps } from '@material-ui/pickers/Picker/Picker';
import { outlineListener } from '@elvia/elvis-toolbox';
import { Icon } from '@elvia/elvis-icon/react';
import { getColor } from '@elvia/elvis-colors';
import DateFnsUtils from '@date-io/date-fns';
import nbLocale from 'date-fns/locale/nb';
import format from 'date-fns/format';
import isValid from 'date-fns/isValid';
import isSameDay from 'date-fns/isSameDay';
import isAfter from 'date-fns/isAfter';
import isBefore from 'date-fns/isBefore';
import formatISO from 'date-fns/formatISO';
import isWithinInterval from 'date-fns/isWithinInterval';
import startOfWeek from 'date-fns/startOfWeek';
import endOfWeek from 'date-fns/endOfWeek';
import lastDayOfMonth from 'date-fns/lastDayOfMonth';
import isEqual from 'lodash/isEqual';
import type { ElvisComponentWrapper } from '@elvia/elvis-component-wrapper';

interface DateRange {
  start: Date | null;
  end: Date | null;
}

/**
 * Props that are specific to the date range picker component.
 * @internal
 */
export interface DatepickerRangeProps {
  selectedDateRange?: DateRange;
  hoveredDateRange?: DateRange;
  onDateElementPointerMove?: (day: Date, event?: React.PointerEvent<HTMLButtonElement>) => void;
  onDatepickerPopoverPointerMove?: (event: React.PointerEvent<HTMLDivElement>) => void;
  whichRangePicker?: 'start' | 'end';
}

export interface DatepickerProps {
  value?: Date | null;
  label?: string;
  isCompact?: boolean;
  isDisabled?: boolean;
  isFullWidth?: boolean;
  isRequired?: boolean;
  hasSelectDateOnOpen?: boolean;
  customError?: string;
  minDate?: Date;
  maxDate?: Date;
  valueOnChange?: (value: Date | null) => void;
  valueOnChangeISOString?: (value: string | null) => void;
  onOpen?: () => void;
  onClose?: () => void;
  onReset?: () => void;
  webcomponent?: ElvisComponentWrapper;
  placeholder?: string;
  isOpen?: boolean;
  className?: string;
  inlineStyle?: CSSProperties;
  hasOptionalText?: boolean;
  showValidation?: boolean;
  showValidationState?: boolean;
  isErrorState?: boolean;
  errorOnChange?: (error: string) => void;
  hasValidation?: boolean;
  hasErrorPlaceholderElement?: boolean;
  clearButtonText?: string;
  disableDate?: (day: Date) => boolean;
  /**
   * This is used for internal purposes, and should not be used by the user.
   * @internal
   */
  dateRangeProps?: DatepickerRangeProps;
}

export const Datepicker: FC<DatepickerProps> = ({
  value = null,
  label = 'Velg dato',
  isCompact = false,
  isDisabled = false,
  isFullWidth = false,
  isRequired = false,
  hasSelectDateOnOpen = true,
  customError,
  minDate,
  maxDate,
  valueOnChange,
  valueOnChangeISOString,
  onOpen,
  onClose,
  onReset,
  webcomponent,
  placeholder = 'dd.mm.åååå',
  isOpen = false,
  className,
  inlineStyle,
  hasOptionalText,
  showValidation,
  showValidationState = true,
  clearButtonText = 'Nullstill',
  isErrorState,
  hasValidation = true,
  hasErrorPlaceholderElement = true,
  errorOnChange,
  disableDate,
  dateRangeProps,
  ...rest
}) => {
  const [selectedDate, setSelectedDate] = useState(value);
  const [hasChangeToEmit, setHasChangeToEmit] = useState(false);
  const [initialFocusedDate, setInitialFocusedDate] = useState<Date | null>(null);
  const [currentErrorMessage, setCurrentErrorMessage] = useState('');
  const [hasShownError, setHasShownError] = useState(false);
  const [hasHadFocus, setHasHadFocus] = useState(false);
  const [hasFocus, setHasFocus] = useState(false);
  const [shouldHaveSelected, setShouldHaveSelected] = useState(true);
  const [isDatepickerOpen, setIsDatepickerOpen] = useState(isOpen);
  const datepickerRef = useRef<HTMLDivElement>(null);
  const datepickerPopoverRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const selectedDateRange = dateRangeProps?.selectedDateRange;
  const hoveredDateRange = dateRangeProps?.hoveredDateRange;
  const onDateElementPointerMove = dateRangeProps?.onDateElementPointerMove;
  const onDatepickerPopoverPointerMove = dateRangeProps?.onDatepickerPopoverPointerMove;
  const whichRangePicker = dateRangeProps?.whichRangePicker;

  // Unicode character U+00AD - Hack used to avoid date-fns from formatting date before date is valid
  const unicodeChar = '­';
  const showError =
    (showValidationState || customError) &&
    ((showValidation && currentErrorMessage !== '') ||
      ((!hasFocus || hasShownError) && (customError || (currentErrorMessage !== '' && hasHadFocus))));

  useEffect(() => {
    if (showError) {
      setHasShownError(true);
    } else if (currentErrorMessage === '') {
      setHasShownError(false);
    }
  }, [showError, currentErrorMessage]);

  useEffect(() => {
    setIsDatepickerOpen(isOpen);
  }, [isOpen]);

  useEffect(() => {
    hasValidation && validateDate(selectedDate);
  }, [minDate]);

  useEffect(() => {
    hasValidation && validateDate(selectedDate);
  }, [maxDate]);

  /**
   * Needed for webcomponent -> To update the default value
   */
  useEffect(() => handleDateChange(value), [value]);

  useEffect(() => {
    updateCaretPositionWhenDotIsAdded();
  }, [selectedDate]);

  /**
   * When there are changes to the selected date and they have not been emitted yet,
   * emit the change once the datepicker does not have focus.
   */
  useEffect(() => {
    !hasFocus && emitValueOnChangeEvents();
  }, [hasChangeToEmit, hasFocus]);

  /**
   * Used to update hovered date range highlight when user changes date with keyboard.
   */
  useEffect(() => {
    if (selectedDate) {
      onDateElementPointerMove?.(selectedDate);
    }
  }, [selectedDate]);

  /**
   * Start outline listener
   *
   * Set initial focused date based on minDate and maxDate
   */
  useEffect(() => {
    addOutlineListenerDatepickerPopover(datepickerRef.current);

    if (hasSelectDateOnOpen) return;
    if (maxDate) {
      setInitialFocusedDate(maxDate);
    } else if (minDate) {
      setInitialFocusedDate(minDate);
    }

    return () => {
      removeOutlineListenerDatepickerPopover(datepickerRef.current);
    };
  }, []);

  /**
   * Update error state when:
   * - datepicker has had focus.
   * - datepicker open state changes.
   */
  useEffect(() => {
    validateDate(selectedDate);
  }, [hasHadFocus, isDatepickerOpen]);

  /**
   * Trigger `updateInputWithSelectedDate` when datepicker is opened by the `isOpen`-prop.
   */
  useEffect(() => {
    if (isDatepickerOpen) {
      updateInputWithSelectedDate();
    }
  }, [isDatepickerOpen]);

  /**
   * Sets the selected date and dispatches the valueOnChange event
   */
  const handleDateChange = (date: Date | null): void => {
    if (date?.toString() === selectedDate?.toString()) {
      return;
    }
    hasValidation && validateDate(date);

    // Set time component of the selected date to 0 by creating a new date object.
    const newDate = date ? new Date(date.getFullYear(), date.getMonth(), date.getDate()) : null;
    if (isEqual(selectedDate, newDate)) return;
    setSelectedDate(newDate);
    setShouldHaveSelected(true);
    setHasChangeToEmit(true);
  };

  /**
   * Emits a new valueOnChange event.
   */
  const emitValueOnChangeEvents = (): void => {
    if (hasChangeToEmit) {
      handleValueOnChangeISOString(selectedDate);
      if (!webcomponent) {
        valueOnChange?.(selectedDate);
      } else {
        webcomponent.setProps({ value: selectedDate }, true);
      }
      setHasChangeToEmit(false);
    }
  };

  /**
   * Handle valueOnChangeISOString event. If newDate is not valid, formatISO crashes the component.
   */
  const handleValueOnChangeISOString = (newDate: Date | null): void => {
    let dateISO;
    if (newDate && isValid(newDate)) {
      dateISO = formatISO(newDate, { representation: 'date' });
    } else if (newDate === null) {
      dateISO = null;
    } else {
      dateISO = 'Invalid Date';
    }
    if (!webcomponent) {
      valueOnChangeISOString?.(dateISO);
    } else {
      webcomponent.triggerEvent('valueOnChangeISOString', dateISO);
    }
  };

  /**
   * Adds and removed outline listener for datepicker popover element
   */
  const addOutlineListenerDatepickerPopover = (ref: HTMLDivElement | null): void => {
    if (ref) {
      outlineListener(ref);
    }
  };
  const removeOutlineListenerDatepickerPopover = (ref: HTMLDivElement | null): void => {
    if (ref) {
      outlineListener(ref, true);
    }
  };

  const onFocus = (): void => {
    updateFocusStates();
    updateCaretPositionOnFocus();
  };

  /**
   * Dispatch open event
   */
  const handleOpenDatepicker = (): void => {
    updateFocusStates();
    updateInputWithSelectedDate();
    setIsDatepickerOpen(true);
    if (!webcomponent && onOpen) {
      onOpen();
    } else if (webcomponent) {
      webcomponent.triggerEvent('onOpen');
    }
  };

  /**
   * Dispatch close event
   */
  const handleCloseDatepicker = (): void => {
    updateFocusStates();
    setHasFocus(false);
    setIsDatepickerOpen(false);
    if (!webcomponent && onClose) {
      onClose();
    } else if (webcomponent) {
      webcomponent.triggerEvent('onClose');
    }
  };

  /**
   * If error is unchanged, don't dispatch event
   *
   * If the input has not been in focus yet, don't dispatch event
   *
   * Set current error based on validation and dispatch errorOnChange event
   */
  const setCurrErrorMessageAndTriggerErrorOnChangeEvent = (error: string): void => {
    if (error === currentErrorMessage) {
      return;
    }
    if (!hasHadFocus) {
      return;
    }
    setCurrentErrorMessage(error);

    if (!webcomponent && errorOnChange) {
      errorOnChange(error);
    } else if (webcomponent) {
      webcomponent.triggerEvent('errorOnChange', error);
    }
  };

  /**
   * Validates the date and finds the current error message if not valid.
   *
   * NB: Will not validate if `customError` is used, of if the datepicker is not dirty.
   */
  const validateDate = (date: Date | null): void => {
    if (customError) {
      return;
    }

    if (!isValid(date)) {
      if (date === null) {
        if (isRequired) {
          setCurrErrorMessageAndTriggerErrorOnChangeEvent('Velg en dato');
        } else {
          setCurrErrorMessageAndTriggerErrorOnChangeEvent('');
        }
      } else {
        setCurrErrorMessageAndTriggerErrorOnChangeEvent('Bruk dd.mm.åååå');
      }
    } else if (date && minDate && isBefore(date.setHours(0, 0, 0, 0), minDate.setHours(0, 0, 0, 0))) {
      setCurrErrorMessageAndTriggerErrorOnChangeEvent(`Kan ikke være før ${format(minDate, 'dd.MM.yyyy')}`);
    } else if (date && maxDate && isAfter(date.setHours(0, 0, 0, 0), maxDate.setHours(0, 0, 0, 0))) {
      setCurrErrorMessageAndTriggerErrorOnChangeEvent(`Kan ikke være etter ${format(maxDate, 'dd.MM.yyyy')}`);
    } else {
      setCurrErrorMessageAndTriggerErrorOnChangeEvent('');
    }
  };

  /**
   * Sets hasHadFocus to true
   *
   * Starts listener for if datepicker stops having, set hasFocus to false and remove listener if so
   * hasFocused is used to determine if the input should show an error
   */
  const updateFocusStates = (): void => {
    setHasHadFocus(true);
    setHasFocus(true);
    validateDate(selectedDate);

    const checkIfDatepickerHasFocus = () => {
      if (
        datepickerRef.current &&
        !datepickerRef.current.contains(document.activeElement) &&
        !datepickerPopoverRef.current
      ) {
        setHasFocus(false);
        window.removeEventListener('focusout', checkIfDatepickerHasFocus);
      }
    };

    window.addEventListener('focusout', checkIfDatepickerHasFocus);
  };

  /**
   * When 2 or 4 numbers are added to the input-field the caret should move to the right of the dot that is added.
   */
  const updateCaretPositionWhenDotIsAdded = (): void => {
    if (!inputRef.current) {
      return;
    }
    if (inputRef.current.value.length === 3 || inputRef.current.value.length === 6) {
      inputRef.current.selectionStart = inputRef.current.value.length + 1;
      inputRef.current.selectionEnd = inputRef.current.value.length + 1;
    }
  };

  /**
   * An invisible unicode character is added at the end of the date-string to avoid material formatting,
   * the caret therefore needs to be moved in front of this character when in focus.
   */
  const updateCaretPositionOnFocus = (): void => {
    setTimeout(() => {
      if (!inputRef.current) {
        return;
      }
      const index = inputRef.current.value.indexOf(unicodeChar);
      if (index > 0) {
        inputRef.current.selectionStart = index;
        inputRef.current.selectionEnd = index;
      }
    }, 10);
  };

  /**
   * If date not selected yet and hasSelectDateOnOpen is true, set the date to current date
   *
   * Set shouldHaveSelected based on same criterias and if the date is valid
   * shouldHaveSelected is used to determine the styling for when a date is showing or not in the datepicker header.
   */
  const updateInputWithSelectedDate = (): void => {
    if (selectedDate === null && hasSelectDateOnOpen) {
      handleDateChange(new Date());
      setShouldHaveSelected(true);
    } else if ((selectedDate === null && !hasSelectDateOnOpen) || !isValid(selectedDate)) {
      setShouldHaveSelected(false);
    } else if (selectedDate !== null) {
      setShouldHaveSelected(true);
    }
  };

  const handleResetDatepickerOnClick = (): void => {
    handleDateChange(null);
    setShouldHaveSelected(false);
    if (!webcomponent) {
      onReset?.();
    } else {
      webcomponent.triggerEvent('onReset');
    }
  };

  /**
   * Replaces the top toolbar inside the datepicker.
   */
  const replaceMuiToolbar = (props: ToolbarComponentProps) => {
    const { date, openView, setOpenView } = props;
    const toggleYearView = () => {
      openView === 'year' ? setOpenView('date') : setOpenView('year');
    };

    if (openView === 'year') {
      addOutlineListenerDatepickerPopover(datepickerPopoverRef.current);
    } else {
      removeOutlineListenerDatepickerPopover(datepickerPopoverRef.current);
    }

    return (
      <div className="ewc-datepicker__toolbar">
        {shouldHaveSelected ? (
          <div className="ewc-datepicker__toolbar-today">
            <span className="ewc-capitalize">{format(date as Date, 'EEEE', { locale: nbLocale })}&#32;</span>
            {format(date as Date, 'd. MMMM', { locale: nbLocale })}
          </div>
        ) : (
          <div />
        )}
        <button
          aria-label="Åpne år-velger"
          className="ewc-datepicker__toolbar-dropdown"
          onClick={toggleYearView}
        >
          <div className="ewc-datepicker__toolbar-year">
            {format(date as Date, 'yyyy', { locale: nbLocale })}
          </div>
          <Icon name={openView === 'year' ? 'arrowDownBold' : 'arrowUpBold'} size="xs" />
        </button>
        {openView === 'date' && (
          <button
            aria-label="Nullstill datovelger"
            className="ewc-datepicker__toolbar-clear"
            onClick={handleResetDatepickerOnClick}
            onKeyDown={(e) =>
              e.key === 'Enter' &&
              setTimeout(() => {
                handleResetDatepickerOnClick();
              })
            }
          >
            <Icon name="reset" size="xs" inlineStyle={{ marginRight: '8px' }} />
            {clearButtonText}
          </button>
        )}
      </div>
    );
  };

  /**
   * Replaces each day shown in the month view inside the datepicker.
   *
   * NB: Does not use the `selectedDate` given from the Mui datepicker, instead uses the one stored in the state `selectedDate`.
   */
  const replaceMuiDayElement = (
    day: Date,
    selected: Date | null,
    isInCurrentMonth: boolean,
    dayComponent: JSX.Element,
  ): JSX.Element => {
    const today = new Date();
    const dayDate = new Date(day);
    const selDate = selected ? new Date(selected) : null;
    const firstDayOfWeek = startOfWeek(dayDate, { weekStartsOn: 1 });
    const lastDayOfWeek = endOfWeek(dayDate, { weekStartsOn: 1 });
    const endOfMonth = lastDayOfMonth(dayDate);
    const isInDateRange =
      hoveredDateRange &&
      hoveredDateRange.start &&
      hoveredDateRange.end &&
      hoveredDateRange.start <= hoveredDateRange.end &&
      isWithinInterval(dayDate, {
        start: hoveredDateRange.start,
        end: hoveredDateRange.end,
      });
    const otherSelectedDate =
      whichRangePicker && whichRangePicker === 'start' ? selectedDateRange?.end : selectedDateRange?.start;
    const dayClasses = classnames('ewc-datepicker__day', {
      ['ewc-datepicker__day-selected']: selDate && isSameDay(dayDate, selDate) && shouldHaveSelected,
      ['ewc-datepicker__day-current']: isSameDay(dayDate, today),
      ['ewc-datepicker__day-disabled']: dayComponent.props.disabled,
      ['ewc-datepicker__day-in-range']: isInDateRange,
      ['ewc-datepicker__day-first-in-range']:
        hoveredDateRange?.start && isSameDay(dayDate, hoveredDateRange.start),
      ['ewc-datepicker__day-last-in-range']:
        hoveredDateRange?.end && isSameDay(dayDate, hoveredDateRange.end),
      ['ewc-datepicker__day-start-of-week']: isSameDay(dayDate, firstDayOfWeek),
      ['ewc-datepicker__day-start-of-month']: dayDate.getDate() === 1,
      ['ewc-datepicker__day-end-of-week']: isSameDay(dayDate, lastDayOfWeek),
      ['ewc-datepicker__day-end-of-month']: isSameDay(dayDate, endOfMonth),
      ['ewc-datepicker__day-other-selected-date']: otherSelectedDate && isSameDay(dayDate, otherSelectedDate),
    });
    if (isInCurrentMonth) {
      if (!dayComponent.props.disabled) {
        return (
          <button
            aria-label={`Velg dato, ${format(day, 'd')}`}
            className={dayClasses}
            onPointerMove={(event) => onDateElementPointerMove?.(day, event)}
            tabIndex={-1}
          >
            {format(day, 'd')}
          </button>
        );
      } else {
        return <div className={dayClasses}>{format(day, 'd')}</div>;
      }
    } else {
      return <div className="ewc-datepicker__day-size"></div>;
    }
  };

  /**
   * Replaces the datepicker format with a custom format
   *
   * Adds a dot (.) after number 2 and number 4 in the string
   *
   * Adds the unicode character to avoid the default formatting from Material
   */
  const replaceMuiDateFormat = (inputString: string): string => {
    const digits = (inputString.match(/\d+/g) || []).join('');
    let res = digits
      .split('')
      .reduce((num1, num2, index) => (index === 2 || index === 4 ? `${num1}.${num2}` : `${num1}${num2}`), '')
      .substring(0, 10);

    if (res.length === 2 || res.length === 5) {
      res = `${res}.`;
    }
    if (res.length > 6 && res.length < 10) {
      res += unicodeChar;
    }
    return res;
  };

  /**
   * Returns a function for dates that should be disabled (sent into the Mui component)
   * Gets the function through getProp for webcomponents
   */
  const disableDateWrapper = (): ((day: Date) => boolean) | undefined => {
    if (webcomponent) {
      return webcomponent.getProp('disableDate');
    }
    return disableDate;
  };

  const datePickerClasses = classnames('ewc-datepicker', {
    ['ewc-datepicker--error']: showError || (isErrorState && !hasFocus),
    ['ewc-datepicker--compact']: isCompact !== false,
    ['ewc-datepicker--unselected']: value === null,
    ['ewc-datepicker--full-width']: isFullWidth,
    ['ewc-datepicker--open']: isDatepickerOpen,
  });

  return (
    <div
      className={datePickerClasses + (className ? ' ' + className : '')}
      ref={datepickerRef}
      style={inlineStyle}
      data-testid="datepicker-wrapper"
      {...rest}
    >
      {label !== '' && (
        <label
          className={classnames('ewc-datepicker__label', {
            'e-form-field__label--optional': hasOptionalText && !isRequired,
          })}
          aria-label={label}
          data-testid="datepicker-label"
        >
          {label}
        </label>
      )}

      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={nbLocale}>
        <KeyboardDatePicker
          variant="inline"
          autoOk={true}
          value={selectedDate}
          placeholder={placeholder}
          format="dd.MM.yyyy"
          rifmFormatter={replaceMuiDateFormat}
          disabled={isDisabled === true}
          fullWidth={isFullWidth === true}
          minDate={minDate ?? undefined}
          maxDate={maxDate ?? undefined}
          onChange={handleDateChange}
          onFocus={onFocus}
          open={isDatepickerOpen}
          onOpen={handleOpenDatepicker}
          onClose={handleCloseDatepicker}
          keyboardIcon={
            <Icon
              name="calendar"
              color={isDisabled ? getColor('disabled') : getColor('black')}
              size={`${isCompact ? 'xs' : 'sm'}`}
            />
          }
          leftArrowIcon={<Icon name="arrowLongLeftBold" size="xs" />}
          rightArrowIcon={<Icon name="arrowLongRightBold" size="xs" />}
          ToolbarComponent={replaceMuiToolbar}
          renderDay={(day, _selectedDate, isInCurrentMonth, dayComponent) =>
            replaceMuiDayElement(day as Date, selectedDate, isInCurrentMonth, dayComponent)
          }
          inputProps={{ ref: inputRef }}
          KeyboardButtonProps={{
            'aria-label': selectedDate === null ? 'Velg dato' : 'Endre dato',
            disableRipple: true,
            classes: {
              root: isDatepickerOpen ? 'ewc-datepicker__keyboardbutton--open' : '',
            },
          }}
          leftArrowButtonProps={{
            'aria-label': 'Vis forrige måned',
            disableRipple: true,
          }}
          rightArrowButtonProps={{
            'aria-label': 'Vis neste måned',
            disableRipple: true,
          }}
          PopoverProps={{
            style: {
              zIndex: 99999,
            },
            'aria-modal': true,
            'aria-label': selectedDate === null ? 'Velg dato' : 'Endre dato',
            anchorOrigin: { horizontal: 'left', vertical: 'bottom' },
            transformOrigin: { horizontal: 'left', vertical: 'top' },
            ref: datepickerPopoverRef,
            onPointerMove: (event) => onDatepickerPopoverPointerMove?.(event),
          }}
          InputAdornmentProps={{
            'aria-required': isRequired,
          }}
          initialFocusedDate={initialFocusedDate}
          shouldDisableDate={disableDateWrapper()}
        />
      </MuiPickersUtilsProvider>

      {showError && (
        <div className="ewc-datepicker__error">
          <Icon name="removeCircle" size="xs" color={getColor('red')} inlineStyle={{ marginTop: '4px' }} />
          <div className="ewc-datepicker__helper-text">
            {customError}
            {currentErrorMessage}
          </div>
        </div>
      )}
      {!showError && hasErrorPlaceholderElement && showValidationState && (
        <div className="ewc-datepicker__error-placeholder" data-testid="datepicker-error-placeholder"></div>
      )}
    </div>
  );
};

export default Datepicker;
