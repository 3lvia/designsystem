import { Component } from '@angular/core';
import { BaseAutocompleteProps } from '@elvia/elvis-autocomplete/react';
import { CegControlManager, ComponentExample } from 'src/app/shared/component-documentation/ceg';
import { data } from './autocomplete-items-data';

@Component({
  selector: 'app-autocomplete-ceg',
  templateUrl: './autocomplete-ceg.component.html',
  providers: [{ provide: ComponentExample, useExisting: AutocompleteCegComponent }],
})
export class AutocompleteCegComponent implements ComponentExample {
  data = data;
  autocompleteItems = this.getAutoCompleteItems();

  elementName = 'autocomplete';
  cegContent = new CegControlManager<BaseAutocompleteProps>([
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
        isRequired: { type: 'checkbox', label: 'Required', group: 'Options' },
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
          value: 'Adresse',
        },
      },
      staticProps: {
        items: this.autocompleteItems,
        placeholder: 'Bogstadveien 1',
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

  getAutoCompleteItems(): { value: string; label: string }[] {
    return this.data.map((item) => ({
      value: item,
      label: item,
    }));
  }
}
