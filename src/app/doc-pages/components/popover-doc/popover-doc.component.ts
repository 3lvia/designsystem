import { Component, OnInit } from '@angular/core';
import { getComponent } from 'src/app/shared/e-items';

@Component({
  selector: 'app-popover-doc',
  templateUrl: './popover-doc.component.html',
  styleUrls: ['./popover-doc.component.scss']
})
export class PopoverDocComponent implements OnInit {

  componentStatus = getComponent('popover-doc').status;

  example1 = `<span class="e-popover e-m-16">
  Top left
  <div class="e-popover__content">
    <div class="e-popover__close"><i class="e-icon e-icon--close-menu"></i></div>
    <div class="e-popover__title">Om innlogging</div>
    <div class="e-popover__text">
      Alle privatkunder må bruke BankID første gang de skal logge inn på Min side.
      BankID sikrer trygg og enkel pålogging til kundeinformasjon og forbruksdata.
      Når du først har logget inn, kan du velge å legge til e-post som innloggingsmåte.
      Da kan du selv velge den påloggingsmåten du vil ved senere besøk på Min side.
    </div>
  </div>
</span>

<span class="e-popover e-popover--center e-m-16">
  Top center
  <div class="e-popover__content">
    <div class="e-popover__close"><i class="e-icon e-icon--close-menu"></i></div>
    <div class="e-popover__title">Om innlogging</div>
    <div class="e-popover__text">
      Alle privatkunder må bruke BankID første gang de skal logge inn på Min side.
      BankID sikrer trygg og enkel pålogging til kundeinformasjon og forbruksdata.
      Når du først har logget inn, kan du velge å legge til e-post som innloggingsmåte.
      Da kan du selv velge den påloggingsmåten du vil ved senere besøk på Min side.
    </div>
  </div>
</span>

<span class="e-popover e-popover--right e-m-16">
  Top right
  <div class="e-popover__content">
    <div class="e-popover__close"><i class="e-icon e-icon--close-menu"></i></div>
    <div class="e-popover__title">Om innlogging</div>
    <div class="e-popover__text">
      Alle privatkunder må bruke BankID første gang de skal logge inn på Min side.
      BankID sikrer trygg og enkel pålogging til kundeinformasjon og forbruksdata.
      Når du først har logget inn, kan du velge å legge til e-post som innloggingsmåte.
      Da kan du selv velge den påloggingsmåten du vil ved senere besøk på Min side.
    </div>
  </div>
</span>
`;

  example2 = `<span class="e-popover e-popover--bottom e-m-16">
  Bottom left
  <div class="e-popover__content">
    <div class="e-popover__close"><i class="e-icon e-icon--close-menu"></i></div>
    <div class="e-popover__title">Om innlogging</div>
    <div class="e-popover__text">
      Alle privatkunder må bruke BankID første gang de skal logge inn på Min side.
      BankID sikrer trygg og enkel pålogging til kundeinformasjon og forbruksdata.
      Når du først har logget inn, kan du velge å legge til e-post som innloggingsmåte.
      Da kan du selv velge den påloggingsmåten du vil ved senere besøk på Min side.
    </div>
  </div>
</span>

<span class="e-popover e-popover--bottom e-popover--center e-m-16">
  Bottom center
  <div class="e-popover__content">
    <div class="e-popover__close"><i class="e-icon e-icon--close-menu"></i></div>
    <div class="e-popover__title">Om innlogging</div>
    <div class="e-popover__text">
      Alle privatkunder må bruke BankID første gang de skal logge inn på Min side.
      BankID sikrer trygg og enkel pålogging til kundeinformasjon og forbruksdata.
      Når du først har logget inn, kan du velge å legge til e-post som innloggingsmåte.
      Da kan du selv velge den påloggingsmåten du vil ved senere besøk på Min side.
    </div>
  </div>
</span>

<span class="e-popover e-popover--bottom e-popover--right visible e-m-16">
  Bottom right
  <div class="e-popover__content" style="margin-bottom:20px;">
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
`;

  constructor() { }

  ngOnInit() {
  }

}
