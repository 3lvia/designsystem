import { Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';
import * as template from 'html-loader!./autocomplete-normal-ceg.component.html';

@Component({
  selector: 'app-autocomplete-normal-ceg',
  templateUrl: './autocomplete-normal-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: AutocompleteNormalCegComponent }],
})
export class AutocompleteNormalCegComponent implements StaticComponentExample {
  html = template.default;
  comment = 'Added .e-pb-112 to prevent the overlay from overflowing.';
}
