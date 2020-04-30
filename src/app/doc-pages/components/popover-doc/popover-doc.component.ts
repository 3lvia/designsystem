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
  <div class="e-popover__button">Top left</div>
  <div class="e-popover__content">
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
  <div class="e-popover__button">Top center</div>
  <div class="e-popover__content">
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
  <div class="e-popover__button">Top right</div>
  <div class="e-popover__content">
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
  <div class="e-popover__button">Bottom left</div>
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
  <div class="e-popover__button">Bottom center</div>
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

<span class="e-popover e-popover--bottom e-popover--right e-m-16">
  <div class="e-popover__button">Bottom right</div>
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

  constructor() { }

  ngOnInit() {
  }

}
