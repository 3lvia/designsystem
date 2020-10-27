import React from 'react';
import './App.css';
// import * as Popover from '@elvia/popover/dist/react/tsx/elvia-popover';
import { Popover } from './components/elvia-popover'

function App() {

  return (
    <div className="App">
      <h1>React preview</h1>

      <div style={{display: 'flex', justifyContent: 'center'}}>
        <Popover 
          title="React demo of popover" 
          description="Alle privatkunder må bruke BankID første gang de skal logge inn på Min side."
          trigger={<button>trigger</button>}
        >
        </Popover>
      </div>

      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras mollis massa eu velit egestas bibendum.
        Vivamus id justo ut eros pellentesque tincidunt in in lectus. Maecenas gravida luctus turpis, quis sodales
        nunc luctus non. Vivamus mollis, leo eu viverra pretium, eros purus mattis nibh, nec interdum eros dui ut
        enim. Sed mattis nulla id dignissim aliquam. Duis ornare non lacus ut vehicula. Proin leo urna, aliquet
        auctor elit id, condimentum vulputate sapien. Phasellus ultricies fermentum dui, id venenatis urna sodales
        sit amet. Nunc ut nisi id enim vulputate volutpat. Praesent ullamcorper eleifend rhoncus. Aenean ac leo
        blandit, tristique magna elementum, tempus nulla. Nullam non rhoncus neque. Nulla ultrices ligula lectus,
        non vehicula dui pellentesque ac. Donec mattis pharetra nisl id dictum. Maecenas turpis ex, luctus quis
        ante rutrum, laoreet dictum eros. Donec facilisis, augue in pellentesque pellentesque, sem erat fermentum
        augue, id tempor sapien quam at nibh. Nulla porttitor lorem pretium, semper lorem vitae, lacinia nisl.
        Integer leo velit, ultricies vitae elit at, feugiat bibendum arcu. Morbi pretium quam eget metus commodo,
        non tempus ante consequat. Ut nec imperdiet lectus. Proin quis porttitor tortor. Vestibulum ante ipsum
        primis in faucibus orci luctus et ultrices posuere cubilia curae;
      </p>
    </div >
  );
}

export default App;
