import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';

import * as template from './file-upload-dragover-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-file-upload-dragover-ceg',
  templateUrl: './file-upload-dragover-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: FileUploadDragoverCegComponent }],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FileUploadDragoverCegComponent implements StaticComponentExample {
  html = template.default;
}
