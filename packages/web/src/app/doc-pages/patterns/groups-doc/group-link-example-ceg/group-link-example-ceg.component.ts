import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';

import * as template from './group-link-example-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-group-link-example-ceg',
  imports: [],
  templateUrl: './group-link-example-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: GroupLinkExampleCegComponent }],
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
export class GroupLinkExampleCegComponent implements StaticComponentExample {
  html = template.default;
}
