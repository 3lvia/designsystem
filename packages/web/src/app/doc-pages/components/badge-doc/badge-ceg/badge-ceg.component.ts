import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { BaseBadgeProps } from '@elvia/elvis-badge/react';

import { CegControlManager, ComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-badge-ceg',
  templateUrl: './badge-ceg.component.html',
  providers: [{ provide: ComponentExample, useExisting: BadgeCegComponent }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BadgeCegComponent implements ComponentExample {
  elementName = 'badge';
  cegContent = new CegControlManager<BaseBadgeProps>([
    {
      controls: {
        badgeColor: {
          type: 'radioGroup',
          group: 'Color',
          value: 'green',
          radios: [
            { label: 'Green', value: 'green' },
            { label: 'Red', value: 'red' },
            { label: 'Orange', value: 'orange' },
            { label: 'Neutral', value: 'neutral' },
            { label: 'Green apple', value: 'data-1' },
            { label: 'Violet grape', value: 'data-2' },
            { label: 'Blue berry', value: 'data-3' },
            { label: 'Purple plum', value: 'data-4' },
            { label: 'Orange mange', value: 'data-5' },
            { label: 'Red tomato', value: 'data-6' },
          ],
        },
        count: {
          type: 'counter',
          group: 'Count',
          value: 1,
          increment: 1,
          min: 0,
          max: 100,
        },
      },
      groupOrder: ['Color', 'Count'],
    },
  ]);
}
