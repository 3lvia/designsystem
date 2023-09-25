import { Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

import * as template from 'html-loader!./dropdown-load-more-ceg.component.html';

@Component({
  selector: 'app-dropdown-load-more-ceg',
  templateUrl: './dropdown-load-more-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: DropdownLoadMoreCegComponent }],
})
export class DropdownLoadMoreCegComponent implements StaticComponentExample {
  html = template.default;

  items = [
    { value: 'Nord-Korea', label: 'Nord-Korea' },
    { value: 'Nord-Makedonia', label: 'Nord-Makedonia' },
    { value: 'Norge', label: 'Norge' },
    { value: 'Oman', label: 'Oman' },
    { value: 'Russland', label: 'Russland' },
  ];
  isLoadingMoreItems = false;
  hasLoadMoreItemsButton = true;
  timesLoadedMoreItems = 0;

  handleOnChange(newValues: string | string[]): void {
    console.log('Selected dropdown items:', newValues);
  }

  onLoadMoreItems(): void {
    this.isLoadingMoreItems = true;

    setTimeout(() => {
      this.isLoadingMoreItems = false;
      if (this.timesLoadedMoreItems === 0) {
        this.items = [
          ...this.items,
          { value: 'Tyskland', label: 'Tyskland' },
          { value: 'Ungarn', label: 'Ungarn' },
          { value: 'USA', label: 'USA' },
          { value: 'Vatikanstaten', label: 'Vatikanstaten' },
        ];
      } else if (this.timesLoadedMoreItems === 1) {
        this.items = [
          ...this.items,
          { value: 'Venezuela', label: 'Venezuela' },
          { value: 'Vietnam', label: 'Vietnam' },
          { value: 'Østerrike', label: 'Østerrike' },
          { value: 'Øst-Timor', label: 'Øst-Timor' },
        ];
      }
      this.timesLoadedMoreItems++;
      if (this.timesLoadedMoreItems > 1) {
        this.hasLoadMoreItemsButton = false;
      }
    }, 2000);
  }
}
