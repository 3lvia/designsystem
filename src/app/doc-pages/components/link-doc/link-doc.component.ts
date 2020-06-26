import { Component } from '@angular/core';
import { getComponent } from 'src/app/shared/e-items';

@Component({
  selector: 'app-link-doc',
  templateUrl: './link-doc.component.html',
  styleUrls: ['./link-doc.component.scss'],
})
export class LinkDocComponent {
  figmaUrl = getComponent('link-doc').figmaUrl;
  doExample = `<a class="e-link e-link--lg" href="https://www.elvia.no/">Se vårt strømsbruddskart</a>`;
  dontExample = `<a class="e-link e-link--lg" href="https://www.elvia.no/">Klikk her</a>`;

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

  example1 = `<div>
  <h3 class="e-title-small">Large</h3>
  <a class="e-link e-link--lg" href="https://www.elvia.no/">Normal link</a>
</div>
<div class="e-mt-40">
  <h3 class="e-title-small">Medium (default)</h3>
  <a class="e-link" href="https://www.elvia.no/">Normal link</a>
</div>
<div class="e-mt-40">
  <h3 class="e-title-small">Small</h3>
  <a class="e-link e-link--sm" href="https://www.elvia.no/">Normal link</a>
</div>
<div class="e-mt-40">
  <h3 class="e-title-small">Multiline</h3>
  <div style="width:160px;">
    <a class="e-link" href="https://www.elvia.no/">Normal link over multiple rows</a>
  </div>
</div>
`;

  example2 = `<p style="font-size: 20px;">Lorem ipsum <a class="e-link e-link--inline" href="https://www.elvia.no/">dolor</a> sit amet.
  Soluta modi in rerum magnam blanditiis laboriosam architecto illum,
  nemo eaque voluptate consectetur nulla fugiat delectus vel quia tenetur eius pariatur magni!
</p>
`;

  example3 = `<div>
  <h3 class="e-title-small">Large</h3>
  <a class="e-link e-link--lg" href="https://www.elvia.no/">
    <span class="e-link__icon"><i class="e-icon e-icon--arrow_left-bold"></i></span>
    <span class="e-link__title">Tilbake</span>
  </a>
</div>
<div class="e-mt-40">
  <h3 class="e-title-small">Medium (default)</h3>
  <a class="e-link" href="https://www.elvia.no/">
    <span class="e-link__icon"><i class="e-icon e-icon--arrow_left-bold"></i></span>
    <span class="e-link__title">Tilbake</span>
  </a>
</div>
<div class="e-mt-40">
  <h3 class="e-title-small">Small</h3>
  <a class="e-link e-link--sm" href="https://www.elvia.no/">
    <span class="e-link__icon"><i class="e-icon e-icon--arrow_left-bold"></i></span>
    <span class="e-link__title">Tilbake</span>
  </a>
</div>
`;

  example4 = `<div>
  <h3 class="e-title-small">Large</h3>
  <a class="e-link e-link--external e-link--lg" href="https://www.elvia.no/">
    <span class="e-link__title">External</span>
    <span class="e-link__icon"><i class="e-icon e-icon--arrow_external-bold"></i></span>
  </a>
</div>
<div class="e-mt-40">
  <h3 class="e-title-small">Medium (default)</h3>
  <a class="e-link e-link--external" href="https://www.elvia.no/">
    <span class="e-link__title">External</span>
    <span class="e-link__icon"><i class="e-icon e-icon--arrow_external-bold"></i></span>
  </a>
</div>
<div class="e-mt-40">
  <h3 class="e-title-small">Small</h3>
  <a class="e-link e-link--external e-link--sm" href="https://www.elvia.no/">
    <span class="e-link__title">External</span>
    <span class="e-link__icon"><i class="e-icon e-icon--arrow_external-bold"></i></span>
  </a>
</div>
<div class="e-mt-40" style="width:164px;">
  <h3 class="e-title-small">Multiline</h3>
  <a class="e-link e-link--external" href="https://www.elvia.no/">
    <span class="e-link__title">External link over multiple rows</span>
    <span class="e-link__icon"><i class="e-icon e-icon--arrow_external-bold"></i></span>
  </a>
</div>
`;

