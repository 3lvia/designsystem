import { Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

import * as template from 'html-loader!./card-links-ceg.component.html';

@Component({
  selector: 'app-card-links-ceg',
  templateUrl: './card-links-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: CardLinksCegComponent }],
})
export class CardLinksCegComponent implements StaticComponentExample {
  html = template.default;
}
