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

  example1 = `<div style="margin-top: 260px; text-align: center;">
  <span class="e-popover e-popover---visible e-m-16">
    <button class="e-btn e-btn--tertiary e-btn--sm">
      <span class="e-btn__icon"><i class="e-icon e-icon--information-circle"></i></span>
    </button>
    <div class="e-popover__content">
      <div class="e-popover__close">
        <button class="e-btn e-btn--icon e-btn--no-border e-btn--sm">
          <span class="e-btn__icon"><i class="e-icon e-icon--close-menu"></i></span>
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
    <button class="e-btn e-btn--tertiary e-btn--sm">
      <span class="e-btn__icon"><i class="e-icon e-icon--information-circle"></i></span>
    </button>
    <div class="e-popover__content">
      <div class="e-popover__close">
        <button class="e-btn e-btn--tertiary e-btn--sm">
          <span class="e-btn__icon"><i class="e-icon e-icon--close-menu"></i></span>
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

  openPopover(popover: string) {
    if (popover === 'popover1') {
      this.popover1.nativeElement.classList.add('e-popover---visible');
    }
    if (popover === 'popover2') {
      this.popover2.nativeElement.classList.add('e-popover---visible');
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
