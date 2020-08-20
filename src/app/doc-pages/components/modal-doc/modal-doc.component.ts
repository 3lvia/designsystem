import { Component, ViewChild, ElementRef } from '@angular/core';
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

  figmaUrl = getComponent('modal-doc').figmaUrl;
  description = getComponent('modal-doc').description;
  // tslint:disable-next-line:max-line-length
  does = [
    'Where we need the user to make an active choice before continuing, or when a wrong decision can be critical.',
  ];
  // tslint:disable-next-line:max-line-length
  donts = [
    'Be careful with the use of modals, as it can be disruptive to have something lying across the screen many times in a row.',
  ];

  example1 = `<div class="e-modal">
  <div class="e-modal__content">
    <div class="e-modal__title">
      Title of content comes here
    </div>
    <div class="e-modal__text">
      <div>
        Var sparsom med bruken av dialoger siden det kan oppleves forstyrrende å få noe liggendes over skjermen mange ganger på rad.
      </div>
      <div>
        Bruk aldrig et språk eller ord som brukeren ikke skjønner. Det skal alltid være klart for brukeren hva det er den skal ta.
      </div>
    </div>
    <div class="e-modal__actions">
      <button class="e-btn e-btn--secondary e-btn--lg">
        <span class="e-btn__title">Avbryt</span>
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
      Er du sikker på at du vil slette brukeren din?
    </div>
    <div class="e-modal__text">
      Body text comes here and can go over several lines. It looks like this when it is two.
    </div>
    <div class="e-modal__actions">
      <button class="e-btn e-btn--secondary e-btn--lg">
        <span class="e-btn__title">Avbryt</span>
      </button>
      <button class="e-btn e-btn--primary e-btn--danger e-btn--lg">
        <span class="e-btn__title">Slett bruker</span>
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
      Body text comes here and can go over several lines. It looks like this when it is two.
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
