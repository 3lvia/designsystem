import React, { FC, useState } from 'react';
import './style.scss';
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
}

const DatePicker: FC<DatePickerProps> = ({ value, isNorwegian = false }) => {
  const [label, setLabel] = useState('Choose date"');
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
    <div className="ewc-date-picker">
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="DD/MM/yyyy"
          margin="normal"
          id="date-picker-inline"
          label={label}
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        <i
          className="ewc-date-picker__icon"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3csvg width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cg clip-path='url(%23clip0)' fill='black'%3e%3cpath d='M2.251 24a2.252 2.252 0 01-2.25-2.25V5.25A2.252 2.252 0 012.251 3h3.75V.75a.75.75 0 011.5 0V3h9V.75a.75.75 0 011.5 0V3h3.75a2.252 2.252 0 012.25 2.25v16.5a2.252 2.252 0 01-2.25 2.25h-19.5zm-.75-2.25c0 .414.336.75.75.75h19.5a.75.75 0 00.75-.75V10.5h-21v11.25zm21-12.75V5.25a.75.75 0 00-.75-.75h-3.75V6a.75.75 0 01-1.5 0V4.5h-9V6a.75.75 0 01-1.5 0V4.5h-3.75a.75.75 0 00-.75.75V9h21z'/%3e%3crect x='3' y='19.5' width='6' height='1.5' rx='.75'/%3e%3c/g%3e%3cdefs%3e%3cclipPath id='clip0'%3e%3cpath d='M0 0h24v24H0V0z' fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e")`,
          }}
        ></i>
        {value}
      </MuiPickersUtilsProvider>
    </div>
  );
};

export default DatePicker;
