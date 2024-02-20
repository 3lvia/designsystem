import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

import * as template from 'html-loader!./breadcrumb-ceg.component.html';

@Component({
  selector: 'app-breadcrumb-ceg',
  templateUrl: './breadcrumb-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: BreadcrumbCegComponent }],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BreadcrumbCegComponent implements StaticComponentExample {
  html = template.default;
}
