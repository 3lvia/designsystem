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
  Hover Right
  <span class="e-popover__content e-popover__content--right">
    Alle privatkunder må bruke BankID første gang de skal logge inn på Min side.
    BankID sikrer trygg og enkel pålogging til kundeinformasjon og forbruksdata.
    Når du først har logget inn, kan du velge å legge til e-post som innloggingsmåte.
    Da kan du selv velge den påloggingsmåten du vil ved senere besøk på Min side.
  </span>
</span>

<span class="e-popover e-m-16">
  Hover Left
  <span class="e-popover__content e-popover__content--left">Left popover</span>
</span>

<span class="e-popover e-m-16">
  Hover bottom
  <span class="e-popover__content e-popover__content--bottom">Bottom popover</span>
</span>

<span class="e-popover e-m-16">
  Hover on top
  <span class="e-popover__content e-popover__content--top">Top popover</span>
</span>
`;

  constructor() { }

  ngOnInit() {
  }

}
