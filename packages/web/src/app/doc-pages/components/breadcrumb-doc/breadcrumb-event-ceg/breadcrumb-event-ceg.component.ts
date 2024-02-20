import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

import * as template from 'html-loader!./breadcrumb-event-ceg.component.html';

@Component({
  selector: 'app-breadcrumb-event-ceg',
  templateUrl: './breadcrumb-event-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: BreadcrumbEventCegComponent }],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BreadcrumbEventCegComponent implements StaticComponentExample {
  html = template.default;

  handleRoutingOnClick(route: string) {
    console.log('The selected route index is:', route);
  }
}
