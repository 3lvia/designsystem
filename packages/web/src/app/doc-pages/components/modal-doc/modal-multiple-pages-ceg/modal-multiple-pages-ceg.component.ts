import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { ModalProps } from '@elvia/elvis-modal/react';

import { CegControlManager, ComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-modal-multiple-pages-ceg',
  styleUrls: ['./modal-multiple-pages-ceg.component.scss'],
  templateUrl: './modal-multiple-pages-ceg.component.html',
  providers: [{ provide: ComponentExample, useExisting: ModalMultiplePagesCegComponent }],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ModalMultiplePagesCegComponent implements ComponentExample {
  isModalShowing = false;
  elementName = 'modal';
  cegContent = new CegControlManager<ModalProps>([
    {
      controls: {},
      staticProps: {
        hasCloseButton: true,
      },
      groupOrder: [],
    },
  ]);
}
