import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';

import * as template from 'html-loader!./accordion-group-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-accordion-group-ceg',
  templateUrl: './accordion-group-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: AccordionGroupCegComponent }],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AccordionGroupCegComponent implements StaticComponentExample {
  html = template.default;
}
