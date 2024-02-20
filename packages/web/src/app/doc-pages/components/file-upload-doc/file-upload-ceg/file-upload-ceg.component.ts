import { Component } from '@angular/core';

import * as template from 'html-loader!./file-upload-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-file-upload-ceg',
  templateUrl: './file-upload-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: FileUploadCegComponent }],
  standalone: true,
})
export class FileUploadCegComponent implements StaticComponentExample {
  html = template.default;
}
