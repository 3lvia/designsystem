import { NgClass } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { BaseContextMenuProps } from '@elvia/elvis-context-menu/react';

import { CegControlManager, ComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
    selector: 'app-context-menu-ceg',
    templateUrl: './context-menu-ceg.component.html',
    providers: [{ provide: ComponentExample, useExisting: ContextMenuCegComponent }],
    imports: [NgClass],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ContextMenuCegComponent implements ComponentExample {
  elementName = 'context-menu';
  cegContent = new CegControlManager<BaseContextMenuProps>([
    {
      controls: {
        verticalPosition: {
          type: 'radioGroup',
          group: 'Vertical Position',
          value: 'bottom',
          radios: [
            { label: 'Bottom', value: 'bottom' },
            { label: 'Top', value: 'top' },
          ],
        },
        horizontalPosition: {
          type: 'radioGroup',
          group: 'Horizontal Position',
          value: 'left',
          radios: [
            { label: 'Left', value: 'left' },
            { label: 'Right', value: 'right' },
          ],
        },
      },
      groupOrder: ['Vertical Position', 'Horizontal Position'],
    },
  ]);

  isShowing = false;
}
