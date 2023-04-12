import { Component } from '@angular/core';
import { CegControlManager, ComponentExample } from 'src/app/shared/component-documentation/ceg';
import { exampleContents } from 'src/app/shared/example-contents';
import { CarouselProps } from '@elvia/elvis-carousel/react';

@Component({
  selector: 'app-carousel-ceg',
  templateUrl: './carousel-ceg.component.html',
  styleUrls: ['./carousel-ceg.component.scss'],
  providers: [{ provide: ComponentExample, useExisting: CarouselCegComponent }],
})
export class CarouselCegComponent implements ComponentExample {
  elementName = 'carousel';
  cegContent = new CegControlManager<CarouselProps>([
    {
      name: 'Loop',
      controls: {},
      groupOrder: [''],
    },
    {
      name: 'Linear',
      controls: {
        hasConfirmationCheckmark: {
          group: 'Options',
          label: 'Confirm Button',
          type: 'switch',
          value: false,
        },
      },
      groupOrder: ['Options'],
    },
  ]);

  get exampleContents() {
    return exampleContents;
  }
}
