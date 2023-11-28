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
      value: 'mats',
      label: 'Mats',
      icon: '<img src="assets/dropdown/images/mats.png" class="e-dropdown__image" width="32" height="32">',
    },
    {
      value: 'peder',
      label: 'Peder',
      icon: '<img src="assets/dropdown/images/peder.png" class="e-dropdown__image" width="32" height="32">',
    },
    {
      value: 'katrine',
      label: 'Katrine',
      icon: '<img src="assets/dropdown/images/katrine.png" class="e-dropdown__image" width="32" height="32">',
    },
    {
      value: 'sofie',
      label: 'Sofie',
      icon: '<img src="assets/dropdown/images/sofie.png" class="e-dropdown__image" width="32" height="32">',
    },
    {
      value: 'trine',
      label: 'Trine Marie',
      icon: '<img src="assets/dropdown/images/trine.png" class="e-dropdown__image" width="32" height="32">',
    },
  ];
`;

  items = [
    {
      value: 'mats',
      label: 'Mats',
      icon: '<img src="assets/dropdown/images/mats.png" class="e-dropdown__image" width="32" height="32">',
    },
    {
      value: 'peder',
      label: 'Peder',
      icon: '<img src="assets/dropdown/images/peder.png" class="e-dropdown__image" width="32" height="32">',
    },
    {
      value: 'katrine',
      label: 'Katrine',
      icon: '<img src="assets/dropdown/images/katrine.png" class="e-dropdown__image" width="32" height="32">',
    },
    {
      value: 'sofie',
      label: 'Sofie',
      icon: '<img src="assets/dropdown/images/sofie.png" class="e-dropdown__image" width="32" height="32">',
    },
    {
      value: 'trine',
      label: 'Trine Marie',
      icon: '<img src="assets/dropdown/images/trine.png" class="e-dropdown__image" width="32" height="32">',
    },
  ];

  handleOnChange(newValues: string | string[]): void {
    console.log('Selected dropdown items:', newValues);
  }
}
