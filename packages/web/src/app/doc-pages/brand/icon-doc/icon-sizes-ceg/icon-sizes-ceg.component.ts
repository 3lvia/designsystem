import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';

import * as template from './icon-sizes-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-icon-sizes-ceg',
  templateUrl: './icon-sizes-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: IconSizesCegComponent }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class IconSizesCegComponent implements StaticComponentExample {
  html = template.default;
}
