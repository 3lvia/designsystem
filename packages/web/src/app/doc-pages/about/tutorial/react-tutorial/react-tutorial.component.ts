import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { CodeViewerComponent } from 'src/app/shared/component-documentation/ceg/code-generator/code-viewer/code-viewer.component';

@Component({
  selector: 'app-react-tutorial',
  templateUrl: './react-tutorial.component.html',
  standalone: true,
  imports: [CodeViewerComponent, RouterLink],
})
export class ReactTutorialComponent {
  codeStep1 = `npm install @elvia/elvis`;
  codeStep2 = `import '@elvia/elvis/css/elvis.min.css';
import '@elvia/elvis/elvis.js';`;
  codeStep3 = `<h1 className="e-title-lg">Elvia title</h1>
<button className="e-btn">Elvia button</button>`;
  codeStep4 = `import '@elvia/elvis/css-reset.min.css';`;
  codeStepAdvanced1 = `npm install @elvia/elvis-datepicker`;
  codeStepAdvanced2 = `import { Datepicker } from '@elvia/elvis-datepicker/react;'`;
  codeStepAdvanced3 = `<Datepicker></Datepicker>`;
  codeStepAdvanced4 = `<Datepicker isFullWidth={true} valueOnChange={newDate => handleOnChange(newDate)}
></Datepicker>`;
}
