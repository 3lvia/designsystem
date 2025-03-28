import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';

import * as template from './group-action-example-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-group-action-example-ceg',
  templateUrl: './group-action-example-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: GroupActionExampleCegComponent }],
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
export class GroupActionExampleCegComponent implements StaticComponentExample {
  html = template.default;
}
