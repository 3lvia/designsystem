import { Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

import * as template from 'html-loader!./dropdown-icons-ceg.component.html';

@Component({
  selector: 'app-dropdown-icons-ceg',
  templateUrl: './dropdown-icons-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: DropdownIconsCegComponent }],
})
export class DropdownIconsCegComponent implements StaticComponentExample {
  html = template.default;

  comment = `Define the items in Typescript:
  items = [
    {
      value: 'Powerline',
      label: 'Powerline',
      icon: '<i class="e-icon e-icon--powerline e-icon--sm"></i>',
    },
    {
      value: 'Electricity tower',
      label: 'Electricity tower',
      icon: '<i class="e-icon e-icon--electricity_tower e-icon--sm"></i>',
    },
    { value: 'Cable', label: 'Cable', icon: '<i class="e-icon e-icon--cable e-icon--sm"></i>' },
  ];
`;

  items = [
    {
      value: 'Powerline',
      label: 'Powerline',
      icon: '<i class="e-icon e-icon--powerline e-icon--sm"></i>',
    },
    {
      value: 'Electricity tower',
      label: 'Electricity tower',
      icon: '<i class="e-icon e-icon--electricity_tower e-icon--sm"></i>',
    },
    { value: 'Cable', label: 'Cable', icon: '<i class="e-icon e-icon--cable e-icon--sm"></i>' },
  ];

  handleOnChange(newValues: string | string[]): void {
    // eslint-disable-next-line no-console
    console.log('Selected dropdown items:', newValues);
  }
}
