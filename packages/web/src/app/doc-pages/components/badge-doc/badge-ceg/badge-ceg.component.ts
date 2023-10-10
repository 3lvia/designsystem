import { Component } from '@angular/core';
import { CegControlManager, ComponentExample } from 'src/app/shared/component-documentation/ceg';
import { BaseBadgeProps } from '@elvia/elvis-badge/react';

@Component({
  selector: 'app-badge-ceg',
  templateUrl: './badge-ceg.component.html',
  providers: [{ provide: ComponentExample, useExisting: BadgeCegComponent }],
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
