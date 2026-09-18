import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy, Component } from '@angular/core';

import * as template from './group-accordion-example-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-group-accordion-example-ceg',
  imports: [],
  templateUrl: './group-accordion-example-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: GroupAccordionExampleCegComponent }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.Eager,
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
