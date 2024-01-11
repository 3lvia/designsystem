import { Component } from '@angular/core';
import { CegControlManager, ComponentExample } from 'src/app/shared/component-documentation/ceg';
import { TooltipProps } from '@elvia/elvis-tooltip/react';

@Component({
  selector: 'app-tooltip-ceg',
  templateUrl: './tooltip-ceg.component.html',
  providers: [{ provide: ComponentExample, useExisting: TooltipCegComponent }],
})
export class TooltipCegComponent implements ComponentExample {
  elementName = 'tooltip';
  cegContent = new CegControlManager<TooltipProps>([
    {
      controls: {
        position: {
          type: 'radioGroup',
          group: 'Position',
          value: 'right',
          radios: [
            { value: 'top', label: 'Top' },
            { value: 'right', label: 'Right' },
            { value: 'bottom', label: 'Bottom' },
            { value: 'left', label: 'Left' },
          ],
        },
        showDelay: {
          type: 'counter',
          group: 'Delay',
          increment: 100,
          value: 400,
          min: 0,
          max: 1000,
          postfix: 'ms',
        },
        isDisabled: { type: 'checkbox', group: 'State', label: 'Disabled' },
        content: {
          type: 'text',
          group: 'Content',
          label: 'Tooltip content',
          value: 'Brukerinnstillinger',
        },
      },
      groupOrder: ['Position', 'Delay', 'State', 'Content'],
    },
  ]);
}
