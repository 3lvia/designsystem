import { Component } from '@angular/core';

import { CegControlManager, ComponentExample } from 'src/app/shared/component-documentation/ceg';
import { TabsProps } from '@elvia/elvis-tabs/react';

@Component({
  selector: 'app-tabs-ceg',
  templateUrl: './tabs-ceg.component.html',
  providers: [{ provide: ComponentExample, useExisting: TabsCegComponent }],
})
export class TabsCegComponent implements ComponentExample {
  elementName = 'tabs';
  cegContent = new CegControlManager<TabsProps>([
    {
      controls: {},
      groupOrder: [],
      staticProps: {
        value: 0,
        items: ['Electric car', 'AMS-meter', 'HAN-port'],
        ariaLabel: 'Simple tab list example',
        valueOnChange: () => '',
      },
    },
  ]);

  handleOnChange(value: number): void {
    console.log('New value:', value);
  }
}
