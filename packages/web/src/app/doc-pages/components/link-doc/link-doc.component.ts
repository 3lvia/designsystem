import { Component } from '@angular/core';
import { getComponent } from 'src/app/shared/doc-pages';

@Component({
  selector: 'app-link-doc',
  templateUrl: './link-doc.component.html',
  styleUrls: ['./link-doc.component.scss'],
})
export class LinkDocComponent {
  figmaUrl = getComponent('link').figmaUrl;
  description = getComponent('link').description;
  doExample = `<a class="e-link e-link--lg" href="https://design.elvia.io/components/link#Overview">Se vårt strømsbruddskart</a>`;
  dontExample = `<a class="e-link e-link--lg" href="https://design.elvia.io/components/link#Overview">Klikk her</a>`;

  // tslint:disable-next-line:max-line-length
  dontsExample8 = [
    'On actions that could have disabled state. Links do not have an disabled state, and the e-btn disabled style will not be applied on links with disabled html syntax.',
  ];
  doesExampleCard = [
    'When you want a more visual representation of content than a list view',
    'Shortcurts on the front page',
    'Overview pages for content selection',
  ];
  dontsExampleCard = [
    'Do not use both standard and shortcut on the same page. The same goes for the description version, use description on all or none.',
  ];

  previewLinkHTML = `<a class="e-link" href="https://design.elvia.io/components/link#Overview">Link</a>`;

  example1 = `<a class="e-link" href="https://design.elvia.io/components/link#Overview">Standard link</a>
`;

  example1Inverted = `<a class="e-link e-link--inverted" href="https://design.elvia.io/components/link#Overview">Standard link</a>
`;

  example2 = `<div style="font-size: 20px;">This is an <a class="e-link e-link--inline" href="https://design.elvia.io/components/link#Overview">inline link</a></div>
`;

  // tslint:disable-next-line: max-line-length
  example2Inverted = `<div style="font-size: 20px; e-text-white">This is an <a class="e-link e-link--inline e-link--inverted" href="https://design.elvia.io/components/link#Overview">inline link</a></div>
`;

  exampleNewTab = `<a class="e-link e-link--new-tab" href="https://design.elvia.io/components/link#Overview" target="_blank" rel="noopener">
  <span class="e-link__title">New tab link</span>
  <span class="e-link__icon"><i class="e-icon e-icon--new_tab-bold" aria-hidden="true"></i></span>
</a>
`;

  exampleNewTabInverted = `<a class="e-link e-link--new-tab e-link--inverted" href="https://design.elvia.io/components/link#Overview" target="_blank" rel="noopener">
  <span class="e-link__title">New tab link</span>
  <span class="e-link__icon"><i class="e-icon e-icon--new_tab-bold e-icon--inverted" aria-hidden="true"></i></span>
</a>
`;

  exampleAction = `<a class="e-link e-link--action" href="https://design.elvia.io/components/link#Overview">
  <span class="e-link__title">Action link</span>
  <span class="e-link__icon">
    <i class="e-icon e-icon--arrow_right_circle-color" aria-hidden="true"></i>
    <i class="e-icon e-icon--arrow_right_circle-filled-color" aria-hidden="true"></i>
  </span>  
</a>
`;

  exampleActionInverted = `<a class="e-link e-link--action e-link--inverted" href="https://design.elvia.io/components/link#Overview">
  <span class="e-link__title">Action link</span>
  <span class="e-link__icon">
    <i class="e-icon e-icon--arrow_right_circle-color e-icon--inverted" aria-hidden="true"></i>
    <i class="e-icon e-icon--arrow_right_circle-filled-color e-icon--inverted" aria-hidden="true"></i>
  </span>  
</a>
`;

  exampleBack = `<a class="e-link e-link--back" href="https://design.elvia.io/components/link#Overview">
  <span class="e-link__icon">
    <i class="e-icon e-icon--arrow_left_circle-color" aria-hidden="true"></i>
    <i class="e-icon e-icon--arrow_left_circle-filled-color" aria-hidden="true"></i>
  </span>  
  <span class="e-link__title">Back link</span>
</a>
`;

  exampleBackInverted = `<a class="e-link e-link--back e-link--inverted" href="https://design.elvia.io/components/link#Overview">
  <span class="e-link__icon">
    <i class="e-icon e-icon--arrow_left_circle-color e-icon--inverted" aria-hidden="true"></i>
    <i class="e-icon e-icon--arrow_left_circle-filled-color e-icon--inverted" aria-hidden="true"></i>
  </span>  
  <span class="e-link__title">Back link</span>
</a>
`;

  exampleCard = `<h4 class="e-text-label">Standard</h4>
<div style="width: 150px;">
  <a
    class="e-link e-link--card"
    href="https://design.elvia.io/components/link#Overview"
  >
    <div class="e-link__content">
      <span class="e-link__icon">
        <i class="e-icon e-icon--electricity_safety" aria-hidden="true"></i>
        <i class="e-icon e-icon--electricity_safety-color" aria-hidden="true"></i>
      </span>
      <div class="e-link__title">Label</div>
    </div>
  </a>
</div>

<h4 class="e-text-label">Shortcut</h4>
<div style="width: 150px;">
  <a
    class="e-link e-link--card e-link--shortcut"
    href="https://design.elvia.io/components/link#Overview"
  >
    <div class="e-link__content">
      <span class="e-link__icon">
        <i class="e-icon e-icon--electricity_safety" aria-hidden="true"></i>
        <i class="e-icon e-icon--electricity_safety-color" aria-hidden="true"></i>
      </span>
      <div class="e-link__title">Label</div>
      <div class="e-link__description">Description</div>
    </div>
  </a>
</div>
`;

  example8 = `<a class="e-btn e-m-16" href="www.elvia.no">
  <span class="e-btn__title">Link label</span>
</a>
`;

  exampleSizes = `<div style="display: flex; align-items: center; flex-wrap: wrap;">
  <div class="e-mt-16 e-mr-16">
    <a class="e-link e-link--sm" href="https://design.elvia.io/components/link#Overview">Small link</a>
  </div>
  <div class="e-mt-16 e-mr-16">
    <a class="e-link" href="https://design.elvia.io/components/link#Overview">Medium link</a>
  </div>
  <div class="e-mt-16">
    <a class="e-link e-link--lg" href="https://design.elvia.io/components/link#Overview">Large link</a>
  </div>
</div>
`;
}
