import { Component } from '@angular/core';
import { getComponent } from 'src/app/shared/e-items';

@Component({
  selector: 'app-link-doc',
  templateUrl: './link-doc.component.html',
  styleUrls: ['./link-doc.component.scss'],
})
export class LinkDocComponent {
  figmaUrl = getComponent('link').figmaUrl;
  description = getComponent('link').description;
  doExample = `<a class="e-link e-link--lg" href="https://design.elvia.io/components/link-doc#Overview">Se vårt strømsbruddskart</a>`;
  dontExample = `<a class="e-link e-link--lg" href="https://design.elvia.io/components/link-doc#Overview">Klikk her</a>`;

  doesExample6 = [
    'Use jumbo links for a group of links on the same level, to gather and provide an overview.',
  ];
  dontsExample6 = [
    'Do not use jumbo links for groups with less than three links.',
    'Do not mix links that aren’t naturally grouped together in the jumbo link section.',
    // tslint:disable-next-line:max-line-length
    'Do not mix icon jumbo link with jumbo links without icons - in that case, all jumbo links in the section should be showed without icon.',
  ];
  // tslint:disable-next-line:max-line-length
  dontsExample8 = [
    'On actions that could have disabled state. Links do not have an disabled state, and the e-btn disabled style will not be applied on links with disabled html syntax.',
  ];
  doesExampleCard = [
    'When you want a more visual representation of content than a list view',
    'Shortcurts on the front page',
    'Overview pages for content selection',
  ];
  dontsExampleCard = ['Do not use both standard and shortcut on the same page. The same goes for the description version, use description on all or none.'];


  previewLinkHTML = `<a class="e-link" href="https://design.elvia.io/components/link-doc#Overview">Link</a>`;

  example1 = `<a class="e-link" href="https://design.elvia.io/components/link-doc#Overview">Standard link</a>
`;

  example1Inverted = `<a class="e-link e-link--inverted" href="https://design.elvia.io/components/link-doc#Overview">Standard link</a>
`;

  example2 = `<div style="font-size: 20px;">Dette er en <a class="e-link e-link--inline" href="https://design.elvia.io/components/link-doc#Overview">inline link</a></div>
`;

  // tslint:disable-next-line: max-line-length
  example2Inverted = `<div style="font-size: 20px; e-text-white">Dette er en <a class="e-link e-link--inline e-link--inverted" href="https://design.elvia.io/components/link-doc#Overview">inline link</a></div>
`;

  exampleLinksWithIcon = `<div style="display: flex; align-items: center; flex-wrap: wrap;">
  <div class="e-mt-16 e-mr-16">
    <a class="e-link" href="https://design.elvia.io/components/link-doc#Overview">
      <span class="e-link__icon"><i class="e-icon e-icon--arrow_left-bold"></i></span>
      <span class="e-link__title">Back</span>
    </a>
  </div>
  <div class="e-mt-16 e-mr-16">
    <a class="e-link" href="https://design.elvia.io/components/link-doc#Overview">
      <span class="e-link__title">Forward</span>
      <span class="e-link__icon"><i class="e-icon e-icon--arrow_right-bold"></i></span>
    </a>
  </div>
  <div class="e-mt-16 e-mr-16">
    <a class="e-link e-link--external" href="https://www.elvia.no/">
      <span class="e-link__title">External</span>
      <span class="e-link__icon"><i class="e-icon e-icon--arrow_external-bold"></i></span>
    </a>
  </div>
  <div class="e-mt-16">
    <a class="e-link e-link--new-tab" href="https://design.elvia.io/components/link-doc#Overview">
      <span class="e-link__title">New tab</span>
      <span class="e-link__icon"><i class="e-icon e-icon--new_tab-bold"></i></span>
    </a>
  </div>
</div>
`;

