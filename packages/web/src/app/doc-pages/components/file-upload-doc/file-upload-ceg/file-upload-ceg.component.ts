import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';

import * as template from './file-upload-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-file-upload-ceg',
  templateUrl: './file-upload-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: FileUploadCegComponent }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FileUploadCegComponent implements StaticComponentExample {
  html = template.default;
}
