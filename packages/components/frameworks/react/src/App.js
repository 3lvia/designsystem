import React from 'react';
import './App.scss';
// import * as Popover from '@elvia/popover/dist/react/tsx/elvia-popover';
import { Popover } from './components/elvia-popover'

function App() {

  return (
    <div className="App">
      <h1>React preview</h1>

      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras mollis massa eu velit egestas bibendum.
        Vivamus id justo ut eros pellentesque tincidunt in in lectus. Maecenas gravida luctus turpis, quis sodales
        nunc luctus non. Vivamus mollis, leo eu viverra pretium, eros purus mattis nibh, nec interdum eros dui ut
        enim. Sed mattis nulla id dignissim aliquam. Duis ornare non lacus ut vehicula. Proin leo urna, aliquet
        auctor elit id, condimentum vulputate sapien.
      </p>

      <Popover 
        title="React demo of popover" 
        description="Alle privatkunder må bruke BankID første gang."
        trigger={<button>Long long button</button>}
      ></Popover>

      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras mollis massa eu velit egestas bibendum.
        Vivamus id justo ut eros pellentesque tincidunt in in lectus. Maecenas gravida luctus turpis, quis sodales
        nunc luctus non. Vivamus mollis, leo eu viverra pretium, eros purus mattis nibh, nec interdum eros dui ut
        enim. Sed mattis nulla id dignissim aliquam. Duis ornare non lacus ut vehicula. Proin leo urna, aliquet
        auctor elit id, condimentum vulputate sapien. Phasellus ultricies fermentum dui, id venenatis urna sodales
        sit amet. Nunc ut nisi id enim vulputate volutpat. Praesent ullamcorper eleifend rhoncus. Aenean ac leo
        blandit, tristique magna elementum, tempus nulla. Nullam non rhoncus neque. Nulla ultrices ligula lectus,
        non vehicula dui pellentesque ac.
      </p>
    </div >
  );
}

export default App;