  exampleLinksWithIconInverted = `<div style="display: flex; align-items: center; flex-wrap: wrap;">
  <div class="e-mt-16 e-mr-16">
    <a class="e-link e-link--inverted" href="https://design.elvia.io/components/link-doc#Overview">
      <span class="e-link__icon"><i class="e-icon e-icon--arrow_left-bold e-icon--inverted"></i></span>
      <span class="e-link__title">Back</span>
    </a>
  </div>
  <div class="e-mt-16 e-mr-16">
    <a class="e-link e-link--inverted" href="https://design.elvia.io/components/link-doc#Overview">
      <span class="e-link__title">Forward</span>
      <span class="e-link__icon"><i class="e-icon e-icon--arrow_right-bold e-icon--inverted"></i></span>
    </a>
  </div>
  <div class="e-mt-16 e-mr-16">
    <a class="e-link e-link--external e-link--inverted" href="https://www.elvia.no/">
      <span class="e-link__title">External</span>
      <span class="e-link__icon"><i class="e-icon e-icon--arrow_external-bold e-icon--inverted"></i></span>
    </a>
  </div>
  <div class="e-mt-16">
    <a class="e-link e-link--new-tab e-link--inverted" href="https://design.elvia.io/components/link-doc#Overview">
      <span class="e-link__title">New tab</span>
      <span class="e-link__icon"><i class="e-icon e-icon--new_tab-bold e-icon--inverted"></i></span>
    </a>
  </div>
</div>
`;

  example5 = `<a class="e-link e-link--action" href="https://design.elvia.io/components/link-doc#Overview">
  <span class="e-link__title">Action link</span>
  <span class="e-link__icon">
    <i class="e-icon e-icon--arrow_circle-color"></i>
    <i class="e-icon e-icon--arrow_circle-filled-color"></i>
  </span>
</a>
`;

  example6 = `<a class="e-link e-link--jumbo e-mb-40" href="https://design.elvia.io/components/link-doc#Overview">
  <span class="e-link__title">Jumbo link</span>
  <span class="e-link__icon"><i class="e-icon e-icon--arrow_right-bold e-icon--xs"></i></span>
</a>
<a class="e-link e-link--jumbo" href="https://design.elvia.io/components/link-doc#Overview">
  <span class="e-link__icon"><i class="e-icon e-icon--powerline e-icon--xl"></i></span>
  <span class="e-link__title">Jumbo link with icon</span>
  <span class="e-link__icon"><i class="e-icon e-icon--arrow_right-bold e-icon--xs"></i></span>
</a>
`;
  example6External = `<a class="e-link e-link--jumbo e-mb-40" href="https://design.elvia.io/components/link-doc#Overview">
  <span class="e-link__title">External jumbo link</span>
  <span class="e-link__icon"><i class="e-icon e-icon--arrow_external-bold e-icon--xs"></i></span>
</a>
<a class="e-link e-link--jumbo" href="https://design.elvia.io/components/link-doc#Overview">
  <span class="e-link__icon"><i class="e-icon e-icon--powerline e-icon--xl"></i></span>
  <span class="e-link__title">External jumbo link with icon</span>
  <span class="e-link__icon"><i class="e-icon e-icon--arrow_external-bold e-icon--xs"></i></span>
</a>
`;

  exampleCard = `<h4 class="e-text-label">Standard</h4>
<div style="width: 150px;">
  <a
    class="e-link e-link--card"
    href="https://design.elvia.io/components/link-doc#Overview"
  >
    <div class="e-link__content">
      <span class="e-link__icon">
        <i class="e-icon e-icon--electricity_safety"></i>
        <i class="e-icon e-icon--electricity_safety-color"></i>
      </span>
      <div class="e-link__title">Label</div>
    </div>
  </a>
</div>

<h4 class="e-text-label">Shortcut</h4>
<div style="width: 150px;">
  <a
    class="e-link e-link--card e-link--shortcut"
    href="https://design.elvia.io/components/link-doc#Overview"
  >
    <div class="e-link__content">
      <span class="e-link__icon">
        <i class="e-icon e-icon--electricity_safety"></i>
        <i class="e-icon e-icon--electricity_safety-color"></i>
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
    <a class="e-link e-link--sm" href="https://design.elvia.io/components/link-doc#Overview">Small link</a>
  </div>
  <div class="e-mt-16 e-mr-16">
    <a class="e-link" href="https://design.elvia.io/components/link-doc#Overview">Medium link</a>
  </div>
  <div class="e-mt-16">
    <a class="e-link e-link--lg" href="https://design.elvia.io/components/link-doc#Overview">Large link</a>
  </div>
</div>
`;
}
