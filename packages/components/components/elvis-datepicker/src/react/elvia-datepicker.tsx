import React, { FC, useState, useRef, useEffect, CSSProperties } from 'react';
import './style.scss';
import classnames from 'classnames';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import toolbox from '@elvia/elvis-toolbox';
import { Icon } from '@elvia/elvis-icon/react';
import { getColor } from '@elvia/elvis-colors';
import DateFnsUtils from '@date-io/date-fns';
import nbLocale from 'date-fns/locale/nb';
import format from 'date-fns/format';
import isValid from 'date-fns/isValid';
import isSameDay from 'date-fns/isSameDay';
import isAfter from 'date-fns/isAfter';
import isBefore from 'date-fns/isBefore';
import { ElvisComponentWrapper } from '@elvia/elvis-component-wrapper/src/elvia-component';

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
  onOpen?: () => void;
  onClose?: () => void;
  webcomponent?: ElvisComponentWrapper;
  placeholder?: string;
  isOpen?: boolean;
  className?: string;
  inlineStyle?: { [style: string]: CSSProperties };
  hasOptionalText?: boolean;
  showValidation?: boolean;
  showValidationState: boolean;
  isErrorState?: boolean;
  errorOnChange?: (error: string) => void;
  hasValidation: boolean;
  clearButtonText: string;
  disableDate?: (day: Date) => boolean;
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
  onOpen,
  onClose,
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
  errorOnChange,
  disableDate,
  ...rest
}) => {
  const [selectedDate, setSelectedDate] = useState(value);
  const [initialFocusedDate, setInitialFocusedDate] = useState<Date | null>(null);
  const [currErrorMessage, setCurrErrorMessage] = useState('');
  const [hasHadFocus, setHasHadFocus] = useState(false);
  const [hasFocus, setHasFocus] = useState(false);
  const [shouldHaveSelected, setShouldHaveSelected] = useState(true);
  const [isDatepickerOpen, setIsDatepickerOpen] = useState(isOpen);
  const datepickerRef = useRef<HTMLDivElement>(null);
  const datepickerPopoverRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  // Unicode character U+00AD - Hack used to avoid date-fns from formatting date before date is valid
  const unicodeChar = '­';
  const showError =
    (showValidationState || customError) &&
    ((showValidation && currErrorMessage !== '') ||
      (!hasFocus && (customError || (currErrorMessage !== '' && hasHadFocus))));

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
   * Sets the selected date and dispatches the valueOnChange event
   */
  const handleDateChange = (date: Date | null): void => {
    hasValidation && validateDate(date);
    setSelectedDate(date);

    if (!webcomponent && valueOnChange) {
      valueOnChange(date);
    } else if (webcomponent) {
      webcomponent.setProps({ value: date }, true);
    }
  };

  /**
   * Adds and removed outline listener for datepicker popover element
   */
  const addOutlineListenerDatepickerPopover = (ref: HTMLDivElement | null): void => {
    if (ref) {
      toolbox.outlineListener(ref);
    }
  };
  const removeOutlineListenerDatepickerPopover = (ref: HTMLDivElement | null): void => {
    if (ref) {
      toolbox.outlineListener(ref, true);
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
    if (error === currErrorMessage) {
      return;
    }
    if (!hasHadFocus) {
      return;
    }
    setCurrErrorMessage(error);

    if (!webcomponent && errorOnChange) {
      errorOnChange(error);
    } else if (webcomponent) {
      webcomponent.triggerEvent('errorOnChange', error);
    }
  };

  /**
   * Validates the date and finds the current error message if not valid
   */
  const validateDate = (date: Date | null): void => {
    if (customError) {
      return;
    }

    if (!isValid(date)) {
      if (date === null && isRequired) {
        setCurrErrorMessageAndTriggerErrorOnChangeEvent('Velg en dato');
      } else if (date !== null) {
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

  /**
   * All these replaceMui[Element] functions return some HTML that replaces the default HTML from the package
   */
  const replaceMuiCalIcon = (): JSX.Element => {
    return (
      <Icon
        name="calendar"
        color={isDisabled ? getColor('disabled') : undefined}
        size={`${isCompact ? 'xs' : 'sm'}`}
      />
    );
  };

  const replaceMuiArrowIcon = (isLeft: boolean): JSX.Element => {
    return <Icon name={`${isLeft ? 'arrowLongLeftBold' : 'arrowLongRightBold'}`} size="xs" />;
  };

  const replaceMuiToolbar = (props: any) => {
    const { date, openView, setOpenView } = props;
    const toggleYearView = () => {
      openView === 'year' ? setOpenView('date') : setOpenView('year');
    };

    const dropdownIconClasses = classnames('ewc-datepicker__icon ewc-datepicker__icon-dropdown', {
      ['rotate-forward']: openView === 'year',
    });

    if (openView === 'year') {
      addOutlineListenerDatepickerPopover(datepickerPopoverRef.current);
    } else {
      removeOutlineListenerDatepickerPopover(datepickerPopoverRef.current);
    }

    return (
      <div className="ewc-datepicker__toolbar">
        {shouldHaveSelected ? (
          <div className="ewc-datepicker__toolbar-today">
            <span className="ewc-capitalize">{format(date, 'EEEE', { locale: nbLocale })}&#32;</span>
            {format(date, 'd. MMMM', { locale: nbLocale })}
          </div>
        ) : (
          <div />
        )}
        <button
          aria-label="Åpne år-velger"
          className="ewc-datepicker__toolbar-dropdown"
          onClick={toggleYearView}
        >
          <div className="ewc-datepicker__toolbar-year">{format(date, 'yyyy', { locale: nbLocale })}</div>
          <Icon name="arrowDownBold" size="xs" className={dropdownIconClasses} />
        </button>
        {openView === 'date' && (
          <button
            aria-label="Nullstill datovelger"
            className="ewc-datepicker__toolbar-clear"
            onClick={() => {
              handleDateChange(null);
              setShouldHaveSelected(false);
            }}
          >
            <Icon name="reset" size="xs" inlineStyle={{ marginRight: '8px' }} />
            {clearButtonText}
          </button>
        )}
      </div>
    );
  };

  const replaceMuiDayElement = (
    day: any,
    selected: any,
    isInCurrentMonth: any,
    dayComponent: any,
  ): JSX.Element => {
    const today = new Date();
    const dayDate = new Date(day);
    const selDate = new Date(selected);

    const dayClasses = classnames('ewc-datepicker__day', {
      ['ewc-datepicker__day-selected']: isSameDay(dayDate, selDate) && shouldHaveSelected,
      ['ewc-datepicker__day-current']: isSameDay(dayDate, today),
      ['ewc-datepicker__day-disabled']: dayComponent.props.disabled,
    });
    if (isInCurrentMonth) {
      if (!dayComponent.props.disabled) {
        return (
          <button aria-label={`Velg dato, ${format(day, 'd')}`} className={dayClasses}>
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
      .substring(0, 9);

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

  /**
   * Overriding material theme
   */
  const materialTheme = createTheme({
    props: {
      MuiButtonBase: {
        disableRipple: true,
      },
      MuiPopover: {
        style: {
          zIndex: 99999,
        },
      },
      MuiInputBase: {
        className: isDatepickerOpen ? 'Mui-focused' : undefined,
      },
    },
  });

  const datePickerClasses = classnames('ewc-datepicker', {
    ['ewc-datepicker--error']: showError || (isErrorState && !hasFocus),
    ['ewc-datepicker--compact']: isCompact !== false,
    ['ewc-datepicker--unselected']: value === null,
    ['ewc-datepicker--full-width']: isFullWidth,
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

      <ThemeProvider theme={materialTheme}>
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
            minDate={minDate ? minDate : undefined}
            maxDate={maxDate ? maxDate : undefined}
            onChange={handleDateChange}
            onFocus={onFocus}
            open={isDatepickerOpen}
            onOpen={handleOpenDatepicker}
            onClose={handleCloseDatepicker}
            keyboardIcon={replaceMuiCalIcon()}
            leftArrowIcon={replaceMuiArrowIcon(true)}
            rightArrowIcon={replaceMuiArrowIcon(false)}
            ToolbarComponent={replaceMuiToolbar}
            renderDay={(day: any, selectedDate: any, isInCurrentMonth: any, dayComponent: any) =>
              replaceMuiDayElement(day, selectedDate, isInCurrentMonth, dayComponent)
            }
            inputProps={{ ref: inputRef }}
            KeyboardButtonProps={{
              'aria-label': selectedDate === null ? 'Velg dato' : 'Endre dato',
            }}
            leftArrowButtonProps={{
              'aria-label': 'Vis forrige måned',
            }}
            rightArrowButtonProps={{
              'aria-label': 'Vis neste måned',
            }}
            PopoverProps={{
              'aria-modal': true,
              'aria-label': selectedDate === null ? 'Velg dato' : 'Endre dato',
              anchorOrigin: { horizontal: 'left', vertical: 'bottom' },
              transformOrigin: { horizontal: 'left', vertical: 'top' },
              ref: datepickerPopoverRef,
            }}
            InputAdornmentProps={{
              'aria-required': isRequired,
            }}
            initialFocusedDate={initialFocusedDate}
            shouldDisableDate={disableDateWrapper()}
          />
        </MuiPickersUtilsProvider>
      </ThemeProvider>

      {showError && (
        <div className="ewc-datepicker__error">
          <Icon name="removeCircle" size="xs" color={getColor('red')} inlineStyle={{ marginTop: '4px' }} />
          <div className="ewc-datepicker__helper-text">
            {customError}
            {currErrorMessage}
          </div>
        </div>
      )}
    </div>
  );
};

export default Datepicker;
