import React, { useRef, useState } from 'react';
import './App.scss';
import { Popover } from '@elvia/elvis-popover/react';
import { Checkbox } from '@elvia/elvis-checkbox/react';
import { Tabs } from '@elvia/elvis-tabs/react';
import { ProgressLinear } from '@elvia/elvis-progress-linear/react';
import { DatePicker } from '@elvia/elvis-date-picker/react';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import moment from 'moment';
import MomentUtils from '@date-io/moment';
import 'moment/locale/nb';
moment.updateLocale('nb', {
  week: {
    dow: 1,
  },
});

function App() {
  const [trackedState, setTrackedState] = useState(true);
  const [selectedState, setSelectedState] = useState(2);
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const ref = useRef();
  const items = ['Statistikk', 'Siste kall', 'HAN-port', 'Feilkategorisering'];
  const dateCurr = new Date();

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  function update() {
    setTrackedState(!trackedState);
  }

  const [progressValue, setProgressValue] = useState(0);

  function increaseProgress() {
    setProgressValue((prevProgValue) => prevProgValue + 10);
  }
  function decreaseProgress() {
    setProgressValue((prevProgValue) => prevProgValue - 10);
  }
  function resetProgress() {
    setProgressValue(0);
  }

  function update() {
    setSelectedState(0);
  }

  return (
    <div className="App">
      <h1>React preview</h1>
      {/* 
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <KeyboardDatePicker
          variant="inline"
          format="DD/MM/yyyy"
          margin="normal"
          id="date-picker-inline"
          minDate={new Date()}
          label="Label"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      </MuiPickersUtilsProvider> */}

      <h2>DatePicker</h2>
      <div
        style={{
          marginTop: '16px',
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        <div style={{ marginTop: '16px' }}>
          <DatePicker value={dateCurr} valueOnChange={(dateCurr) => console.log(dateCurr)}></DatePicker>
        </div>
        <div style={{ marginTop: '16px' }}>
          <DatePicker
            id="datepicker1"
            errorMessage="Error"
            valueOnChange={(dateCurr) => console.log(dateCurr)}
          ></DatePicker>
        </div>
        {/* <div style={{ marginTop: '16px'}}><DatePicker isDisabled={true} valueOnChange={(dateCurr) => console.log(dateCurr)}></DatePicker></div> */}
        {/* <div style={{ marginTop: '16px'}}><DatePicker isCompact={true} valueOnChange={(dateCurr) => console.log(dateCurr)}></DatePicker></div> */}
        <div style={{ marginTop: '16px' }}>
          <DatePicker
            id="datepicker2"
            isFullWidth={true}
            valueOnChange={(dateCurr) => console.log(dateCurr)}
          ></DatePicker>
        </div>
        {/* <div style={{ marginTop: '16px'}}><DatePicker minDate={dateCurr} valueOnChange={(dateCurr) => console.log(dateCurr)}></DatePicker></div> */}
        {/* <div>{selectedDate.toString()}</div> */}
      </div>

      <hr style={{ margin: '40px 0' }} />

      <h2>Tabs</h2>
      <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'center' }}>
        <Tabs items={items} value={2} valueOnChange={setSelectedState}></Tabs>
        <div>{selectedState.toString()}</div>
      </div>

      <hr style={{ margin: '40px 0' }} />

      <h2>Checkbox</h2>
      <div style={{ marginTop: '16px' }}>
        <Checkbox
          ref={ref}
          checked={trackedState}
          label="Normal checkbox"
          name="Nametest"
          id="CheckboxTestID"
          size="normal"
          changeHandler={setTrackedState}
        ></Checkbox>
        <Checkbox label="Small checkbox" name="Nametest" id="CheckboxTestID" size="small"></Checkbox>
      </div>

      <hr style={{ margin: '40px 0' }} />

      <h2>Popover</h2>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
        <span style={{ marginTop: '16px' }}>
          <Popover
            header="BankID"
            content="Alle privatkunder må bruke BankID første gang. Alle privatkunder må bruke BankID første gang. Alle privatkunder må bruke BankID første gang."
            trigger={<button>Right top</button>}
            posX="right"
          ></Popover>
        </span>
        <div style={{ marginTop: '16px' }}>
          <Popover
            content="Alle privatkunder må bruke BankID."
            trigger={<button>Left top</button>}
            posX="left"
            noTitle="true"
          ></Popover>
        </div>
        <div style={{ marginTop: '16px' }}>
          <Popover
            header="BankID"
            content="Alle privatkunder må bruke BankID første gang de logger inn på Min side."
            trigger={<button>Center top</button>}
            hasCloseBtn={false}
          ></Popover>
        </div>
      </div>
      <div style={{ marginTop: '16px' }}>
        <Popover
          content="Alle privatkunder må bruke BankID første gang."
          trigger={<button>Center bottom</button>}
          hasCloseBtn={false}
          posY="bottom"
        ></Popover>
      </div>
      <div style={{ marginTop: '16px' }}>
        <Popover
          header="BankID"
          content="Alle privatkunder må bruke BankID første gang."
          trigger={<button>Right bottom</button>}
          posY="bottom"
          posX="right"
        ></Popover>
      </div>
      <div style={{ marginTop: '16px' }}>
        <Popover
          content={
            <div
              style={{
                boxSizing: 'border-box',
                padding: '50px',
                width: '100%',
                border: '2px dashed lightgray',
              }}
            >
              Custom content custom content custom content custom content
            </div>
          }
          trigger={<button>Left bottom</button>}
          posY="bottom"
          posX="left"
        ></Popover>
      </div>

      <h2>Progressbar</h2>

      <ProgressLinear value={progressValue}></ProgressLinear>

      <div style={{ width: '100%', display: 'flex', justifyContent: 'space-around' }}>
        <button onClick={increaseProgress}>Increase</button>
        <button onClick={decreaseProgress}>Decrease</button>
        <button onClick={resetProgress}>reset</button>
      </div>
      <div>{progressValue}</div>

      <h2>Progressbar indeterminate</h2>

      <div>
        <ProgressLinear isIndeterminate></ProgressLinear>
      </div>
      <h2>Progressbar Error</h2>

      <div>
        <ProgressLinear isError></ProgressLinear>
      </div>
    </div>
  );
}

export default App;
