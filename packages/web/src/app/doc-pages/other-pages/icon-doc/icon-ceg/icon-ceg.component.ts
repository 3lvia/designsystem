import { Component } from '@angular/core';
import { CegControlManager, ComponentExample } from 'src/app/shared/component-documentation/ceg';

import { IconProps } from '@elvia/elvis-icon/react';

@Component({
  selector: 'app-icon-ceg',
  templateUrl: './icon-ceg.component.html',
  providers: [{ provide: ComponentExample, useExisting: IconCegComponent }],
})
export class IconCegComponent implements ComponentExample {
  elementName = 'icon';
  cegContent = new CegControlManager<IconProps>([
    {
      controls: {
        size: {
          type: 'radioGroup',
          group: 'Size',
          value: 'sm',
          radios: [
            { label: 'XS', value: 'xs' },
            { label: 'Small', value: 'sm' },
            { label: 'Medium', value: 'md' },
            { label: 'Large', value: 'lg' },
            { label: 'XL', value: 'xl' },
            { label: 'XXL', value: 'xxl' },
          ],
        },
      },
      staticProps: {
        name: 'analyticsBars',
      },
      groupOrder: ['Size'],
    },
  ]);
}
