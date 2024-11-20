import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { CodeViewerComponent } from 'src/app/shared/component-documentation/ceg/code-generator/code-viewer/code-viewer.component';

@Component({
    selector: 'app-blazor-tutorial',
    templateUrl: './blazor-tutorial.component.html',
    imports: [CodeViewerComponent, RouterLink],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BlazorTutorialComponent {
  codeStep1 = `mkdir NpmJs
cd NpmJS
npm init -y`;
  codeStep2 = `npm install esbuild --save-dev
npm install @elvia/elvis`;
  codeStep3 = `import '@elvia/elvis/elvis';
import '@elvia/elvis/css/elvis.min.css';`;
  codeStep4 = `import "@elvia/elvis/css-reset.min.css";`;
  codeStep5 = `"scripts": {"
  "build": "esbuild ./index.js --bundle --outfile=../wwwroot/js/index.bundle.js"
}`;
  codeStep6 = `npm run build`;
  codeStep7 = `<html>
  <head>
    <link rel="stylesheet" href="js/index.bundle.css" />
  </head>
  <body>
    <script src="_framework/blazor.web.js"></script>
    <script src="js/index.bundle.js"></script>
  </body>
</html>`;
  codeStep8 = `<h1 class="e-title-lg">Elvia title</h1>
<button class="e-btn">Elvia button</button>`;
  codeStepAdvanced1 = ` npm install @elvia/elvis-datepicker`;
  codeStepAdvanced2 = `import '@elvia/elvis-datepicker;'`;
  codeStepAdvanced3 = `<elvia-datepicker></elvia-datepicker>`;
}
