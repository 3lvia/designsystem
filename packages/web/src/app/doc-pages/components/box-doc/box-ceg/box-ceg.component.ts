import { Component } from '@angular/core';
import { BoxProps } from '@elvia/elvis-box/react';
import { CegControlManager, ComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-box-ceg',
  templateUrl: './box-ceg.component.html',
  styleUrls: ['./box-ceg.component.scss'],
  providers: [{ provide: ComponentExample, useExisting: BoxCegComponent }],
})
export class BoxCegComponent implements ComponentExample {
  elementName = 'box';
  cegContent = new CegControlManager<BoxProps>([
    {
      controls: {
        isColored: {
          group: 'Options',
          type: 'switch',
          label: 'Colored',
        },
        title: {
          group: 'Title',
          type: 'text',
          label: 'Title',
          placeholder: 'Title for the box',
        },
      },
      groupOrder: ['Options', 'Title'],
    },
  ]);
}
