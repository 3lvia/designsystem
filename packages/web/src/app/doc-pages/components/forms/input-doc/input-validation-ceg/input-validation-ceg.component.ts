import { AfterViewInit, CUSTOM_ELEMENTS_SCHEMA, Component, ElementRef, inject } from '@angular/core';

import * as template from './input-validation-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-input-validation-ceg',
  templateUrl: './input-validation-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: InputValidationCegComponent }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class InputValidationCegComponent implements StaticComponentExample, AfterViewInit {
  private elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  html = template.default;

  ngAfterViewInit(): void {
    // Add event listeners like this, as they can't be added in the template because of the StaticCeg
    const inputElement = this.elementRef.nativeElement.querySelector('input');
    this.elementRef.nativeElement
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
