import { Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

import * as template from 'html-loader!./file-upload-dragover-ceg.component.html';

@Component({
  selector: 'app-file-upload-dragover-ceg',
  templateUrl: './file-upload-dragover-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: FileUploadDragoverCegComponent }],
})
export class FileUploadDragoverCegComponent implements StaticComponentExample {
  html = template.default;
}
