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
        hasInputField: { type: 'checkbox', group: 'Options', label: 'Input Field' },
        hasHintValues: { type: 'checkbox', group: 'Options', label: 'Help Values' },
        hasTooltip: { type: 'checkbox', group: 'Options', label: 'Display Tooltip', value: true },
        hasPercent: {
          type: 'checkbox',
          group: 'Options',
          label: 'Display Percentage',
          childOf: 'hasTooltip',
        },
        isDisabled: { type: 'checkbox', group: 'State', label: 'Disabled' },
        unit: { type: 'text', group: 'Unit', label: 'Unit' },
      },
      staticProps: {
        valueOnChange: () => '',
      },
      groupOrder: ['Options', 'State', 'Unit'],
      disabledControls: {
        unit: ['hasPercent'],
      },
    },
    {
      type: 'Range',
      controls: {
        hasInputField: { type: 'checkbox', group: 'Options', label: 'Input Fields' },
        hasHintValues: { type: 'checkbox', group: 'Options', label: 'Help Values' },
        hasTooltip: { type: 'checkbox', group: 'Options', label: 'Display Tooltip', value: true },
        isDisabled: { type: 'checkbox', group: 'State', label: 'Disabled' },
        unit: { type: 'text', group: 'Unit', label: 'Unit' },
      },
      staticProps: {
        valueOnChange: () => '',
      },
      groupOrder: ['Options', 'State', 'Unit'],
      disabledControls: {
        hasHintValues: ['hasInputField'],
      },
    },
  ]);

  handleOnChange(value: number): void {
    console.log('New value:', value);
  }
}
