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
  does = ['Cards contain information that also could have interaction possibilities.',
  'Should be used when you want to group content and/or want to separate information from the rest of the page.'];
  donts = ['Don´t let the cards navigate the user to external sites, use links instead.',
  'Don´t combine titles outside of the card and titles inside the cards on the same page.'];

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

  example3 = `<div style="max-width:600px;margin:40px;">
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

  constructor() { }

  ngOnInit() {
  }

}
