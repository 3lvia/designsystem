import { Component, ViewChild, ElementRef } from '@angular/core';
import { modalData } from 'src/app/doc-pages/components/modal-doc/modal-data';
import { getComponent } from 'src/app/shared/e-items';

@Component({
  selector: 'app-modal-doc',
  templateUrl: './modal-doc.component.html',
  styleUrls: ['./modal-doc.component.scss'],
})
export class ModalDocComponent {
  @ViewChild('modal1') modal1: ElementRef;
  @ViewChild('modal2') modal2: ElementRef;
  @ViewChild('modal3') modal3: ElementRef;

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

  overviewExample = `<button class="e-btn" (click)="openModal('modal1')">Modal</button>
<div class="e-modal e-none" #modal1>
  <div class="e-modal__content">
    <div class="e-modal__title">
      Title
    </div>
    <div class="e-modal__text">
      Body text comes here and can go over several lines. It looks like this when it is two lines.
    </div>
    <div class="e-modal__actions">
      <button class="e-btn e-btn--secondary e-btn--lg" (click)="closeModal('modal1')">
        <span class="e-btn__title">Cancel</span>
      </button>
      <button class="e-btn e-btn--primary e-btn--lg" (click)="closeModal('modal1')">
        <span class="e-btn__title">Primary action</span>
      </button>
    </div>
  </div>
</div>
`;

  example1 = `<div class="e-modal">
  <div class="e-modal__content">
    <div class="e-modal__title">
      Title of content comes here
    </div>
    <div class="e-modal__text">
      <div>
        Body text comes here and can go over several lines. It looks like this when it is two lines.
      </div>
    </div>
    <div class="e-modal__actions">
      <button class="e-btn e-btn--secondary e-btn--lg">
        <span class="e-btn__title">Cancel</span>
      </button>
      <button class="e-btn e-btn--primary e-btn--lg">
        <span class="e-btn__title">Primary action</span>
      </button>
    </div>
  </div>
</div>
`;

  example2 = ` <div class="e-modal">
  <div class="e-modal__content">
    <div class="e-modal__title">
      Are you sure you want to remove your profile?
    </div>
    <div class="e-modal__text">
      Body text comes here and can go over several lines. It looks like this when it is two lines.
    </div>
    <div class="e-modal__actions">
      <button class="e-btn e-btn--secondary e-btn--lg">
        <span class="e-btn__title">Cancel</span>
      </button>
      <button class="e-btn e-btn--primary e-btn--danger e-btn--lg">
        <span class="e-btn__title">Remove profile</span>
      </button>
    </div>
  </div>
</div>
`;

  example3 = `<div class="e-modal">
  <div class="e-modal__content">
    <div class="e-modal__title">
      Title of content comes here
    </div>
    <div class="e-modal__text">
      Body text comes here and can go over several lines. It looks like this when it is two lines.
    </div>
    <div class="e-modal__actions">
      <button class="e-btn e-btn--primary e-btn--lg">
        <span class="e-btn__title">OK</span>
      </button>
    </div>
  </div>
</div>
`;

  modalLiveCode = `function openModal(modal: string): void {
  if (modal === 'modalId') {
    if (this.modalId.nativeElement.classList.contains('e-none')) {
      this.modalId.nativeElement.classList.remove('e-none');
    } else {
      this.modalId.nativeElement.classList.add('e-none');
    }
  }
}

function closeModal(modal: string): void {
  if (modal === 'modalId') {
    this.modalId.nativeElement.classList.add('e-none');
  }
}`;

  openModal(modal: string): void {
    if (modal === 'modal1') {
      if (this.modal1.nativeElement.classList.contains('e-none')) {
        this.modal1.nativeElement.classList.remove('e-none');
      } else {
        this.modal1.nativeElement.classList.add('e-none');
      }
    }
    if (modal === 'modal2') {
      if (this.modal2.nativeElement.classList.contains('e-none')) {
        this.modal2.nativeElement.classList.remove('e-none');
      } else {
        this.modal2.nativeElement.classList.add('e-none');
      }
    }
    if (modal === 'modal3') {
      if (this.modal3.nativeElement.classList.contains('e-none')) {
        this.modal3.nativeElement.classList.remove('e-none');
      } else {
        this.modal3.nativeElement.classList.add('e-none');
      }
    }
  }

  closeModal(modal: string): void {
    if (modal === 'modal1') {
      this.modal1.nativeElement.classList.add('e-none');
    }
    if (modal === 'modal2') {
      this.modal2.nativeElement.classList.add('e-none');
    }
    if (modal === 'modal3') {
      this.modal3.nativeElement.classList.add('e-none');
    }
  }
}