  exampleNewTab = `<div>
  <h3 class="e-title-small">Large</h3>
  <a class="e-link e-link--new-tab e-link--lg" href="https://www.elvia.no/">
    <span class="e-link__title">New tab</span>
    <span class="e-link__icon"><i class="e-icon e-icon--new_tab"></i></span>
  </a>
</div>
<div class="e-mt-40">
  <h3 class="e-title-small">Medium (default)</h3>
  <a class="e-link e-link--new-tab" href="https://www.elvia.no/">
    <span class="e-link__title">New tab</span>
    <span class="e-link__icon"><i class="e-icon e-icon--new_tab"></i></span>
  </a>
</div>
<div class="e-mt-40">
  <h3 class="e-title-small">Small</h3>
  <a class="e-link e-link--new-tab e-link--sm" href="https://www.elvia.no/">
    <span class="e-link__title">New tab</span>
    <span class="e-link__icon"><i class="e-icon e-icon--new_tab"></i></span>
  </a>
</div>
<div class="e-mt-40" style="width:164px;">
  <h3 class="e-title-small">Multiline</h3>
  <a class="e-link e-link--new-tab" href="https://www.elvia.no/">
    <span class="e-link__title">New-tab link over multiple rows</span>
    <span class="e-link__icon"><i class="e-icon e-icon--new_tab"></i></span>
  </a>
</div>
  `;

  example5 = `<div>
  <h3 class="e-title-small">Large</h3>
  <a class="e-link e-link--action e-link--lg" href="https://www.elvia.no/">
    <span class="e-link__title">Se hva du kan gjøre</span>
    <span class="e-link__icon">
      <i class="e-icon e-icon--arrow_circle-color"></i>
      <i class="e-icon e-icon--arrow_circle-filled-color"></i>
    </span>
  </a>
</div>
<div class="e-mt-40">
  <h3 class="e-title-small">Medium (default)</h3>
  <a class="e-link e-link--action" href="https://www.elvia.no/">
    <span class="e-link__title">Se hva du kan gjøre</span>
    <span class="e-link__icon">
      <i class="e-icon e-icon--arrow_circle-color"></i>
      <i class="e-icon e-icon--arrow_circle-filled-color"></i>
    </span>
  </a>
</div>
<div class="e-mt-40" style="width:164px;">
  <h3 class="e-title-small">Multiline</h3>
  <a class="e-link e-link--action" href="https://www.elvia.no/">
    <span class="e-link__title">Action link over multiple rows</span>
    <span class="e-link__icon">
      <i class="e-icon e-icon--arrow_circle-color"></i>
      <i class="e-icon e-icon--arrow_circle-filled-color"></i>
    </span>
  </a>
</div>
`;

  example6 = `<div>
  <h3 class="e-title-small">With icon</h3>
  <a class="e-link e-link--jumbo" href="https://www.elvia.no/">
    <span class="e-link__icon"><i class="e-icon e-icon--powerline e-icon--xl"></i></span>
    <span class="e-link__title">Strømledning nær bakken</span>
    <span class="e-link__icon"><i class="e-icon e-icon--arrow_right-bold e-icon--xs"></i></span>
  </a>
</div>
<div>
  <h3 class="e-title-small">Without icon</h3>
  <a class="e-link e-link--jumbo" href="https://www.elvia.no/">
    <span class="e-link__title">Strømledning nær bakken</span>
    <span class="e-link__icon"><i class="e-icon e-icon--arrow_right-bold e-icon--xs"></i></span>
  </a>
</div>
`;

