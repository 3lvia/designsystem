import { Component, OnInit } from '@angular/core';
import { getComponent } from 'src/app/shared/e-items';

@Component({
  selector: 'app-card-doc',
  templateUrl: './card-doc.component.html',
  styleUrls: ['./card-doc.component.scss']
})
export class CardDocComponent implements OnInit {

  componentStatus = getComponent('card-doc').status;
  externalUrl = getComponent('card-doc').externalUrl;

  example1 = `<div class="e-card">
  <div class="e-card__title">
    A card should have a title
  </div>
  <div class="e-card__content">
    Best design once so-called "iPad killer" although Apple will only get better,
    overall gorgeous on the contrary profit.
  </div>
</div>
`;

  example2 = `<div class="e-card e-card--bg-white">
   <div class="e-card__title">
    A card should have a title
  </div>
  <div class="e-card__content">
    Best design once so-called "iPad killer" although Apple will only get better,
    overall gorgeous on the contrary profit.
  </div>
</div>`;

  example3 = `<div class="e-card__title-above">
    A card should have a title
</div>
<div class="e-card">
  <div class="e-card__content">
    Can also not have a title
    Best design once so-called "iPad killer" although Apple will only get better,
    overall gorgeous on the contrary profit.
  </div>
</div>
  `;

  constructor() { }

  ngOnInit() {
  }

}
