import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { BaseChipProps } from '@elvia/elvis-chip/react';

import { CegControlManager, ComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-chip-ceg',
  templateUrl: './chip-ceg.component.html',
  providers: [{ provide: ComponentExample, useExisting: ChipCegComponent }],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ChipCegComponent implements ComponentExample {
  elementName = 'chip';
  cegContent = new CegControlManager<BaseChipProps>([
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
          value: '2024',
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
        markerStyle: {
          type: 'radioGroup',
          radios: [
            { label: 'Dot', value: 'dot' },
            { label: 'Line', value: 'line' },
            { label: 'Dashed', value: 'dashed' },
          ],
          value: 'dot',
          group: 'Marker style',
        },
        isLoading: {
          label: 'Loading',
          type: 'checkbox',
          value: false,
          group: 'State',
        },
        value: {
          type: 'text',
          value: '2024',
          label: 'Value',
          group: 'Text',
          inputType: 'input',
        },
      },
      groupOrder: ['Color', 'Marker style', 'State', 'Text'],
      staticProps: {
        isSelectedOnChange: () => '',
      },
    },
    {
      type: 'Choice',
      controls: {
        value: {
          type: 'text',
          value: '2024',
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
    console.log('New value:', value);
  }

  handleOnDelete(value: string): void {
    console.log('Chip should be deleted: ', value);
  }
}