  exampleCard = `<div>
  <h3 class="e-title-small">Standard (default)</h3>
  <div style="display: flex; align-items: flex-end;">
    <div class="e-mr-16" style="width: 150px;">
      <a
        class="e-link e-link--card"
        href="https://www.elvia.no/"
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
    <div style="width: 200px;">
      <a
        class="e-link e-link--card"
        href="https://www.elvia.no/"
      >
        <div class="e-link__content">
          <span class="e-link__icon">
            <i class="e-icon e-icon--electricity_safety"></i>
            <i class="e-icon e-icon--electricity_safety"></i>
          </span>
          <div class="e-link__title">Label</div>
          <div class="e-link__description">Description</div>
        </div>
      </a>
    </div>
  </div>
</div>
<div>
  <h3 class="e-title-small">Shortcut</h3>
  <div style="display: flex; align-items: flex-end;">
    <div class="e-mr-16" style="width: 150px;">
      <a
        class="e-link e-link--card e-link--shortcut"
        href="https://www.elvia.no/"
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
    <div style="width: 200px;">
      <a
        class="e-link e-link--card e-link--shortcut"
        href="https://www.elvia.no/"
      >
        <div class="e-link__content">
          <span class="e-link__icon">
            <i class="e-icon e-icon--electricity_safety"></i>
            <i class="e-icon e-icon--electricity_safety"></i>
          </span>
          <div class="e-link__title">Label</div>
          <div class="e-link__description">Description</div>
        </div>
      </a>
    </div>
  </div>
</div>
`;

  example7 = `<div class="e-mt-40">
  <h3 class="e-title-small">Normal link</h3>
  <a class="e-link e-link---hover e-m-8" href="https://www.elvia.no/">Hover</a>
  <a class="e-link e-link---focus e-m-8" href="https://www.elvia.no/">Focus</a>
</div>
<div class="e-mt-40">
  <h3 class="e-title-small">Action link</h3>
  <a class="e-link e-link--action e-link---hover e-m-8" href="https://www.elvia.no/">
    <span class="e-link__title">Hover</span>
    <span class="e-link__icon">
      <i class="e-icon e-icon--arrow_circle-color"></i>
      <i class="e-icon e-icon--arrow_circle-filled-color"></i>
    </span>
  </a>
  <a class="e-link e-link--action e-link---focus e-m-8" href="https://www.elvia.no/">
    <span class="e-link__title">Focus</span>
    <span class="e-link__icon">
      <i class="e-icon e-icon--arrow_circle-color"></i>
      <i class="e-icon e-icon--arrow_circle-filled-color"></i>
    </span>
  </a>
</div>
<div class="e-mt-40">
  <h3 class="e-title-small">Jumbo link</h3>
  <a class="e-link e-link--jumbo e-link---hover e-m-8" href="https://www.elvia.no/">
    <span class="e-link__icon"><i class="e-icon e-icon--powerline e-icon--xl"></i></span>
    <span class="e-link__title">Hover</span>
    <span class="e-link__icon"><i class="e-icon e-icon--arrow_right-bold e-icon--xs"></i></span>
  </a>
  <a class="e-link e-link--jumbo e-link---focus e-m-8" href="https://www.elvia.no/">
    <span class="e-link__icon"><i class="e-icon e-icon--powerline e-icon--xl"></i></span>
    <span class="e-link__title">Focus</span>
    <span class="e-link__icon"><i class="e-icon e-icon--arrow_right-bold e-icon--xs"></i></span>
  </a>
</div>
`;

  example8 = `<div>
<a class="e-btn e-m-16" href="www.elvia.no">
  <span class="e-btn__title">Anchor tags</span>
</a>

<a class="e-btn e-m-16" href="www.elvia.no">
  <span class="e-btn__icon">
    <i class="e-icon e-icon--download e-icon--inverted"></i>
    <i class="e-icon e-icon--download"></i>
  </span>
  <span class="e-btn__title">With Icon</span>
</a>
</div>

<div>
  <a class="e-btn e-btn--secondary e-m-16" href="www.elvia.no">
    <span class="e-btn__title">Secondary</span>
  </a>

  <a class="e-btn e-btn--secondary e-m-16" href="www.elvia.no">
    <span class="e-btn__title">With icon</span>
    <span class="e-btn__icon"><i class="e-icon e-icon--download"></i></span>
  </a>
</div>

<div>
  <a class="e-btn e-btn--tertiary e-m-16" href="www.elvia.no">
    <span class="e-btn__icon"><i class="e-icon e-icon--download"></i></span>
    <span class="e-btn__title">Tertiary</span>
  </a>

  <a class="e-btn e-btn--icon e-btn--lg e-m-16" href="www.elvia.no">
    <span class="e-btn__icon"><i class="e-icon e-icon--upload"></i></span>
  </a>
</div>
`;
}
