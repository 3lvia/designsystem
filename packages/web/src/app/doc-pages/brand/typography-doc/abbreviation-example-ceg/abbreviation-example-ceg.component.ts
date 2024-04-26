import { NgClass } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';

import * as template from './abbreviation-example-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-abbreviation-ceg',
  standalone: true,
  imports: [NgClass],
  templateUrl: './abbreviation-example-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: AbbreviationExampleCegComponent }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AbbreviationExampleCegComponent implements StaticComponentExample {
  html = template.default;

  popoverIsOpen = false;
}
