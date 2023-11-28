import { Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

import * as template from 'html-loader!./dropdown-images-ceg.component.html';

@Component({
  selector: 'app-dropdown-images-ceg',
  templateUrl: './dropdown-images-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: DropdownImagesCegComponent }],
})
export class DropdownImagesCegComponent implements StaticComponentExample {
  html = template.default;

  comment = ` Define the items in Typescript:
  items = [
    {
      value: 'tom',
      label: 'Tom',
      icon: '<img src="assets/contact/Tom.png" class="e-dropdown__image" width="32" height="32">',
    },
    {
      value: 'erik',
      label: 'Erik',
      icon: '<img src="assets/contact/Erik.png" class="e-dropdown__image" width="32" height="32">',
    },
    {
      value: 'kari',
      label: 'Kari',
      icon: '<img src="assets/contact/Kari.jpg" class="e-dropdown__image" width="32" height="32">',
    },
    {
      value: 'fride',
      label: 'Fride',
      icon: '<img src="assets/contact/Fride.jpg" class="e-dropdown__image" width="32" height="32">',
    },
  ];
`;

  items = [
    {
      value: 'tom',
      label: 'Tom',
      icon: '<img src="assets/contact/Tom.png" class="e-dropdown__image" width="32" height="32">',
    },
    {
      value: 'erik',
      label: 'Erik',
      icon: '<img src="assets/contact/Erik.png" class="e-dropdown__image" width="32" height="32">',
    },
    {
      value: 'kari',
      label: 'Kari',
      icon: '<img src="assets/contact/Kari.jpg" class="e-dropdown__image" width="32" height="32">',
    },
    {
      value: 'fride',
      label: 'Fride',
      icon: '<img src="assets/contact/Fride.jpg" class="e-dropdown__image" width="32" height="32">',
    },
  ];

  handleOnChange(newValues: string | string[]): void {
    console.log('Selected dropdown items:', newValues);
  }
}
