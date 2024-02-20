import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';

import { CegControlManager, ComponentExample } from 'src/app/shared/component-documentation/ceg';

import { ModalProps } from '@elvia/elvis-modal/react';

@Component({
  selector: 'app-modal-initial-focus-ceg',
  templateUrl: './modal-initial-focus-ceg.component.html',
  providers: [{ provide: ComponentExample, useExisting: ModalInitialFocusCegComponent }],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ModalInitialFocusCegComponent implements ComponentExample {
  isModalShowing = false;
  elementName = 'modal';
  cegContent = new CegControlManager<ModalProps>([
    {
      controls: {},
      groupOrder: [],
    },
  ]);
}
