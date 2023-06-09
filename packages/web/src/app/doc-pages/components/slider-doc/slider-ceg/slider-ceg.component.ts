import { Component } from '@angular/core';
import { CegControlManager, ComponentExample } from 'src/app/shared/component-documentation/ceg';
import { SliderProps } from '@elvia/elvis-slider/react';

@Component({
  selector: 'app-slider-ceg',
  templateUrl: './slider-ceg.component.html',
  providers: [{ provide: ComponentExample, useExisting: SliderCegComponent }],
})
export class SliderCegComponent implements ComponentExample {
  elementName = 'slider';
  cegContent = new CegControlManager<SliderProps>([
    {
      type: 'Simple',
      controls: {
        heading: { type: 'text', group: 'Heading', label: 'Heading', placeholder: 'Add heading' },
        size: {
          type: 'radioGroup',
          value: 'medium',
          radios: [
            { label: 'Small', value: 'small' },
            { label: 'Medium', value: 'medium' },
          ],
          group: 'Size',
        },
        hasHintValues: { type: 'switch', group: 'Options', label: 'Help Values' },
        isDisabled: { type: 'checkbox', group: 'State', label: 'Disabled' },
        unit: { type: 'text', group: 'Unit', label: 'Unit', placeholder: 'Add unit' },
        suffix: { type: 'text', group: 'Suffix', label: 'Suffix', placeholder: 'Add suffix' },
      },
      staticProps: {
        valueOnChange: () => '',
      },
      groupOrder: ['Heading', 'Size', 'State', 'Options', 'Suffix', 'Unit'],
    },
    {
      type: 'Range',
      controls: {
        heading: { type: 'text', group: 'Heading', label: 'Heading', placeholder: 'Add heading' },
        size: {
          type: 'radioGroup',
          value: 'medium',
          radios: [
            { label: 'Small', value: 'small' },
            { label: 'Medium', value: 'medium' },
          ],
          group: 'Size',
        },
        isDisabled: { type: 'checkbox', group: 'State', label: 'Disabled' },
        unit: { type: 'text', group: 'Unit', label: 'Unit', placeholder: 'Add unit' },
        suffix: { type: 'text', group: 'Suffix', label: 'Suffix', placeholder: 'Add suffix' },
      },
      staticProps: {
        valueOnChange: () => '',
      },
      groupOrder: ['Heading', 'Size', 'State', 'Options', 'Suffix', 'Unit'],
    },
  ]);

  handleOnChange(value: number): void {
    console.log('New value:', value);
  }
}
