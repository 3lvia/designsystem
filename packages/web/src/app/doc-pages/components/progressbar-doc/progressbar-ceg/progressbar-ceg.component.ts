import { Component } from '@angular/core';
import { CegControlManager, ComponentExample } from 'src/app/shared/component-documentation/ceg';
import { ProgressLinearProps } from '@elvia/elvis-progress-linear/react';

@Component({
  selector: 'app-progressbar-ceg',
  templateUrl: './progressbar-ceg.component.html',
  providers: [{ provide: ComponentExample, useExisting: ProgressbarCegComponent }],
})
export class ProgressbarCegComponent implements ComponentExample {
  elementName = 'progress-linear';
  cegContent = new CegControlManager<ProgressLinearProps>([
    {
      name: 'Default',
      controls: {
        value: { type: 'counter', group: 'Loaded', increment: 10, value: 20, max: 100, min: 0, postfix: '%' },
        isIndeterminate: { type: 'checkbox', group: 'State', label: 'Indeterminate' },
        isError: { type: 'checkbox', group: 'State', label: 'Error' },
        size: {
          type: 'radioGroup',
          group: 'Size',
          value: 'small',
          radios: [
            { label: 'Small', value: 'small' },
            { label: 'Medium', value: 'medium' },
          ],
        },
      },
      groupOrder: ['Loaded', 'State', 'Size'],
    },
  ]);
}
