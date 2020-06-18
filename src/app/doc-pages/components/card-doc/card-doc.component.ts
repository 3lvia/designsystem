import { Component } from '@angular/core';
import { getComponent } from 'src/app/shared/e-items';

@Component({
  selector: 'app-card-doc',
  templateUrl: './card-doc.component.html',
  styleUrls: ['./card-doc.component.scss'],
})
export class CardDocComponent {
  componentStatus = getComponent('card-doc').status;
  externalUrl = getComponent('card-doc').externalUrl;
  donts = [
    'Don\'t redirect cards to external sites - use link instead.',
    'Do not combine "title outside card" and "title inside card" on the same front.',
  ];

  example1 = `<div style="max-width:600px;margin:40px;">
  <div class="e-card">
    <div class="e-card__title">
      Strømregningen påvirkes av vinteren
    </div>
    <div class="e-card__content">
      Hovedårsaken til at du får høyere strømregning på vinteren er at temperaturen ute synker,
      mens de fleste holder en jevn temperatur på rundt 20 grader inne...
    </div>
  </div>
</div>
`;

  example2 = `<div style="max-width:600px;margin:40px;">
  <div class="e-card e-card--on-white">
    <div class="e-card__title">
      Strømregningen påvirkes av vinteren
    </div>
    <div class="e-card__content">
      Hovedårsaken til at du får høyere strømregning på vinteren er at temperaturen ute synker,
      mens de fleste holder en jevn temperatur på rundt 20 grader inne...
    </div>
  </div>
</div>`;

  example3 = `<div style="max-width:600px;margin:50px;">
  <div class="e-card">
    <div class="e-card__title e-card__title--above">
      Strømregningen påvirkes av vinteren
    </div>
    <div class="e-card__content">
      Hovedårsaken til at du får høyere strømregning på vinteren er at temperaturen ute synker,
      mens de fleste holder en jevn temperatur på rundt 20 grader inne...
    </div>
  </div>
</div>
  `;
}
