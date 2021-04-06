import React, { FC, useState, useRef, useEffect } from 'react';
import './style.scss';
import styled from 'styled-components';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import MomentUtils from '@date-io/moment';
import moment from 'moment';
import 'moment/locale/nb';
moment.updateLocale('en', {
  week: {
    dow: 1,
  },
});

export interface DatePickerProps {
  value: number;
  isNorwegian: boolean;
  isDisabled: boolean;
}

const Wrapper = styled.div``;
class LocalizedUtils extends MomentUtils {
  getDatePickerHeaderText(date: any) {
    return moment(date).format('dddd Do MMMM');
  }
  getCalendarHeaderText(date: any) {
    return moment(date).format('MMMM');
  }
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

const DatePicker: FC<DatePickerProps> = ({ value, isNorwegian = false, isDisabled = false }) => {
  const [label, setLabel] = useState('Choose date');
  const elvisDatePicker = useRef<KeyboardDatePicker>(null);
  const [localLanguage, setLocalLanguage] = useState('en');
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const materialTheme = createMuiTheme({
    props: {
      // Name of the component
      MuiButtonBase: {
        // The properties to apply
        disableRipple: true, // No more ripple, on the whole application!
        root: {
          '&$focused': {
            outline: '2px solid #0064fa',
            outlineOffset: '2px',
          },
        },
      },
    },
  });

  useEffect(() => {
    if (isNorwegian) {
      moment.locale('nb');
      setLocalLanguage('nb');
      setLabel('Velg dato');
    }
  });

  useEffect(() => {
    if (elvisDatePicker.current !== null) {
      const element = elvisDatePicker.current.querySelectorAll('.MuiTypography-subtitle1');
      console.log(elvisDatePicker.current);
      console.log(element);
    }
  });

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  return (
    <Wrapper>
      <div className="ewc-date-picker" ref={elvisDatePicker}>
        <ThemeProvider theme={materialTheme}>
          <MuiPickersUtilsProvider utils={LocalizedUtils} locale={localLanguage} libInstance={moment}>
            <KeyboardDatePicker
              views={['year', 'date']}
              variant="inline"
              format="DD.MM.yyyy"
              margin="normal"
              id="date-picker-inline"
              // minDate={new Date()} -> burde ha egen fade-klasse når man har min date
              label={label}
              value={selectedDate}
              defaultValue={null}
              onChange={handleDateChange}
              disabled={isDisabled}
              // autoOk={true} -> Skru på når ferdig testet
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
              // ToolbarComponent={() => (<div><ToolbarComponentDefault/><OtherComponent /></div>)}
              keyboardIcon={
                <i
                  className="ewc-date-picker__icon"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3csvg width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cg clip-path='url(%23clip0)' fill='black'%3e%3cpath d='M2.251 24a2.252 2.252 0 01-2.25-2.25V5.25A2.252 2.252 0 012.251 3h3.75V.75a.75.75 0 011.5 0V3h9V.75a.75.75 0 011.5 0V3h3.75a2.252 2.252 0 012.25 2.25v16.5a2.252 2.252 0 01-2.25 2.25h-19.5zm-.75-2.25c0 .414.336.75.75.75h19.5a.75.75 0 00.75-.75V10.5h-21v11.25zm21-12.75V5.25a.75.75 0 00-.75-.75h-3.75V6a.75.75 0 01-1.5 0V4.5h-9V6a.75.75 0 01-1.5 0V4.5h-3.75a.75.75 0 00-.75.75V9h21z'/%3e%3crect x='3' y='19.5' width='6' height='1.5' rx='.75'/%3e%3c/g%3e%3cdefs%3e%3cclipPath id='clip0'%3e%3cpath d='M0 0h24v24H0V0z' fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e")`,
                  }}
                ></i>
              }
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
            <div style={{ display: 'none' }}>{value}</div>
          </MuiPickersUtilsProvider>
        </ThemeProvider>
      </div>
    </Wrapper>
  );
};

export default DatePicker;
