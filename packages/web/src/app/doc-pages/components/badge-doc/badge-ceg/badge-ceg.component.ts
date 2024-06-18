import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { BaseBadgeProps } from '@elvia/elvis-badge/react';

import { CegControlManager, ComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-badge-ceg',
  templateUrl: './badge-ceg.component.html',
  providers: [{ provide: ComponentExample, useExisting: BadgeCegComponent }],
  standalone: true,
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
            { label: 'Neutral', value: 'neutral' },
            { label: 'Green-apple', value: 'green-apple' },
            { label: 'Blue-berry', value: 'blue-berry' },
            { label: 'Purple-plum', value: 'purple-plum' },
            { label: 'Orange-mange', value: 'orange-mango' },
            { label: 'Red-tomato', value: 'red-tomato' },
            { label: 'Violet-grape', value: 'violet-grape' },
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
