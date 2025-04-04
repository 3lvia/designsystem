import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { BaseBoxProps } from '@elvia/elvis-box/react';

import { CegControlManager, ComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-box-ceg',
  templateUrl: './box-ceg.component.html',
  styleUrls: ['./box-ceg.component.scss'],
  providers: [{ provide: ComponentExample, useExisting: BoxCegComponent }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BoxCegComponent implements ComponentExample {
  elementName = 'box';
  cegContent = new CegControlManager<BaseBoxProps>([
    {
      controls: {
        isColored: {
          group: 'Options',
          type: 'switch',
          label: 'Colored',
        },
        heading: {
          group: 'Heading',
          type: 'text',
          label: 'Heading',
          placeholder: 'Heading for the box',
        },
      },
      groupOrder: ['Options', 'Heading'],
    },
  ]);
}
