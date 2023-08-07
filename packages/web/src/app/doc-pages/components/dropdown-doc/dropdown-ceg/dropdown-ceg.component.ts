import { Component } from '@angular/core';
import { DropdownProps } from '@elvia/elvis-dropdown/react';
import { CegControlManager, ComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-dropdown-ceg',
  templateUrl: './dropdown-ceg.component.html',
  providers: [{ provide: ComponentExample, useExisting: DropdownCegComponent }],
})
export class DropdownCegComponent implements ComponentExample {
  elementName = 'dropdown';
  cegContent = new CegControlManager<DropdownProps>([
    {
      controls: {
        size: {
          group: 'Size',
          type: 'radioGroup',
          value: 'medium',
          radios: [
            { label: 'Small', value: 'small' },
            { label: 'Medium', value: 'medium' },
          ],
        },
        isSearchable: {
          group: 'Options',
          type: 'checkbox',
          label: 'Searchable',
          value: false,
        },
        isFullWidth: {
          group: 'Options',
          type: 'checkbox',
          label: 'Full Width',
          value: false,
        },
        isMulti: {
          group: 'Options',
          type: 'checkbox',
          label: 'Multiselect',
          value: false,
        },
        hasSelectAllOption: {
          type: 'checkbox',
          group: 'Options',
          label: 'Select All Option',
          childOf: 'isMulti',
        },
        isDisabled: {
          group: 'State',
          type: 'checkbox',
          label: 'Disabled',
          value: false,
        },
        label: {
          group: 'Label',
          type: 'text',
          label: 'Label',
          value: 'Land',
        },
      },
      staticProps: {
        value: 'Norge',
        items: [
          { value: 'Norge', label: 'Norge' },
          { value: 'Sverige', label: 'Sverige' },
          { value: 'Danmark', label: 'Danmark' },
          { value: 'Finland', label: 'Finland' },
          { value: 'Island', label: 'Island' },
        ],
        valueOnChange: () => '',
      },
      groupOrder: ['Size', 'Options', 'State', 'Label'],
    },
  ]);

  handleOnChange(value: number): void {
    console.log('New value:', value);
  }
}
