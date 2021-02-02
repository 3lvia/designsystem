import React, { useRef, useState, useEffect } from 'react';
import './App.scss';
import { Popover } from '@elvia/elvis-popover/react';
import { Checkbox } from '@elvia/elvis-checkbox/react';
import { Tabs } from '@elvia/elvis-tabs/react';
import { ProgressLinear } from '@elvia/elvis-progress-linear/react';
import { Slider } from '@elvia/elvis-slider/react';

function App() {
  const [trackedState, setTrackedState] = useState(true);
  const [selectedState, setSelectedState] = useState(0);
  const ref = useRef();
  const items = [
    { label: 'Statistikk' },
    { label: 'Siste kall' },
    { label: 'HAN-port' },
    { label: 'Feilkategorisering' },
  ];

  // progress-linear state and handling for demo
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

  // slider state and handling

  // simple slider examples
  const [simpleSliderValue, setSimpleSliderValue] = useState(10);
  //-------------------------------------------------------------

  // simple slider with attached input field example
  const [sliderValue, setSliderValue] = useState(10);
  const [sliderInputValue, setSliderInputValue] = useState(sliderValue);

  const handleInputChange = (event) => {
    setSliderInputValue(parseInt(event.target.value));
  };

  //-------------------------------------------------------------
  // simple rangeSlider examples
  const [simpleRangeSliderValue, setSimpleRangeSliderValue] = useState([10, 50]);

  //-------------------------------------------------------------
  // RangeSlider with attached input fields examples
  const [rangesliderValue, setRangesliderValue] = useState([20, 80]);
  const [rangeSliderInputValues, setRangeSliderInputValues] = useState(() => {
    return rangesliderValue;
  });

  const handleRangeWithInput = (event) => {
    setRangesliderValue(event);
  };

  const handleRangeInputOne = (event) => {
    // parseIn eventtarget number to number
    let newvalue = parseInt(event.target.value);

    let newRangeValue = [newvalue, rangesliderValue[1]];
    setRangeSliderInputValues(newRangeValue);
  };
  const handleRangeInputTwo = (event) => {
    // parseIn eventtarget number to number
    let newvalue = parseInt(event.target.value);

    let newRangeValue = [rangesliderValue[0], newvalue];
    setRangeSliderInputValues(newRangeValue);
  };

  return (
    <div className="App">
      <h1>React preview</h1>

      <h2>Slider - simple</h2>
      <Slider
        value={simpleSliderValue}
        valueOnChange={setSimpleSliderValue}
        minValue={0}
        maxValue={100}
        name="hiddenSliderInput"
      ></Slider>
      <div>
        <p>Slider Value is now : {simpleSliderValue}</p>
      </div>
      <hr />

      <h2>Slider - simple with attached input field</h2>
      <div className="exampleContainer">
        <div className="slider">
          <Slider
            value={sliderValue}
            inputValue={sliderInputValue}
            valueOnChange={setSliderValue}
            minValue={0}
            maxValue={90}
            name="hiddenSliderInput"
          ></Slider>
        </div>
        <div className="exampleInput">
          <input
            type="number"
            placeholder="insert some number"
            value={sliderValue}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <h2>Slider - simple disabled</h2>
      <Slider value={24} isDisabled={true}></Slider>

      <h2>Slider - range</h2>
      <Slider
        value={simpleRangeSliderValue}
        valueOnChange={setSimpleRangeSliderValue}
        minValue={0}
        maxValue={90}
      ></Slider>
      <div>
        <p>Slider Value is now : {simpleRangeSliderValue[0] + ' and ' + simpleRangeSliderValue[1]}</p>
      </div>

      <h2>Slider - range with input fields</h2>
      <div className="exampleContainer">
        <div className="exampleInput">
          <input
            type="number"
            placeholder="insert some number"
            value={rangesliderValue[0]}
            onChange={handleRangeInputOne}
          />
        </div>
        <div className="slider">
          <Slider
            value={rangesliderValue}
            inputValue={rangeSliderInputValues}
            valueOnChange={handleRangeWithInput}
            minValue={0}
            maxValue={90}
          ></Slider>
        </div>
        <div className="exampleInput">
          <input
            type="number"
            placeholder="insert some number"
            value={rangesliderValue[1]}
            onChange={handleRangeInputTwo}
          />
        </div>
      </div>
      <div>
        SliderRangevalues are now : {rangesliderValue[0]} & {rangesliderValue[1]}
      </div>

      <h2>Tabs</h2>
      <div style={{ marginTop: '16px' }}>
        <Tabs items={items} value={selectedState} valueOnChange={setSelectedState}></Tabs>
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
            title="BankID"
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
            title="BankID"
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
          title="BankID"
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
