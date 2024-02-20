import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

import * as template from 'html-loader!./card-links-ceg.component.html';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-card-links-ceg',
  templateUrl: './card-links-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: CardLinksCegComponent }],
  standalone: true,
  imports: [RouterLink],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CardLinksCegComponent implements StaticComponentExample {
  html = template.default;
}
