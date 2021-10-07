import { Component } from '@angular/core';
import { modalData } from 'src/app/doc-pages/components/modal-doc/modal-data';
import { getComponent } from 'src/app/shared/doc-pages';

@Component({
  selector: 'app-modal-doc',
  templateUrl: './modal-doc.component.html',
  styleUrls: ['./modal-doc.component.scss'],
})
export class ModalDocComponent {
  componentData = modalData;
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
