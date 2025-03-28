import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';

import * as template from './breadcrumb-event-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-breadcrumb-event-ceg',
  templateUrl: './breadcrumb-event-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: BreadcrumbEventCegComponent }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BreadcrumbEventCegComponent implements StaticComponentExample {
  html = template.default;

  handleRoutingOnClick(route: string) {
    console.log('The selected route index is:', route);
  }
}
