import React from 'react';
import { useRef, useEffect} from 'react';
import './App.scss';
import { Popover } from '@elvia/popover/react';
import { Checkbox } from '@elvia/checkbox/react';

function App() {

  const checkbox = useRef(null);
  let checkBoxVal = true;

  useEffect(() => {
    // Listen checkbox changes
    if(!checkbox.current){
      return;
    }
    checkbox.current.addEventListener('props-changed', (event) => {
      checkBoxVal = event.detail.checked;
    });
    checkbox.current.setProps({ checked: true });
    checkbox.current.getProps();
  }, [])

  return (
    <div className="App">
      <h1>React preview</h1>
      
      <h2>Popover</h2>
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

      <hr style={{margin: '40px 0'}} />

      <h2>Checkbox</h2>
      <strong>Initial value:</strong>
      {/* {{ checkBoxVal }} */}
      <div>
        <Checkbox
          ref={checkbox}
          label="Label Test"
          name="Nametest"
          id="CheckboxTestID"
          size="normal"
        ></Checkbox>
      </div>
    </div >
  );
}

export default App;
