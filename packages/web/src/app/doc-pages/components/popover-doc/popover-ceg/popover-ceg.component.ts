import { Component } from '@angular/core';
import { CegControlManager, ComponentExample } from 'src/app/shared/component-documentation/ceg';
import { BasePopoverProps } from '@elvia/elvis-popover/react';

@Component({
  selector: 'app-popover-ceg',
  templateUrl: './popover-ceg.component.html',
  providers: [{ provide: ComponentExample, useExisting: PopoverCegComponent }],
})
export class PopoverCegComponent implements ComponentExample {
  elementName = 'popover';
  cegContent = new CegControlManager<BasePopoverProps>([
    {
      controls: {
        verticalPosition: {
          type: 'radioGroup',
          group: 'Vertical Position',
          value: 'top',
          radios: [
            { label: 'Top', value: 'top' },
            { label: 'Bottom', value: 'bottom' },
          ],
        },
        horizontalPosition: {
          type: 'radioGroup',
          group: 'Horizontal Position',
          value: 'center',
          radios: [
            { label: 'Left', value: 'left' },
            { label: 'Center', value: 'center' },
            { label: 'Right', value: 'right' },
          ],
        },
        hasCloseButton: { type: 'switch', group: 'Options', label: 'Close Button', value: true },
        heading: { type: 'text', group: 'Heading', label: 'Heading', value: 'BankID' },
        content: {
          type: 'text',
          group: 'Content',
          label: 'Popover content',
          value: 'Alle privatkunder må bruke BankID første gang.',
          inputType: 'textarea',
        },
      },
      groupOrder: ['Vertical Position', 'Horizontal Position', 'Options', 'Heading', 'Content'],
    },
  ]);

  isShowing = false;
}
