import { Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

import * as template from 'html-loader!./file-upload-ceg.component.html';

@Component({
  selector: 'app-file-upload-ceg',
  templateUrl: './file-upload-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: FileUploadCegComponent }],
})
export class FileUploadCegComponent implements StaticComponentExample {
  html = template.default;
}
