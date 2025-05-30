import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';

import * as template from './icon-colors-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-icon-colors-ceg',
  templateUrl: './icon-colors-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: IconColorsCegComponent }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class IconColorsCegComponent implements StaticComponentExample {
  html = template.default;
}
