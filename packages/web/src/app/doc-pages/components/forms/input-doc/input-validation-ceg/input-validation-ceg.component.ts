import { AfterViewInit, Component, ElementRef } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

import * as template from 'html-loader!./input-validation-ceg.component.html';

@Component({
  selector: 'app-input-validation-ceg',
  templateUrl: './input-validation-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: InputValidationCegComponent }],
})
export class InputValidationCegComponent implements StaticComponentExample, AfterViewInit {
  html = template.default;

  constructor(private element: ElementRef<HTMLElement>) {}

  ngAfterViewInit(): void {
    // Add event listeners like this, as they can't be added in the template because of the StaticCeg
    const inputElement = this.element.nativeElement.querySelector('input');
    this.element.nativeElement
      .querySelector('button')
      ?.addEventListener('click', () => this.togglePasswordVisibility(inputElement));
  }

  togglePasswordVisibility(inputElement?: HTMLInputElement | null) {
    if (!inputElement) {
      return;
    }
    if (inputElement.type === 'password') {
      inputElement.type = 'text';
    } else {
      inputElement.type = 'password';
    }
  }
}
