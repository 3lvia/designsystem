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
      type: 'Removable',
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
          group: 'Text',
          inputType: 'input',
        },
      },
      groupOrder: ['Color', 'State', 'Text'],
      staticProps: {
        onDelete: () => '',
      },
    },
    {
      type: 'Legend',
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
        isLoading: {
          label: 'Loading',
          type: 'checkbox',
          value: false,
          group: 'State',
        },
        value: {
          type: 'text',
          value: 'Chip',
          label: 'Value',
          group: 'Text',
          inputType: 'input',
        },
      },
      groupOrder: ['Color', 'State', 'Text'],
      staticProps: {
        isSelectedOnChange: () => '',
      },
    },
    {
      type: 'Choice',
      controls: {
        value: {
          type: 'text',
          value: 'Chip',
          label: 'Value',
          group: 'Text',
          inputType: 'input',
        },
      },
      groupOrder: ['Text'],
      staticProps: {
        isSelectedOnChange: () => '',
      },
    },
  ]);

  handleOnChange(value: number): void {
    // eslint-disable-next-line no-console
    console.log('New value:', value);
  }

  handleOnDelete(value: string): void {
    // eslint-disable-next-line no-console
    console.log('Chip should be deleted: ', value);
  }
}
