import { Component } from '@angular/core';
import { CegControlManager, ComponentExample } from 'src/app/shared/component-documentation/ceg';
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
}
