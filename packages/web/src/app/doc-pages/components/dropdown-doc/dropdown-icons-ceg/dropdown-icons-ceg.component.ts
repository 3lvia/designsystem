import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';

import * as template from './dropdown-icons-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-dropdown-icons-ceg',
  templateUrl: './dropdown-icons-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: DropdownIconsCegComponent }],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DropdownIconsCegComponent implements StaticComponentExample {
  html = template.default;

  comment = ` Define the items in Typescript:
  items = [
    {
      value: 'Powerline',
      label: 'Høyspentlinje',
      icon: '<i class="e-icon e-icon--powerline e-icon--sm"></i>',
    },
    {
      value: 'Electricity tower',
      label: 'Elektrisitetstårn',
      icon: '<i class="e-icon e-icon--electricity_tower e-icon--sm"></i>',
    },
    { value: 'Cable', label: 'Kabel', icon: '<i class="e-icon e-icon--cable e-icon--sm"></i>' },
  ];
`;

  items = [
    {
      value: 'Powerline',
      label: 'Høyspentlinje',
      icon: '<i class="e-icon e-icon--powerline e-icon--sm"></i>',
    },
    {
      value: 'Electricity tower',
      label: 'Elektrisitetstårn',
      icon: '<i class="e-icon e-icon--electricity_tower e-icon--sm"></i>',
    },
    { value: 'Cable', label: 'Kabel', icon: '<i class="e-icon e-icon--cable e-icon--sm"></i>' },
  ];

  handleOnChange(newValues: string | string[]): void {
    console.log('Selected dropdown items:', newValues);
  }
}
