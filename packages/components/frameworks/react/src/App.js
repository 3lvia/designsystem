import React from 'react';
import './App.scss';
import { Popover } from '@elvia/popover/react';

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
