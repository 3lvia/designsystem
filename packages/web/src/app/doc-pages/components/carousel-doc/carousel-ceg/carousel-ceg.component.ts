import { Component } from '@angular/core';
import { CegControlManager, ComponentExample } from 'src/app/shared/component-documentation/ceg';
import { BaseCarouselProps } from '@elvia/elvis-carousel/react';

@Component({
  selector: 'app-carousel-ceg',
  templateUrl: './carousel-ceg.component.html',
  styleUrls: ['./carousel-ceg.component.scss'],
  providers: [{ provide: ComponentExample, useExisting: CarouselCegComponent }],
})
export class CarouselCegComponent implements ComponentExample<BaseCarouselProps> {
  elementName = 'carousel';
  cegContent = new CegControlManager<BaseCarouselProps>([
    {
      type: 'Loop',
      controls: {},
      groupOrder: [''],
      staticProps: {
        valueOnChange: () => '',
      },
    },
    {
      type: 'Linear',
      controls: {
        hasConfirmationCheckmark: {
          group: 'Options',
          label: 'Confirm Button',
          type: 'switch',
          value: false,
        },
      },
      groupOrder: ['Options'],
      staticProps: {
        valueOnChange: () => '',
      },
    },
  ]);

  reactSlotReplacement = {
    items: `[
      {
        heading: <h3 class="e-title-sm">Er strømbruddet kun hos deg?</h3>,
        item: <img alt="" src="/assets/carousel/el1.jpeg" />
      },
      {
        heading: <h3 class="e-title-sm">Har flere mistet strømmen?</h3>,
        item: <img alt="" src="/assets/carousel/el2.jpeg" />
      },
      {
        heading: <h3 class="e-title-sm">Vær forberedt på strømbrudd</h3>,
        item: <img alt="" src="/assets/carousel/el3.jpeg" />
      },
    ]`,
  };

  handleOnChange(value: number): void {
    console.log('New value:', value);
  }
}
