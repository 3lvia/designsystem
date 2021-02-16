import { Component } from '@angular/core';
import { getComponent } from 'src/app/shared/e-items';
import { exampleContents } from 'src/app/shared/example-contents';

@Component({
  selector: 'app-card-doc',
  templateUrl: './card-doc.component.html',
  styleUrls: ['./card-doc.component.scss'],
})
export class CardDocComponent {
  examples = exampleContents;
  figmaUrl = getComponent('card').figmaUrl;
  description = getComponent('card').description;
  donts = [
    "Don't redirect cards to external sites - use links instead.",
    'Do not combine "title outside card" and "title inside card" on the same front.',
  ];

  exampleOverview = `<div class="e-card e-card--on-white">
  <div class="e-card__title">
    Short card title
  </div>
  <div class="e-card__content">
    Description for card.
  </div>
</div>
`;

  example1 =
    `<div style="max-width:600px;" class="e-m-24">
  <div class="e-card">
    <div class="e-card__title">
      ` +
    this.examples.texts.md2['eng-GBR'].title +
    `
    </div>
    <div class="e-card__content">
      ` +
    this.examples.texts.md2['eng-GBR'].description +
    `
    </div>
  </div>
</div>
`;

  example2 =
    `<div style="max-width:600px;" class="e-m-24">
  <div class="e-card e-card--on-white">
    <div class="e-card__title">
      ` +
    this.examples.texts.md2['eng-GBR'].title +
    `
    </div>
    <div class="e-card__content">
      ` +
    this.examples.texts.md2['eng-GBR'].description +
    `
    </div>
  </div>
</div>`;

  example3 =
    `<div style="max-width:600px;" class="e-m-24">
  <div class="e-card e-mt-48">
    <div class="e-card__title e-card__title--above">
      ` +
    this.examples.texts.md2['eng-GBR'].title +
    `
    </div>
    <div class="e-card__content">
      ` +
    this.examples.texts.md2['eng-GBR'].description +
    `
    </div>
  </div>
</div>
  `;

  exampleShadowSoft =
    `<div style="max-width:600px;" class="e-m-24">
  <div class="e-card e-card--shadow-soft e-mt-48">
    <div class="e-card__title e-card__title--above">
      ` +
    this.examples.texts.md2['eng-GBR'].title +
    `
    </div>
    <div class="e-card__content">
      ` +
    this.examples.texts.md2['eng-GBR'].description +
    `
    </div>
  </div>
</div>
`;

  exampleShadowMedium =
    `<div style="max-width:600px;" class="e-m-24">
  <div class="e-card e-card--shadow-medium e-mt-48">
    <div class="e-card__title e-card__title--above">
      ` +
    this.examples.texts.md2['eng-GBR'].title +
    `
    </div>
    <div class="e-card__content">
      ` +
    this.examples.texts.md2['eng-GBR'].description +
    `
    </div>
  </div>
</div>
`;

  exampleShadowHard =
    `<div style="max-width:600px;" class="e-m-24">
  <div class="e-card e-card--shadow-hard e-mt-48">
    <div class="e-card__title e-card__title--above">
      ` +
    this.examples.texts.md2['eng-GBR'].title +
    `
    </div>
    <div class="e-card__content">
      ` +
    this.examples.texts.md2['eng-GBR'].description +
    `
    </div>
  </div>
</div>
`;
}
