import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

import * as template from 'html-loader!./search-ceg.component.html';

@Component({
  selector: 'app-search-ceg',
  templateUrl: './search-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: SearchCegComponent }],
})
export class SearchCegComponent implements StaticComponentExample, AfterViewInit {
  html = template.default;

  constructor(private element: ElementRef<HTMLElement>) {}

  ngAfterViewInit(): void {
    // Add event listeners like this, as they can't be added in the template because of the StaticCeg
    this.element.nativeElement.querySelector('button')?.addEventListener('click', this.clearInput);
    this.element.nativeElement.querySelector('input')?.addEventListener('keyup', this.onInput);
  }

  onInput = (event: KeyboardEvent) => {
    if (event.target && 'value' in event.target && typeof event.target.value === 'string') {
      this.element.nativeElement
        .querySelector('.e-search')
        ?.classList.toggle('e-search--searched', event.target.value.length > 0);
    }
  };

  clearInput = () => {
    const input = this.element.nativeElement.querySelector('input');
    if (input) {
      input.value = '';
    }
    this.element.nativeElement.querySelector('.e-search')?.classList.remove('e-search--searched');
  };
}
