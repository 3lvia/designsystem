import React, { useRef, useState } from 'react';
import './App.scss';
import { Popover } from '@elvia/popover/react';
import { Checkbox } from '@elvia/checkbox/react';

function App() {

  const [trackedState, setTrackedState] = useState(true);
  const ref = useRef();

  return (
    <div className="App">
      <h1>React preview</h1>
      
      <h2>Checkbox</h2>
      <div style={{marginTop: '16px'}}>
        <Checkbox
          ref={ref}
          checked={trackedState}
          label="Normal checkbox"
          name="Nametest"
          checkboxId="CheckboxTestID"
          size="normal"
          changeHandler={setTrackedState}
        ></Checkbox>
         <Checkbox
          label="Small checkbox"
          name="Nametest"
          checkboxId="CheckboxTestID"
          size="small"
          disabled="true"
        ></Checkbox>
      </div>

      <hr style={{margin: '40px 0'}} />

      <h2>Popover</h2>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end'}}>
        <div>
          <Popover
            title="React demo of popover"
            description="Alle privatkunder må bruke BankID første gang de skal logge inn på Min side."
            trigger={<button>Right top</button>}
            posX="right"
          ></Popover>
        </div>
        <div>
          <Popover
            title="React demo of popover"
            description="Alle privatkunder må bruke BankID første gang de skal logge inn på Min side."
            trigger={<button>Left top</button>}
            posX="left"
          ></Popover>
        </div>
        <div>
          <Popover
            title="React demo of popover"
            description="Alle privatkunder må bruke BankID første gang de skal logge inn på Min side."
            trigger={<button>Center top</button>}
          ></Popover>
        </div>
      </div>
      <div>
        <Popover
          title="React demo of popover"
          description="Alle privatkunder må bruke BankID første gang de skal logge inn på Min side."
          trigger={<button>Center bottom</button>}
          posY="bottom"
        ></Popover>
      </div>
      <div>
        <Popover
          title="React demo of popover"
          description="Alle privatkunder må bruke BankID første gang de skal logge inn på Min side."
          trigger={<button>Right bottom</button>}
          posY="bottom"
          posX="right"
        ></Popover>
      </div>
      <div>
        <Popover
          title="React demo of popover"
          description="Alle privatkunder må bruke BankID første gang de skal logge inn på Min side."
          trigger={<button>Left bottom</button>}
          posY="bottom"
          posX="left"
        ></Popover>
      </div>
    </div >
  );
}

export default App;
