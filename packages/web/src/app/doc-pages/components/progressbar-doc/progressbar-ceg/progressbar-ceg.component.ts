import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { BaseProgressLinearProps } from '@elvia/elvis-progress-linear/react';

import { CegControlManager, ComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-progressbar-ceg',
  templateUrl: './progressbar-ceg.component.html',
  providers: [{ provide: ComponentExample, useExisting: ProgressbarCegComponent }],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProgressbarCegComponent implements ComponentExample {
  elementName = 'progress-linear';
  cegContent = new CegControlManager<BaseProgressLinearProps>([
    {
      controls: {
        size: {
          type: 'radioGroup',
          group: 'Size',
          value: 'medium',
          radios: [
            { label: 'Small', value: 'small' },
            { label: 'Medium', value: 'medium' },
            { label: 'Large', value: 'large' },
          ],
        },
        value: { type: 'counter', group: 'Loaded', increment: 10, value: 20, max: 100, min: 0, postfix: '%' },
        isIndeterminate: { type: 'checkbox', group: 'Options', label: 'Indeterminate' },
        isError: { type: 'checkbox', group: 'State', label: 'Error' },
      },
      groupOrder: ['Size', 'Loaded', 'Options', 'State'],
      disabledControls: {
        value: ['isIndeterminate', 'isError'],
      },
    },
  ]);
}
