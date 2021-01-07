import React, { useRef, useState } from 'react';
import './App.scss';
import { Popover } from '@elvia/elvis-popover/react';
import { Checkbox } from '@elvia/elvis-checkbox/react';
import { ProgressLinear } from '@elvia/elvis-progress-linear/react';
import { Slider } from '@elvia/elvis-slider/react';

function App() {

  const [trackedState, setTrackedState] = useState(true);
  const ref = useRef();

  function update() {
    setTrackedState(!trackedState);
  }

  const [progressValue, setProgressValue] = useState(0)

  function increaseProgress() {
    setProgressValue(prevProgValue => prevProgValue + 10)
  }
  function decreaseProgress() {
    setProgressValue(prevProgValue => prevProgValue - 10)
  }
  function resetProgress() {
    setProgressValue(0)
  }

  return (
    <div className="App">
      <h1>React preview</h1>

      <h2>Slider - simple</h2>

      <Slider value={10}></Slider>

      <h2>Slider - range</h2>
      <Slider value={[25, 75]}></Slider>



      <h2>Checkbox</h2>
      {/* <button onClick={() => {ref.current.updateCheckedState(false)}}>Update state</button> */}
      <button onClick={update}>Update state</button>
      <div>{trackedState.toString()}</div>
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
        <Checkbox
          label="Small checkbox"
          name="Nametest"
          id="CheckboxTestID"
          size="small"
        ></Checkbox>
      </div>

      <hr style={{ margin: '40px 0' }} />

      <h2>Popover</h2>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
        <div>
          <Popover
            title="React demo of popover"
            description="Alle privatkunder må bruke BankID første gang."
            trigger={<button>Right top</button>}
            posX="right"
          ></Popover>
        </div>
        <div>
          <Popover
            title="React demo of popover"
            description="Alle privatkunder må bruke BankID første gang."
            trigger={<button>Left top</button>}
            posX="left"
          ></Popover>
        </div>
        <div>
          <Popover
            title="React demo of popover"
            description="Alle privatkunder må bruke BankID første gang."
            trigger={<button>Center top</button>}
          ></Popover>
        </div>
      </div>
      <div>
        <Popover
          title="React demo of popover"
          description="Alle privatkunder må bruke BankID første gang."
          trigger={<button>Center bottom</button>}
          posY="bottom"
        ></Popover>
      </div>
      <div>
        <Popover
          title="React demo of popover"
          description="Alle privatkunder må bruke BankID første gang."
          trigger={<button>Right bottom</button>}
          posY="bottom"
          posX="right"
        ></Popover>
      </div>
      <div>
        <Popover
          title="React demo of popover"
          description="Alle privatkunder må bruke BankID første gang."
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
      <div>
        {progressValue}
      </div>

      <h2>Progressbar indeterminate</h2>

      <div>
        <ProgressLinear isIndeterminate></ProgressLinear>
      </div>
      <h2>Progressbar Error</h2>

      <div>
        <ProgressLinear isError></ProgressLinear>
      </div>


    </div >
  );
}

export default App;
