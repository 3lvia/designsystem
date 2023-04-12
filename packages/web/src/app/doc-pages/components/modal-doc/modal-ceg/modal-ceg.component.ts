import { Component, OnInit } from '@angular/core';

import { CegControlManager, ComponentExample } from 'src/app/shared/component-documentation/ceg';
import { ModalProps } from '@elvia/elvis-modal/react';

@Component({
  selector: 'app-modal-ceg',
  templateUrl: './modal-ceg.component.html',
  providers: [{ provide: ComponentExample, useExisting: ModalCegComponent }],
})
export class ModalCegComponent implements ComponentExample, OnInit {
  modalWithIllustration = false;
  isModalShowing = false;
  elementName = 'modal';
  cegContent = new CegControlManager<ModalProps>([
    {
      controls: {
        illustration: {
          type: 'slotToggle',
          group: 'Options',
          label: 'Illustration',
          value: this.modalWithIllustration,
        },
        hasCloseButton: { type: 'switch', group: 'Options', label: 'Close Button' },
      },
      staticProps: {
        heading: 'Title of content',
      },
      groupOrder: ['Options'],
    },
  ]);

  ngOnInit(): void {
    this.cegContent.getActiveSlots().subscribe((slots) => {
      this.modalWithIllustration = slots.includes('illustration');
    });
  }
}
