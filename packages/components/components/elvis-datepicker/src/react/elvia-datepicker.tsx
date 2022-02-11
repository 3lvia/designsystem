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
  webcomponent?: any;
  placeholder?: string;
  isOpen?: boolean;
  className?: string;
  inlineStyle?: { [style: string]: CSSProperties };
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
  // This is the unicode character U+00AD
  // Used to avoid date-fns from formatting date before date is valid
  const unicodeChar = '­';

  // Styling
  const datePickerClasses = classnames('ewc-datepicker', {
    ['ewc-datepicker--error']: !hasFocus && (customError || (currErrorMessage !== '' && hasHadFocus)),
    ['ewc-datepicker--compact']: isCompact !== false,
    ['ewc-datepicker--unselected']: value === null,
    ['ewc-datepicker--full-width']: isFullWidth,
  });
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
    },
  });
  useEffect(() => {
    setIsDatepickerOpen(isOpen);
  }, [isOpen]);

  useEffect(() => {
    addOutlineFix(datepickerRef.current);

    return () => {
      removeOutlineFix(datepickerRef.current);
    };
  }, []);

  useEffect(() => {
    if (hasSelectDateOnOpen) return;
    if (maxDate) {
      setInitialFocusedDate(maxDate);
    } else if (minDate) {
      setInitialFocusedDate(minDate);
    }
  }, []);

  // Needed for webcomponent -> To update the default value
  useEffect(() => handleDateChange(value), [value]);

  useEffect(() => {
    updateCaretPositionWhenDotIsAdded();
  }, [selectedDate]);

  const handleDateChange = (date: Date | null) => {
    validateDate(date);
    setSelectedDate(date);

    // Updating for any changes in the state of the date field
    if (!webcomponent && valueOnChange) {
      valueOnChange(date);
    } else if (webcomponent) {
      // True -> Prevents rerender
      webcomponent.setProps({ value: date }, true);
    }
  };

  const addOutlineFix = (ref: HTMLDivElement | null) => {
    if (ref) {
      toolbox.outlineListener(ref);
    }
  };

  const removeOutlineFix = (ref: HTMLDivElement | null) => {
    if (ref) {
      toolbox.outlineListener(ref, true);
    }
  };

  const onFocus = () => {
    updateFocusState();
    updateCaretPositionOnFocus();
  };

  const handleOpenDatepicker = () => {
    updateFocusState();
    updateInputWithSelectedDate();
    setIsDatepickerOpen(true);
    if (!webcomponent && onOpen) {
      onOpen();
    } else if (webcomponent) {
      webcomponent.triggerEvent('onOpen');
    }
  };

  const handleCloseDatepicker = () => {
    setIsDatepickerOpen(false);
    if (!webcomponent && onClose) {
      onClose();
    } else if (webcomponent) {
      webcomponent.triggerEvent('onClose');
    }
  };

  const validateDate = (date: Date | null) => {
    if (customError) {
      return;
    }
    if (date === null && !isRequired) {
      setCurrErrorMessage('');
    } else if (!isValid(date)) {
      if (date === null && isRequired) {
        setCurrErrorMessage('Velg en dato');
      } else if (date !== null) {
        setCurrErrorMessage('Bruk dd.mm.åååå');
      }
    } else if (date && minDate && isBefore(date.setHours(0, 0, 0, 0), minDate.setHours(0, 0, 0, 0))) {
      setCurrErrorMessage(`Kan ikke være før ${format(minDate, 'dd.MM.yyyy')}`);
    } else if (date && maxDate && isAfter(date.setHours(0, 0, 0, 0), maxDate.setHours(0, 0, 0, 0))) {
      setCurrErrorMessage(`Kan ikke være etter ${format(maxDate, 'dd.MM.yyyy')}`);
    } else {
      setCurrErrorMessage('');
    }
  };

  const updateFocusState = () => {
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

  const updateCaretPositionWhenDotIsAdded = () => {
    if (!inputRef.current) {
      return;
    }
    if (inputRef.current.value.length === 3 || inputRef.current.value.length === 6) {
      inputRef.current.selectionStart = inputRef.current.value.length + 1;
      inputRef.current.selectionEnd = inputRef.current.value.length + 1;
    }
  };

  const updateCaretPositionOnFocus = () => {
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

  const updateInputWithSelectedDate = () => {
    if (selectedDate === null && hasSelectDateOnOpen) {
      handleDateChange(new Date());
      setShouldHaveSelected(true);
    } else if ((selectedDate === null && !hasSelectDateOnOpen) || !isValid(selectedDate)) {
      setShouldHaveSelected(false);
    } else if (selectedDate !== null) {
      setShouldHaveSelected(true);
    }
  };

  const getCalIcon = () => {
    return (
      <Icon
        name="calendar"
        color={`${isDisabled ? getColor('grey-30') : getColor('black')}`}
        size={`${isCompact ? 'xs' : 'sm'}`}
      />
    );
  };

  const getArrowIcon = (isLeft: boolean) => {
    return <Icon name={`${isLeft ? 'arrowLongLeftBold' : 'arrowLongRightBold'}`} size="xs" />;
  };

  const getCustomToolbar = (props: any) => {
    const { date, openView, setOpenView } = props;
    const toggleYearView = () => {
      openView === 'year' ? setOpenView('date') : setOpenView('year');
    };

    const dropdownIconClasses = classnames('ewc-datepicker__icon ewc-datepicker__icon-dropdown', {
      ['rotate-forward']: openView === 'year',
    });

    if (openView === 'year') {
      addOutlineFix(datepickerPopoverRef.current);
    } else {
      removeOutlineFix(datepickerPopoverRef.current);
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
      </div>
    );
  };

  const getDayElement = (day: any, selected: any, isInCurrentMonth: any, dayComponent: any) => {
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

  const getDateFormat = (inputString: string) => {
    const digits = (inputString.match(/\d+/g) || []).join('');
    let res = digits
      .split('')
      .reduce((num1, num2, index) => (index === 2 || index === 4 ? `${num1}.${num2}` : `${num1}${num2}`), '')
      .substr(0, 10);

    if (res.length === 2 || res.length === 5) {
      res = `${res}.`;
    }
    if (res.length > 6 && res.length < 10) {
      res += unicodeChar;
    }
    return res;
  };

  return (
    <div
      className={datePickerClasses + (className ? ' ' + className : '')}
      ref={datepickerRef}
      style={inlineStyle}
      data-testid="datepicker-wrapper"
    >
      {label !== '' && (
        <label className="ewc-datepicker__label" aria-label={label} data-testid="datepicker-label">
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
            rifmFormatter={getDateFormat}
            disabled={isDisabled === true}
            fullWidth={isFullWidth === true}
            minDate={minDate}
            maxDate={maxDate}
            onChange={handleDateChange}
            onFocus={onFocus}
            open={isDatepickerOpen}
            onOpen={handleOpenDatepicker}
            onClose={handleCloseDatepicker}
            keyboardIcon={getCalIcon()}
            leftArrowIcon={getArrowIcon(true)}
            rightArrowIcon={getArrowIcon(false)}
            ToolbarComponent={getCustomToolbar}
            renderDay={(day: any, selectedDate: any, isInCurrentMonth: any, dayComponent: any) =>
              getDayElement(day, selectedDate, isInCurrentMonth, dayComponent)
            }
            inputProps={{ ref: inputRef }}
            KeyboardButtonProps={{
              'aria-label': 'Velg dato',
            }}
            leftArrowButtonProps={{
              'aria-label': 'Vis forrige måned',
            }}
            rightArrowButtonProps={{
              'aria-label': 'Vis neste måned',
            }}
            PopoverProps={{
              anchorOrigin: { horizontal: 'left', vertical: 'bottom' },
              transformOrigin: { horizontal: 'left', vertical: 'top' },
              ref: datepickerPopoverRef,
            }}
            initialFocusedDate={initialFocusedDate}
          />
        </MuiPickersUtilsProvider>
      </ThemeProvider>

      {!hasFocus && (customError || (currErrorMessage !== '' && hasHadFocus)) && (
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
