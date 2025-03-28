import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';

import * as template from './group-accordion-example-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-group-accordion-example-ceg',
  imports: [],
  templateUrl: './group-accordion-example-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: GroupAccordionExampleCegComponent }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  styles: `
    :host {
      display: contents;
      p {
        margin: 0;
      }
    }
  `,
})
export class GroupAccordionExampleCegComponent implements StaticComponentExample {
  html = template.default;
}
