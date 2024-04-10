import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import * as template from './card-links-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

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
