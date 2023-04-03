import { Component } from '@angular/core';
import { CegControlManager, ComponentExample } from 'src/app/shared/component-documentation/ceg';
import { ChipProps } from '@elvia/elvis-chip/react';

@Component({
  selector: 'app-chip-ceg',
  templateUrl: './chip-ceg.component.html',
  providers: [{ provide: ComponentExample, useExisting: ChipCegComponent }],
})
export class ChipCegComponent implements ComponentExample {
  elementName = 'chip';
  cegContent = new CegControlManager<ChipProps>([
    {
      name: 'Removable',
      controls: {
        color: {
          type: 'radioGroup',
          radios: [
            { label: 'Green', value: 'green' },
            { label: 'Blue', value: 'blue' },
            { label: 'Orange', value: 'orange' },
            { label: 'Purple', value: 'purple' },
            { label: 'Red', value: 'red' },
            { label: 'Violet', value: 'violet' },
          ],
          value: 'green',
          group: 'Color',
        },
        isDisabled: {
          label: 'Disabled',
          type: 'checkbox',
          value: false,
          group: 'State',
        },
        value: {
          type: 'text',
          value: 'Chip',
          label: 'Value',
          group: 'Value',
          inputType: 'input',
        },
      },
      groupOrder: ['Color', 'State', 'Value'],
    },
    {
      name: 'Legend',
      controls: {
        color: {
          type: 'radioGroup',
          radios: [
            { label: 'Green', value: 'green' },
            { label: 'Blue', value: 'blue' },
            { label: 'Orange', value: 'orange' },
            { label: 'Purple', value: 'purple' },
            { label: 'Red', value: 'red' },
            { label: 'Violet', value: 'violet' },
          ],
          value: 'green',
          group: 'Color',
        },
        isDisabled: {
          label: 'Disabled',
          type: 'checkbox',
          value: false,
          group: 'State',
        },
        value: {
          type: 'text',
          value: 'Chip',
          label: 'Value',
          group: 'Value',
          inputType: 'input',
        },
      },
      groupOrder: ['Color', 'State', 'Value'],
    },
    {
      name: 'Choice',
      controls: {
        isDisabled: {
          label: 'Disabled',
          type: 'checkbox',
          value: false,
          group: 'State',
        },
        value: {
          type: 'text',
          value: 'Chip',
          label: 'Value',
          group: 'Value',
          inputType: 'input',
        },
      },
      groupOrder: ['State', 'Value'],
    },
  ]);

  handleOnChange(value: number): void {
    console.log('Selected value: ', value);
  }
}
