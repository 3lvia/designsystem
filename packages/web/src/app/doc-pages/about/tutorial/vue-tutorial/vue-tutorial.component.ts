import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { CodeViewerComponent } from 'src/app/shared/component-documentation/ceg/code-generator/code-viewer/code-viewer.component';

@Component({
  selector: 'app-vue-tutorial',
  templateUrl: './vue-tutorial.component.html',
  imports: [CodeViewerComponent, RouterLink],
})
export class VueTutorialComponent {
  codeStep1 = `npm install @elvia/elvis`;
  codeStep2 = `import '@elvia/elvis/css/elvis.min.css';`;
  codeStep3 = `<h1 class="e-title-lg">Elvia title</h1>
<button class="e-btn">Elvia button</button>`;
  codeStep4 = `import '@elvia/elvis/css/css-reset.css';`;
  codeStepAdvanced1 = `npm install @elvia/elvis-datepicker`;
  codeStepAdvanced2 = `import '@elvia/elvis-datepicker';`;
  codeStepAdvanced3 = `<elvia-datepicker></elvia-datepicker>`;
  codeStepAdvanced4 = `<elvia-datepicker 
    :isFullWidth="true"
    @valueOnChange="handleOnChange($event.detail.value)"
  ></elvia-datepicker>`;
}
