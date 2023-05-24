import { Component } from '@angular/core';
import { CegControlManager, ComponentExample } from 'src/app/shared/component-documentation/ceg';
import { PaginationProps } from '@elvia/elvis-pagination/react';

@Component({
  selector: 'app-pagination-ceg',
  templateUrl: './pagination-ceg.component.html',
  providers: [{ provide: ComponentExample, useExisting: PaginationCegComponent }],
})
export class PaginationCegComponent implements ComponentExample {
  elementName = 'pagination';
  cegContent = new CegControlManager<PaginationProps>([
    {
      controls: {
        alignment: {
          type: 'radioGroup',
          group: 'Alignment',
          value: 'left',
          radios: [
            { value: 'left', label: 'Left' },
            { value: 'right', label: 'Right' },
          ],
        },
      },
      staticProps: {
        numberOfElements: 25,
      },
      groupOrder: ['Alignment'],
    },
  ]);

  printChangeEvent(data: { start: number; end: number }): void {
    console.log('Page changed:', data);
  }
}
