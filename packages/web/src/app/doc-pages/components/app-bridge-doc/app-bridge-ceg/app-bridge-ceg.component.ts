import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { BaseAppBridgeProps } from '@elvia/elvis-app-bridge/react';

import { CegControlManager, ComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-app-bridge-ceg',
  standalone: true,
  templateUrl: './app-bridge-ceg.component.html',
  providers: [{ provide: ComponentExample, useExisting: AppBridgeCegComponent }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppBridgeCegComponent implements ComponentExample {
  elementName = 'app-bridge';
  cegContent = new CegControlManager<BaseAppBridgeProps>([
    {
      controls: {},
      groupOrder: [],
      staticProps: {
        targetId: '12345678',
      },
    },
  ]);
}
