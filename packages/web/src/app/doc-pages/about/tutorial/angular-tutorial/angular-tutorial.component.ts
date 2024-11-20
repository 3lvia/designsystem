import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { CodeViewerComponent } from 'src/app/shared/component-documentation/ceg/code-generator/code-viewer/code-viewer.component';

@Component({
  selector: 'app-angular-tutorial',
  templateUrl: './angular-tutorial.component.html',
  imports: [CodeViewerComponent, RouterLink],
})
export class AngularTutorialComponent {
  codeStep1 = `npm install @elvia/elvis`;
  codeStep2 = `import '@elvia/elvis/css/elvis.min.css';
import '@elvia/elvis/elvis.js';`;
  codeStep3 = `<h1 class="e-title-lg">Elvia title</h1>
<button class="e-btn">Elvia button</button>`;
  codeStep4 = `import '@elvia/elvis/css-reset.min.css';`;
  codeStepAdvanced1 = ` npm install @elvia/elvis-datepicker`;
  codeStepAdvanced2 = `import '@elvia/elvis-datepicker;'`;
  codeStepAdvanced3 = `import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
  
/* With modules
@NgModule({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  other imports and declarations... 
}) */

/* With standalone components
@Component({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  other imports and declarations... 
}) */  `;
  codeStepAdvanced4 = `<elvia-datepicker></elvia-datepicker>`;
  codeStepAdvanced5 = `<elvia-datepicker 
    [isFullWidth]="true"
    (valueOnChange)="handleOnChange($any($event.detail.value))"
  ></elvia-datepicker>`;
}
