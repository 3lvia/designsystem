import { Component } from '@angular/core';

import { CegControlManager, ComponentExample } from 'src/app/shared/component-documentation/ceg';
import { ModalProps } from '@elvia/elvis-modal/react';

@Component({
  selector: 'app-modal-multiple-pages-ceg',
  styleUrls: ['./modal-multiple-pages-ceg.component.scss'],
  templateUrl: './modal-multiple-pages-ceg.component.html',
  providers: [{ provide: ComponentExample, useExisting: ModalMultiplePagesCegComponent }],
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
