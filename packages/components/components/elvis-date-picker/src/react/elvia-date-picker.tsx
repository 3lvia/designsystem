import React, { FC, useState, useEffect } from 'react';
import './style.scss';
import classnames from 'classnames';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import MomentUtils from '@date-io/moment';
import moment from 'moment';
import 'moment/locale/nb';
moment.updateLocale('nb', {
  week: {
    dow: 1,
  },
  // locale: 'nb',
  weekdaysShort: ['sø', 'ma', 'ti', 'on', 'to', 'fr', 'lø'],
  weekdays: ['Søndag', 'Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag'],
});
import PickerToolbar from '@material-ui/pickers/_shared/PickerToolbar';
import ToolbarButton from '@material-ui/pickers/_shared/ToolbarButton';
import { makeStyles } from '@material-ui/core';
export const useStyles = makeStyles({
  toolbar: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
});

export interface DatePickerProps {
  value: Date | number | null;
  label: string;
  minDate: Date;
  maxDate: Date;
  startDate: Date;
  isCompact: boolean;
  isDisabled: boolean;
  isFullWidth: boolean | string;
  errorMessage: string;
  valueOnChange?: (value: number | Date | null) => void;
  webcomponent?: any;
}
class LocalizedUtils extends MomentUtils {
  getDropdownIcon() {
    return (
      <i
        className="ewc-date-picker__icon ewc-date-picker__icon-dropdown"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M.389 5.869a1.328 1.328 0 011.878 0L12 15.6l9.733-9.732a1.328 1.328 0 011.878 1.878L13.443 17.915h-.001a2.04 2.04 0 01-2.885 0L.39 7.747a1.328 1.328 0 010-1.878z' fill='black'/%3e%3c/svg%3e")`,
        }}
      ></i>
    );
  }
}

