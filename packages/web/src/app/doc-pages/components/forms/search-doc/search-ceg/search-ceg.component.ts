import { AfterViewInit, CUSTOM_ELEMENTS_SCHEMA, Component, ElementRef } from '@angular/core';

import * as template from './search-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-search-ceg',
  templateUrl: './search-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: SearchCegComponent }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SearchCegComponent implements StaticComponentExample, AfterViewInit {
  html = template.default;

  constructor(private element: ElementRef<HTMLElement>) {}

  get buttonElement() {
    return this.element.nativeElement.querySelector('button') as HTMLButtonElement | undefined;
  }

  get inputElement() {
    return this.element.nativeElement.querySelector('input') as HTMLInputElement | undefined;
  }

  ngAfterViewInit(): void {
    // Add event listeners like this, as they can't be added in the template because of the StaticCeg
    this.buttonElement?.addEventListener('click', this.clearInput);
    this.inputElement?.addEventListener('keyup', this.onInput);
  }

  onInput = (event: KeyboardEvent) => {
    if (event.target && 'value' in event.target && typeof event.target.value === 'string') {
      this.buttonElement?.classList.toggle('e-invisible', event.target.value.length === 0);
    }
  };

  clearInput = () => {
    const input = this.inputElement;
    if (input) {
      input.value = '';
    }
    this.buttonElement?.classList.add('e-invisible');
  };
}
