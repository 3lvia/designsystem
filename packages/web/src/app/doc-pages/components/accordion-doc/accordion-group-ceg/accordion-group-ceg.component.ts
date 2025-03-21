import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';

import * as template from './accordion-group-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-accordion-group-ceg',
  templateUrl: './accordion-group-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: AccordionGroupCegComponent }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AccordionGroupCegComponent implements StaticComponentExample {
  html = template.default;
}
