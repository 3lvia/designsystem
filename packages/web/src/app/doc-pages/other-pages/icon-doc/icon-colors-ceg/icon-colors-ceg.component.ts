import { Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';
import * as template from 'html-loader!./icon-colors-ceg.component.html';

@Component({
  selector: 'app-icon-colors-ceg',
  templateUrl: './icon-colors-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: IconColorsCegComponent }],
})
export class IconColorsCegComponent implements StaticComponentExample {
  html = template.default;
}