const DatePicker: FC<DatePickerProps> = ({
  value = null,
  label = '',
  isCompact = false,
  isDisabled = false,
  errorMessage = '',
  isFullWidth = false,
  minDate = undefined,
  maxDate = undefined,
  startDate = undefined,
  valueOnChange,
  webcomponent,
}) => {
  const [selectedDate, setSelectedDate] = useState(value);
  const emptyLabelString = 'dd.mm.yyyy';
  const defaultWidth = '163px';
  const compactWidth = '133px';

  const materialTheme = createMuiTheme({
    props: {
      MuiButtonBase: {
        disableRipple: true,
      },
    },
    overrides: {
      MuiInputBase: {
        root: {
          width: isCompact ? compactWidth : defaultWidth,
        },
      },
      MuiFormControl: {
        root: {
          width: isCompact ? compactWidth : defaultWidth,
        },
      },
      MuiIconButton: {
        root: {
          padding: '8px',
          '&:hover': {
            backgroundColor: '#29d305',
          },
          focusVisible: {
            backgroundColor: '#29d305',
          },
          '&:active': {
            transform: 'scale(0.93)',
          },
        },
      },
    },
  });

  useEffect(() => {
    handleDateChange(value);
  }, [value]);

  const handleDateChange = (date: number | Date | null) => {
    setSelectedDate(date);
    if (!webcomponent && valueOnChange) {
      valueOnChange(date);
    } else if (webcomponent) {
      // True -> Prevents rerender
      webcomponent.setProps({ value: date }, true);
    }
  };

  const getKeyboardIcon = () => {
    const keyboardIcon = `url("data:image/svg+xml,%3csvg width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cg clip-path='url(%23clip0)' fill='black'%3e%3cpath d='M2.251 24a2.252 2.252 0 01-2.25-2.25V5.25A2.252 2.252 0 012.251 3h3.75V.75a.75.75 0 011.5 0V3h9V.75a.75.75 0 011.5 0V3h3.75a2.252 2.252 0 012.25 2.25v16.5a2.252 2.252 0 01-2.25 2.25h-19.5zm-.75-2.25c0 .414.336.75.75.75h19.5a.75.75 0 00.75-.75V10.5h-21v11.25zm21-12.75V5.25a.75.75 0 00-.75-.75h-3.75V6a.75.75 0 01-1.5 0V4.5h-9V6a.75.75 0 01-1.5 0V4.5h-3.75a.75.75 0 00-.75.75V9h21z'/%3e%3crect x='3' y='19.5' width='6' height='1.5' rx='.75'/%3e%3c/g%3e%3cdefs%3e%3cclipPath id='clip0'%3e%3cpath d='M0 0h24v24H0V0z' fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e")`;
    const disabledKeyboardIcon = `url("data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='%23BDBDBD' xmlns='http://www.w3.org/2000/svg'%3e%3cg clip-path='url(%23clip0)' fill='%23BDBDBD'%3e%3cpath d='M2.251 24a2.252 2.252 0 01-2.25-2.25V5.25A2.252 2.252 0 012.251 3h3.75V.75a.75.75 0 011.5 0V3h9V.75a.75.75 0 011.5 0V3h3.75a2.252 2.252 0 012.25 2.25v16.5a2.252 2.252 0 01-2.25 2.25h-19.5zm-.75-2.25c0 .414.336.75.75.75h19.5a.75.75 0 00.75-.75V10.5h-21v11.25zm21-12.75V5.25a.75.75 0 00-.75-.75h-3.75V6a.75.75 0 01-1.5 0V4.5h-9V6a.75.75 0 01-1.5 0V4.5h-3.75a.75.75 0 00-.75.75V9h21z'/%3e%3crect x='3' y='19.5' width='6' height='1.5' rx='.75'/%3e%3c/g%3e%3cdefs%3e%3cclipPath id='clip0'%3e%3cpath d='M0 0h24v24H0V0z' fill='%23BDBDBD'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e")`;
    return (
      <i
        className="ewc-date-picker__icon ewc-date-picker__icon-cal"
        style={{
          backgroundImage: isDisabled ? disabledKeyboardIcon : keyboardIcon,
        }}
      ></i>
    );
  };

  const getCustomToolbar = function (props: any) {
    const { date, openView, setOpenView, title } = props;
    let dropdownIconUp = false;
    const handleChangeViewClick = (view: any) => () => {
      dropdownIconUp = !dropdownIconUp;
      setOpenView(view);
    };
    const dropdownClasses = classnames('ewc-date-picker__icon ewc-date-picker__icon-dropwdown', {
      ['rotate']: dropdownIconUp,
    });
    return (
      <PickerToolbar title={title}>
        <div className="ewc-date-picker--toolbar-today">{date.format('dddd DD. MMMM')}</div>
        <div className="ewc-date-picker--toolbar-year" onClick={handleChangeViewClick('year')}>
          <ToolbarButton label={date.format('YYYY')} selected={openView === 'year'} />
          <i
            className={dropdownClasses}
            style={{
              backgroundImage: `url("data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M.389 5.869a1.328 1.328 0 011.878 0L12 15.6l9.733-9.732a1.328 1.328 0 011.878 1.878L13.443 17.915h-.001a2.04 2.04 0 01-2.885 0L.39 7.747a1.328 1.328 0 010-1.878z' fill='black'/%3e%3c/svg%3e")`,
            }}
          ></i>
        </div>
      </PickerToolbar>
    );
  };

  const getFormat = (str: string) => {
    return str;
  };

  const datePickerClasses = classnames('ewc-date-picker', {
    ['ewc-date-picker--error']: errorMessage !== '',
    ['ewc-date-picker--compact']: isCompact !== false,
  });
  const datePickerLabelClasses = classnames('ewc-date-picker__label', {
    ['ewc-date-picker__label--disabled']: isDisabled !== false,
  });

  return (
    <div className={datePickerClasses}>
      {label !== '' && <label className={datePickerLabelClasses}>{label}</label>}
      <ThemeProvider theme={materialTheme}>
        <MuiPickersUtilsProvider utils={LocalizedUtils} locale={'nb'} libInstance={moment}>
          <KeyboardDatePicker
            fullWidth={isFullWidth == 'true'}
            variant="inline"
            value={selectedDate}
            onChange={handleDateChange}
            format="DD.MM.yyyy"
            rifmFormatter={getFormat}
            maskChar={' '}
            minDate={startDate ? startDate : minDate}
            maxDate={maxDate}
            label={emptyLabelString}
            disabled={isDisabled}
            // autoOk={true} -> Skru på når ferdig testet
            ToolbarComponent={getCustomToolbar}
            PopoverProps={{
              anchorOrigin: { horizontal: 'left', vertical: 'bottom' },
              transformOrigin: { horizontal: 'left', vertical: 'top' },
            }}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
            keyboardIcon={getKeyboardIcon()}
            leftArrowIcon={
              <i
                className="ewc-date-picker__icon ewc-date-picker__icon--arrow"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3csvg width='24' height='25' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cg clip-path='url(%23clip0)'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M12.594 23.776a1.514 1.514 0 01-2.141 0L.443 13.767a1.513 1.513 0 01-.322-1.664c.004-.01.01-.02.018-.028l-.002.002.009-.013a4.894 4.894 0 00.12-.179 32.106 32.106 0 01.165-.243.172.172 0 01.017-.02l.001-.002L10.453 1.617a1.514 1.514 0 112.141 2.141L5.17 11.182h17.316a1.514 1.514 0 110 3.029H5.17l7.424 7.424c.591.591.591 1.55 0 2.141z' fill='black'/%3e%3c/g%3e%3cdefs%3e%3cclipPath id='clip0'%3e%3cpath fill='white' transform='matrix(1 0 0 -1 0 24.7)' d='M0 0h24v24H0z'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e")`,
                }}
              ></i>
            }
            rightArrowIcon={
              <i
                className="ewc-date-picker__icon ewc-date-picker__icon--arrow"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3csvg width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cg clip-path='url(%23clip0)'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M13.447.914a1.514 1.514 0 10-2.141 2.14l7.424 7.425H1.414a1.514 1.514 0 100 3.029H18.73l-7.424 7.424a1.514 1.514 0 002.141 2.141l10.01-10.009a1.511 1.511 0 00.319-1.667l-.303-.455a.098.098 0 00-.008-.01l-.004-.005-.005-.005L13.447.914z' fill='black'/%3e%3c/g%3e%3cdefs%3e%3cclipPath id='clip0'%3e%3cpath fill='white' d='M0 0h24v24H0z'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e")`,
                }}
              ></i>
            }
          />
        </MuiPickersUtilsProvider>
      </ThemeProvider>
      {errorMessage && (
        <div className="ewc-date-picker__error">
          <i
            className="ewc-date-picker__icon ewc-date-picker__icon--error"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='%23FF0000' xmlns='http://www.w3.org/2000/svg'%3e%3cg clip-path='url(%23clip0)' fill='%23FF0000'%3e%3cpath d='M12 23.999c-6.617 0-12-5.383-12-12s5.383-12 12-12 12 5.383 12 12-5.383 12-12 12zm0-22.5c-5.79 0-10.5 4.71-10.5 10.5s4.71 10.5 10.5 10.5 10.5-4.71 10.5-10.5-4.71-10.5-10.5-10.5z'/%3e%3cpath d='M16.5 17.249a.743.743 0 01-.53-.22L12 13.06l-3.97 3.97a.744.744 0 01-1.06 0 .752.752 0 010-1.061l3.97-3.97-3.97-3.97a.743.743 0 01-.22-.53c0-.2.078-.389.22-.53a.743.743 0 01.53-.22c.2 0 .389.078.53.22l3.97 3.97 3.97-3.97a.744.744 0 011.06 0c.142.141.22.33.22.53s-.078.389-.22.53l-3.97 3.97 3.97 3.97a.752.752 0 010 1.061.746.746 0 01-.53.219z'/%3e%3c/g%3e%3cdefs%3e%3cclipPath id='clip0'%3e%3cpath d='M0 0h24v24H0V0z' fill='%23FF0000'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e")`,
            }}
          ></i>
          <div className="ewc-date-picker__helper-text">{errorMessage}</div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;
