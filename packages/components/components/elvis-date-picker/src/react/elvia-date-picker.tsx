import React, { FC, useState, useEffect } from 'react';
import './style.scss';
import styled from 'styled-components';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import moment from 'moment';
import MomentUtils from '@date-io/moment';
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

const Wrapper = styled.div`
  // Label
  .MuiFormLabel-root {
    margin: -8px 0;

    font-family: 'Red Hat Text', Verdana, sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 23px;
    color: black;
    letter-spacing: normal;
  }
  .MuiFormLabel-root.Mui-focused {
    color: black;
  }
  .MuiFormLabel-root.Mui-focusVisible {
    outline: 2px solid #0064fa;
    outline-offset: 2px;
  }
  .MuiInputAdornment-root .MuiIconButton-root {
    width: 40px;
    height: 40px;
    margin-right: 7px;
    &:hover {
      background-color: rgba(0, 0, 0, 0.04);
    }
  }
  // Input
  .MuiInputBase-root {
    width: 320px;

    font-family: 'Red Hat Text', Verdana, sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 22px;
    letter-spacing: normal;

    height: 48px;
    border-radius: 4px;
    border: 1px solid black;
    // Button
    .MuiButtonBase-root {
      &:hover {
        background-color: #29d305;
      }
      .MuiIconButton-label .MuiSvgIcon-root path {
        display: none;
      }
    }
  }
  .MuiInput-underline:before,
  .MuiInput-underline:after,
  .MuiInput-underline:hover:not(.Mui-disabled):before {
    border: 0;
  }
  .MuiInput-underline.Mui-focused:after {
    border: 2px solid #29d305;
    border-radius: 4px;
    top: -1px;
    left: -1px;
    height: 44px;
    width: 316px;
    transition: none;
  }
  input.MuiInputBase-input {
    padding-left: 16px;
  }
`;

const DatePicker: FC<DatePickerProps> = ({ value, isNorwegian = false, isDisabled = false }) => {
  const [label, setLabel] = useState('Choose date');
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  useEffect(() => {
    if (isNorwegian) {
      moment.locale('nb');
      setLabel('Velg dato');
    }
  });

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <Wrapper>
      <div className="ewc-date-picker">
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="DD/MM/yyyy"
            margin="normal"
            id="date-picker-inline"
            minDate={new Date()}
            label={label}
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
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
            disabled={isDisabled}
          />
          {value}
        </MuiPickersUtilsProvider>
      </div>
    </Wrapper>
  );
};

export default DatePicker;
