import { Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

import * as template from 'html-loader!./accordion-group-ceg.component.html';

@Component({
  selector: 'app-accordion-group-ceg',
  templateUrl: './accordion-group-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: AccordionGroupCegComponent }],
})
export class AccordionGroupCegComponent implements StaticComponentExample {
  html = template.default;
}
