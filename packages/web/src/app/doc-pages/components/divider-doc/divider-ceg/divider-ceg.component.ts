import { Component } from '@angular/core';
import { BaseDividerProps } from '@elvia/elvis-divider/react';
import { CegControlManager, ComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-divider-ceg',
  templateUrl: './divider-ceg.component.html',
  providers: [{ provide: ComponentExample, useExisting: DividerCegComponent }],
})
export class DividerCegComponent implements ComponentExample {
  elementName = 'divider';
  cegContent = new CegControlManager<BaseDividerProps>([
    {
      type: 'Simple',
      controls: {
        orientation: {
          type: 'radioGroup',
          radios: [
            { label: 'Horizontal', value: 'horizontal' },
            { label: 'Vertical', value: 'vertical' },
          ],
          value: 'horizontal',
          group: 'Orientation',
        },
      },
      groupOrder: ['Orientation'],
    },
    {
      type: 'Heading',
      controls: {
        typography: {
          type: 'radioGroup',
          radios: [
            { label: 'Medium', value: 'medium' },
            { label: 'Caps', value: 'caps' },
          ],
          value: 'medium',
          group: 'Typography',
        },
      },
      groupOrder: ['Typography'],
      staticProps: {
        heading: 'Heading',
      },
    },
    {
      type: 'Curved',
      controls: {},
      groupOrder: [],
    },
  ]);
}
