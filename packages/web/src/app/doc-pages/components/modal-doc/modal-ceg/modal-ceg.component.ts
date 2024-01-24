import { Component } from '@angular/core';

import { CegControlManager, ComponentExample } from 'src/app/shared/component-documentation/ceg';
import { BaseModalProps } from '@elvia/elvis-modal/react';

@Component({
  selector: 'app-modal-ceg',
  templateUrl: './modal-ceg.component.html',
  providers: [{ provide: ComponentExample, useExisting: ModalCegComponent }],
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
