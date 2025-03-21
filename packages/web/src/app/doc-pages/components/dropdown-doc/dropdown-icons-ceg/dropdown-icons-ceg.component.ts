import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';

import * as template from './dropdown-icons-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-dropdown-icons-ceg',
  templateUrl: './dropdown-icons-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: DropdownIconsCegComponent }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DropdownIconsCegComponent implements StaticComponentExample {
  html = template.default;

  comment = ` Define the items in Typescript:
  items = [
    {
      value: 'Powerline',
      label: 'Høyspentlinje',
      icon: '<e-icon name="powerline" size="sm"></e-icon>',
    },
    {
      value: 'Electricity tower',
      label: 'Elektrisitetstårn',
      icon: '<e-icon name="electricityTower" size="sm"></e-icon>',
    },
    { value: 'Cable', label: 'Kabel', icon: '<e-icon name="cable" size="sm"></e-icon>' },
  ];
`;

  items = [
    {
      value: 'Powerline',
      label: 'Høyspentlinje',
      icon: '<e-icon name="powerline" size="sm"></e-icon>',
    },
    {
      value: 'Electricity tower',
      label: 'Elektrisitetstårn',
      icon: '<e-icon name="electricityTower" size="sm"></e-icon>',
    },
    { value: 'Cable', label: 'Kabel', icon: '<e-icon name="cable" size="sm"></e-icon>' },
  ];

  handleOnChange(newValues: string | string[]): void {
    console.log('Selected dropdown items:', newValues);
  }
}
