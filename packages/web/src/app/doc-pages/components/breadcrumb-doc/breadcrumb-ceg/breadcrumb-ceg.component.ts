import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';

import * as template from './breadcrumb-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-breadcrumb-ceg',
  templateUrl: './breadcrumb-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: BreadcrumbCegComponent }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BreadcrumbCegComponent implements StaticComponentExample {
  html = template.default;
}
