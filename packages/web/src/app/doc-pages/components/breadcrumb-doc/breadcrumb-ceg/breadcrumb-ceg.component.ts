import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy, Component } from '@angular/core';

import * as template from './breadcrumb-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-breadcrumb-ceg',
  templateUrl: './breadcrumb-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: BreadcrumbCegComponent }],
  changeDetection: ChangeDetectionStrategy.Eager,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BreadcrumbCegComponent implements StaticComponentExample {
  html = template.default;
}
