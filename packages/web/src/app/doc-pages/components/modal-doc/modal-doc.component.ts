import { Component } from '@angular/core';
import { modalData } from 'src/app/doc-pages/components/modal-doc/modal-data';
import { modalActionsCode } from 'src/app/doc-pages/components/modal-doc/modal-actions-code';
import { modalInfoCode } from 'src/app/doc-pages/components/modal-doc/modal-info-code';
import { modalDangerCode } from 'src/app/doc-pages/components/modal-doc/modal-danger-code';
import { modalIllustrationCode } from 'src/app/doc-pages/components/modal-doc/modal-illustration-code';
import { modalMultipageCode } from 'src/app/doc-pages/components/modal-doc/modal-multipage-code';
import { getComponent } from 'src/app/shared/doc-pages';

@Component({
  selector: 'app-modal-doc',
  templateUrl: './modal-doc.component.html',
  styleUrls: ['./modal-doc.component.scss'],
})
export class ModalDocComponent {
  componentData = modalData;
  modalActionsCode = modalActionsCode;
  modalDangerCode = modalDangerCode;
  modalInfoCode = modalInfoCode;
  typesData = [modalActionsCode, modalDangerCode, modalInfoCode];
  modalMultipageCode = modalMultipageCode;
  modalIllustrationCode = modalIllustrationCode;
  figmaUrl = getComponent('modal').figmaUrl;
  description = getComponent('modal').description;
  // tslint:disable-next-line:max-line-length
  does = [
    'Where we need the user to make an active choice before continuing, or when a wrong decision can be critical.',
  ];
  // tslint:disable-next-line:max-line-length
  donts = [
    'Be careful with the use of modals, as it can be disruptive to have something lying across the screen many times in a row.',
  ];
}
