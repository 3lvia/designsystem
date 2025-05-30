import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { ModalProps } from '@elvia/elvis-modal/react';

import { CegControlManager, ComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-modal-initial-focus-ceg',
  templateUrl: './modal-initial-focus-ceg.component.html',
  providers: [{ provide: ComponentExample, useExisting: ModalInitialFocusCegComponent }],
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
