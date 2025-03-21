import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { BaseModalProps } from '@elvia/elvis-modal/react';

import { CegControlManager, ComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-modal-ceg',
  templateUrl: './modal-ceg.component.html',
  providers: [{ provide: ComponentExample, useExisting: ModalCegComponent }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ModalCegComponent implements ComponentExample {
  isModalShowing = false;
  elementName = 'modal';
  cegContent = new CegControlManager<BaseModalProps>([
    {
      controls: {
        illustration: {
          type: 'slotToggle',
          group: 'Options',
          label: 'Illustration',
          value: false,
        },
        hasCloseButton: { type: 'switch', group: 'Options', label: 'Close Button' },
      },
      staticProps: {
        heading: 'Datagodkjenning',
      },
      groupOrder: ['Options'],
    },
  ]);
}
