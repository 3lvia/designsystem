import React, { FC, useState, useRef, useEffect } from 'react';
import './style.scss';
import classnames from 'classnames';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import toolbox from '@elvia/elvis-toolbox';
import DateFnsUtils from '@date-io/date-fns';
import nbLocale from 'date-fns/locale/nb';
import format from 'date-fns/format';
import isValid from 'date-fns/isValid';

export interface DatepickerProps {
  value?: Date | null;
  label?: string;
  isCompact?: boolean;
  isDisabled?: boolean;
  isFullWidth?: boolean;
  errorMessage?: string;
  minDate?: Date;
  maxDate?: Date;
  valueOnChange?: (value: Date | null) => void;
  webcomponent?: any;
}

export const Datepicker: FC<DatepickerProps> = ({
  value = null,
  label = 'Velg dato',
  isCompact = false,
  isDisabled = false,
  isFullWidth = false,
  errorMessage = '',
  minDate,
  maxDate,
  valueOnChange,
  webcomponent,
}) => {
  const [selectedDate, setSelectedDate] = useState(value);
  const [currErrorMessage, setCurrErrorMessage] = useState('');
  const [hasHadFocus, setHasHadFocus] = useState(false);
  const [hasFocus, setHasFocus] = useState(false);
  const customError = errorMessage;
  const datepickerRef = useRef<HTMLDivElement>(null);
  const datepickerPopoverRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const placeholderString = 'dd.mm.yyyy';
  // This is the unicode character U+0081
  // Used to avoid date-fns from formatting date before date is valid
  const unicodeChar = '';
  const errorMessages = {
    invalid: 'Bruk dd.mm.åååå',
    invalidMin: 'Dato må være etter ',
    invalidMax: 'Dato må være før ',
  };

  // Styling
  const datePickerClasses = classnames('ewc-datepicker', {
    ['ewc-datepicker--error']: hasHadFocus && !hasFocus && (currErrorMessage !== '' || customError !== ''),
    ['ewc-datepicker--compact']: isCompact !== false,
    ['ewc-datepicker--unselected']: value === null,
    ['ewc-datepicker--full-width']: isFullWidth,
  });
  const materialTheme = createMuiTheme({
    props: {
      MuiButtonBase: {
        disableRipple: true,
      },
    },
  });

  useEffect(() => {
    addOutlineFix(datepickerRef.current);

    return () => {
      removeOutlineFix(datepickerRef.current);
    };
  }, []);

  // Needed for webcomponent -> To update the default value
  useEffect(() => handleDateChange(value), [value]);

  useEffect(() => {
    updateCaretPositionWhenDotIsAdded();
  }, [selectedDate]);

  const handleDateChange = (date: Date | null) => {
    validateDate(date);
    setSelectedDate(date);

    // Updating when date valid
    if (isValid(date)) {
      if (!webcomponent && valueOnChange) {
        valueOnChange(date);
      } else if (webcomponent) {
        // True -> Prevents rerender
        webcomponent.setProps({ value: date }, true);
      }
    }
  };

  const validateDate = (date: Date | null) => {
    if (customError) {
      setCurrErrorMessage(customError);
    } else {
      if (!isValid(date)) {
        setCurrErrorMessage(errorMessages.invalid);
      } else if (date && minDate && date < minDate) {
        setCurrErrorMessage(errorMessages.invalidMin + format(minDate, 'dd.MM.yyyy'));
      } else if (date && maxDate && date > maxDate) {
        setCurrErrorMessage(errorMessages.invalidMax + format(maxDate, 'dd.MM.yyyy'));
      } else {
        setCurrErrorMessage('');
      }
    }
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

  const onFocus = () => {
    setHasHadFocus(true);
    setHasFocus(true);
    listenForFocus();
    updateCaretPositionOnFocus();
  };

  const listenForFocus = () => {
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

  const addOutlineFix = (ref: HTMLDivElement | null) => {
    toolbox.outlineListener(ref);
  };

  const removeOutlineFix = (ref: HTMLDivElement | null) => {
    toolbox.outlineListener(ref, true);
  };

  const onOpen = () => {
    setHasHadFocus(true);
    setHasFocus(true);
    listenForFocus();
    updateInputWithSelectedDate();
  };

  const updateInputWithSelectedDate = () => {
    if (selectedDate === null) {
      setSelectedDate(new Date());
    }
  };

  const getCalIcon = () => {
    const calendar = `url("data:image/svg+xml,%3csvg width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cg clip-path='url(%23clip0)' fill='black'%3e%3cpath d='M2.251 24a2.252 2.252 0 01-2.25-2.25V5.25A2.252 2.252 0 012.251 3h3.75V.75a.75.75 0 011.5 0V3h9V.75a.75.75 0 011.5 0V3h3.75a2.252 2.252 0 012.25 2.25v16.5a2.252 2.252 0 01-2.25 2.25h-19.5zm-.75-2.25c0 .414.336.75.75.75h19.5a.75.75 0 00.75-.75V10.5h-21v11.25zm21-12.75V5.25a.75.75 0 00-.75-.75h-3.75V6a.75.75 0 01-1.5 0V4.5h-9V6a.75.75 0 01-1.5 0V4.5h-3.75a.75.75 0 00-.75.75V9h21z'/%3e%3crect x='3' y='19.5' width='6' height='1.5' rx='.75'/%3e%3c/g%3e%3cdefs%3e%3cclipPath id='clip0'%3e%3cpath d='M0 0h24v24H0V0z' fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e")`;
    const disabledCalendar = `url("data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='%23BDBDBD' xmlns='http://www.w3.org/2000/svg'%3e%3cg clip-path='url(%23clip0)' fill='%23BDBDBD'%3e%3cpath d='M2.251 24a2.252 2.252 0 01-2.25-2.25V5.25A2.252 2.252 0 012.251 3h3.75V.75a.75.75 0 011.5 0V3h9V.75a.75.75 0 011.5 0V3h3.75a2.252 2.252 0 012.25 2.25v16.5a2.252 2.252 0 01-2.25 2.25h-19.5zm-.75-2.25c0 .414.336.75.75.75h19.5a.75.75 0 00.75-.75V10.5h-21v11.25zm21-12.75V5.25a.75.75 0 00-.75-.75h-3.75V6a.75.75 0 01-1.5 0V4.5h-9V6a.75.75 0 01-1.5 0V4.5h-3.75a.75.75 0 00-.75.75V9h21z'/%3e%3crect x='3' y='19.5' width='6' height='1.5' rx='.75'/%3e%3c/g%3e%3cdefs%3e%3cclipPath id='clip0'%3e%3cpath d='M0 0h24v24H0V0z' fill='%23BDBDBD'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e")`;
    return (
      <i
        className="ewc-datepicker__icon ewc-datepicker__icon--cal"
        style={{
          backgroundImage: isDisabled ? disabledCalendar : calendar,
        }}
      ></i>
    );
  };

  const getArrowIcon = (isLeft: boolean) => {
    const leftArrow = `url("data:image/svg+xml,%3csvg width='24' height='25' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cg clip-path='url(%23clip0)'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M12.594 23.776a1.514 1.514 0 01-2.141 0L.443 13.767a1.513 1.513 0 01-.322-1.664c.004-.01.01-.02.018-.028l-.002.002.009-.013a4.894 4.894 0 00.12-.179 32.106 32.106 0 01.165-.243.172.172 0 01.017-.02l.001-.002L10.453 1.617a1.514 1.514 0 112.141 2.141L5.17 11.182h17.316a1.514 1.514 0 110 3.029H5.17l7.424 7.424c.591.591.591 1.55 0 2.141z' fill='black'/%3e%3c/g%3e%3cdefs%3e%3cclipPath id='clip0'%3e%3cpath fill='white' transform='matrix(1 0 0 -1 0 24.7)' d='M0 0h24v24H0z'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e")`;
    const rightArrow = `url("data:image/svg+xml,%3csvg width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cg clip-path='url(%23clip0)'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M13.447.914a1.514 1.514 0 10-2.141 2.14l7.424 7.425H1.414a1.514 1.514 0 100 3.029H18.73l-7.424 7.424a1.514 1.514 0 002.141 2.141l10.01-10.009a1.511 1.511 0 00.319-1.667l-.303-.455a.098.098 0 00-.008-.01l-.004-.005-.005-.005L13.447.914z' fill='black'/%3e%3c/g%3e%3cdefs%3e%3cclipPath id='clip0'%3e%3cpath fill='white' d='M0 0h24v24H0z'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e")`;
    return (
      <i
        className="ewc-datepicker__icon ewc-datepicker__icon--arrow"
        style={{
          backgroundImage: isLeft ? leftArrow : rightArrow,
        }}
      ></i>
    );
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
        <div className="ewc-datepicker__toolbar-today">
          <span className="ewc-capitalize">{format(date, 'EEEE', { locale: nbLocale })}&#32;</span>
          {format(date, 'd. MMMM', { locale: nbLocale })}
        </div>
        <button
          aria-label="Åpne år-velger"
          className="ewc-datepicker__toolbar-dropdown"
          onClick={toggleYearView}
        >
          <div className="ewc-datepicker__toolbar-year">{format(date, 'yyyy', { locale: nbLocale })}</div>
          <i
            className={dropdownIconClasses}
            style={{
              backgroundImage: `url("data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M.389 5.869a1.328 1.328 0 011.878 0L12 15.6l9.733-9.732a1.328 1.328 0 011.878 1.878L13.443 17.915h-.001a2.04 2.04 0 01-2.885 0L.39 7.747a1.328 1.328 0 010-1.878z' fill='black'/%3e%3c/svg%3e")`,
            }}
          ></i>
        </button>
      </div>
    );
  };

  const getDayElement = (day: any, selected: any, isInCurrentMonth: any, dayComponent: any) => {
    const today = new Date();
    const dayDate = new Date(day);
    const selDate = new Date(selected);
    const dayClasses = classnames('ewc-datepicker__day', {
      ['ewc-datepicker__day-selected']:
        dayDate.getDate() === selDate.getDate() &&
        dayDate.getMonth() === selDate.getMonth() &&
        dayDate.getFullYear() === selDate.getFullYear(),
      ['ewc-datepicker__day-current']:
        dayDate.getDate() === today.getDate() &&
        dayDate.getMonth() === today.getMonth() &&
        dayDate.getFullYear() === today.getFullYear(),
      ['ewc-datepicker__day-disabled']: dayComponent.props.disabled,
    });
    if (isInCurrentMonth) {
      if (!dayComponent.props.disabled) {
        return (
          <button aria-label="Velg dato" className={dayClasses}>
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
    <div className={datePickerClasses} ref={datepickerRef}>
      {label !== '' && (
        <label className="ewc-datepicker__label" aria-label={label}>
          {label}
        </label>
      )}

      <ThemeProvider theme={materialTheme}>
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={nbLocale}>
          <KeyboardDatePicker
            variant="inline"
            autoOk={true}
            value={selectedDate}
            placeholder={placeholderString}
            format="dd.MM.yyyy"
            rifmFormatter={getDateFormat}
            disabled={isDisabled === true}
            fullWidth={isFullWidth === true}
            minDate={minDate}
            maxDate={maxDate}
            onChange={handleDateChange}
            onFocus={onFocus}
            onOpen={onOpen}
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
              'aria-label': 'Forrige måned',
            }}
            rightArrowButtonProps={{
              'aria-label': 'Neste måned',
            }}
            PopoverProps={{
              anchorOrigin: { horizontal: 'left', vertical: 'bottom' },
              transformOrigin: { horizontal: 'left', vertical: 'top' },
              ref: datepickerPopoverRef,
            }}
          />
        </MuiPickersUtilsProvider>
      </ThemeProvider>

      {!hasFocus && hasHadFocus && currErrorMessage && (
        <div className="ewc-datepicker__error">
          <i
            className="ewc-datepicker__icon ewc-datepicker__icon--error"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='%23FF0000' xmlns='http://www.w3.org/2000/svg'%3e%3cg clip-path='url(%23clip0)' fill='%23FF0000'%3e%3cpath d='M12 23.999c-6.617 0-12-5.383-12-12s5.383-12 12-12 12 5.383 12 12-5.383 12-12 12zm0-22.5c-5.79 0-10.5 4.71-10.5 10.5s4.71 10.5 10.5 10.5 10.5-4.71 10.5-10.5-4.71-10.5-10.5-10.5z'/%3e%3cpath d='M16.5 17.249a.743.743 0 01-.53-.22L12 13.06l-3.97 3.97a.744.744 0 01-1.06 0 .752.752 0 010-1.061l3.97-3.97-3.97-3.97a.743.743 0 01-.22-.53c0-.2.078-.389.22-.53a.743.743 0 01.53-.22c.2 0 .389.078.53.22l3.97 3.97 3.97-3.97a.744.744 0 011.06 0c.142.141.22.33.22.53s-.078.389-.22.53l-3.97 3.97 3.97 3.97a.752.752 0 010 1.061.746.746 0 01-.53.219z'/%3e%3c/g%3e%3cdefs%3e%3cclipPath id='clip0'%3e%3cpath d='M0 0h24v24H0V0z' fill='%23FF0000'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e")`,
            }}
          ></i>
          <div className="ewc-datepicker__helper-text">{currErrorMessage}</div>
        </div>
      )}
    </div>
  );
};

export default Datepicker;
