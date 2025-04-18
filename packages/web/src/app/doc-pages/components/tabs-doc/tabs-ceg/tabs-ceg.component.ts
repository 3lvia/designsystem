import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { BaseTabsProps } from '@elvia/elvis-tabs/react';

import { CegControlManager, ComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-tabs-ceg',
  templateUrl: './tabs-ceg.component.html',
  providers: [{ provide: ComponentExample, useExisting: TabsCegComponent }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TabsCegComponent implements ComponentExample {
  elementName = 'tabs';
  cegContent = new CegControlManager<BaseTabsProps>([
    {
      controls: {},
      groupOrder: [],
      staticProps: {
        value: 0,
        items: ['Elektrisk bil', 'AMS-måler', 'HAN-port'],
        ariaLabel: 'Enkelt eksempel på faneliste',
        valueOnChange: () => '',
      },
    },
  ]);

  handleOnChange(value: number): void {
    console.log('New value:', value);
  }
}
