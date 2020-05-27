import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { getComponent } from 'src/app/shared/e-items';

@Component({
  selector: 'app-popover-doc',
  templateUrl: './popover-doc.component.html',
  styleUrls: ['./popover-doc.component.scss']
})
export class PopoverDocComponent implements OnInit {
  @ViewChild('popover1') popover1: ElementRef;
  @ViewChild('popover2') popover2: ElementRef;

  componentStatus = getComponent('popover-doc').status;
  externalUrl = getComponent('popover-doc').externalUrl;
  // tslint:disable-next-line:max-line-length
  does = ['Used where we want to give the user more information, such as in an info icon on My page or a question icon next to an input in a form.'];
  donts = ['Not used for critical information that is important for users.'];

  example1 = `<div style="margin-top: 260px; text-align: center;">
  <span class="e-popover e-popover---visible e-m-16">
    <button class="e-btn e-btn--icon e-btn--circled">
      <span class="e-btn__icon">
        <i class="e-icon e-icon--information_circle"></i>
        <i class="e-icon e-icon e-icon--information_circle-filled-color"></i>
      </span>
    </button>
    <div class="e-popover__content">
      <div class="e-popover__close">
        <button class="e-btn e-btn--icon e-btn--sm">
          <span class="e-btn__icon"><i class="e-icon e-icon--close-bold"></i></span>
        </button>
      </div>
      <div class="e-popover__title">Om innlogging</div>
      <div class="e-popover__text">
        Alle privatkunder må bruke BankID første gang de skal logge inn på Min side.
        BankID sikrer trygg og enkel pålogging til kundeinformasjon og forbruksdata.
        Når du først har logget inn, kan du velge å legge til e-post som innloggingsmåte.
        Da kan du selv velge den påloggingsmåten du vil ved senere besøk på Min side.
      </div>
    </div>
  </span>
</div>
`;

  example2 = `<div style="margin-bottom: 260px; text-align: center;">
  <span class="e-popover e-popover--bottom e-popover---visible e-m-16">
    <button class="e-btn e-btn--icon e-btn--circled">
      <span class="e-btn__icon">
        <i class="e-icon e-icon--information_circle"></i>
        <i class="e-icon e-icon e-icon--information_circle-filled-color"></i>
      </span>
    </button>
    <div class="e-popover__content">
      <div class="e-popover__close">
        <button class="e-btn e-btn--icon e-btn--sm">
          <span class="e-btn__icon"><i class="e-icon e-icon--close-bold"></i></span>
        </button>
      </div>
      <div class="e-popover__title">Om innlogging</div>
      <div class="e-popover__text">
        Alle privatkunder må bruke BankID første gang de skal logge inn på Min side.
        BankID sikrer trygg og enkel pålogging til kundeinformasjon og forbruksdata.
        Når du først har logget inn, kan du velge å legge til e-post som innloggingsmåte.
        Da kan du selv velge den påloggingsmåten du vil ved senere besøk på Min side.
      </div>
    </div>
  </span>
</div>
`;

  popupLiveCode = `function openPopover(popoverId) {
  const el = document.querySelector('popoverId');
  el.classList.add('e-popover---visible');
}
function closePopover(popoverId) {
  const el = document.querySelector('popoverId');
  if (el.classList.contains('e-popover---visible')) {
    el.classList.remove('e-popover---visible');
  }
}`;

  constructor() { }

  ngOnInit() {
  }

  togglePopup(popover: string) {
    if (popover === 'popover1') {
      if (this.popover1.nativeElement.classList.contains('e-popover---visible')) {
        this.popover1.nativeElement.classList.remove('e-popover---visible');
      } else {
        this.popover1.nativeElement.classList.add('e-popover---visible');
      }
    }
    if (popover === 'popover2') {
      if (this.popover2.nativeElement.classList.contains('e-popover---visible')) {
        this.popover2.nativeElement.classList.remove('e-popover---visible');
      } else {
        this.popover2.nativeElement.classList.add('e-popover---visible');
      }
    }
  }

  closePopover(popover: string) {
    if (popover === 'popover1') {
      if (this.popover1.nativeElement.classList.contains('e-popover---visible')) {
        this.popover1.nativeElement.classList.remove('e-popover---visible');
      }
    }
    if (popover === 'popover2') {
      if (this.popover2.nativeElement.classList.contains('e-popover---visible')) {
        this.popover2.nativeElement.classList.remove('e-popover---visible');
      }
    }
  }

}
