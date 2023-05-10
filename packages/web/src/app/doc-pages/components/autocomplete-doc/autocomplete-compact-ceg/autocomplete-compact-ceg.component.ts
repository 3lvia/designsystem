import { Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';
import * as template from 'html-loader!./autocomplete-compact-ceg.component.html';

@Component({
  selector: 'app-autocomplete-compact-ceg',
  templateUrl: './autocomplete-compact-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: AutocompleteCompactCegComponent }],
})
export class AutocompleteCompactCegComponent implements StaticComponentExample {
  html = template.default;
  comment = 'Added .e-pb-64 to prevent the overlay from overflowing.';
}
