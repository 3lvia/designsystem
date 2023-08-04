import { Component } from '@angular/core';
import { AutocompleteProps } from '@elvia/elvis-autocomplete/react';
import { CegControlManager, ComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-autocomplete-ceg',
  templateUrl: './autocomplete-ceg.component.html',
  providers: [{ provide: ComponentExample, useExisting: AutocompleteCegComponent }],
})
export class AutocompleteCegComponent implements ComponentExample {
  elementName = 'autocomplete';
  cegContent = new CegControlManager<AutocompleteProps>([
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
        isFullWidth: {
          group: 'Options',
          type: 'checkbox',
          label: 'Full Width',
          value: false,
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
          value: 'Nordiske land',
        },
      },
      staticProps: {
        items: [
          { value: 'Danmark', label: 'Danmark' },
          { value: 'Finland', label: 'Finland' },
          { value: 'Island', label: 'Island' },
          { value: 'Norge', label: 'Norge' },
          { value: 'Sverige', label: 'Sverige' },
        ],

        placeholder: 'Placeholder text...',
        valueOnChange: () => '',
      },
      groupOrder: ['Size', 'Options', 'State', 'Label'],
    },
  ]);

  handleValueOnChange(value: string): void {
    console.log('Autocomplete valueOnChange:', value);
  }

  handleOnSelectItem(value: string): void {
    console.log('Autocomplete onSelectItem:', value);
  }
}
