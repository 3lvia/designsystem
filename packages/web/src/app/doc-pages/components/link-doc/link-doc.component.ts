import { Component } from '@angular/core';
import { getComponent } from 'src/app/shared/doc-pages';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-link-doc',
  templateUrl: './link-doc.component.html',
  styleUrls: ['./link-doc.component.scss'],
})
export class LinkDocComponent {
  figmaUrl = getComponent('link')?.figmaUrl;
  description = getComponent('link')?.description;
  title = getComponent('link')?.title;
  doExample = `<a class="e-link e-link--lg" href="https://design.elvia.io/components/link#Overview">Se vårt strømsbruddskart</a>`;
  dontExample = `<a class="e-link e-link--lg" href="https://design.elvia.io/components/link#Overview">Klikk her</a>`;

  constructor(private titleService: Title) {
    this.titleService.setTitle(this.title + ' | Elvia design system');
  }

  previewLinkHTML = `<a class="e-link" href="https://design.elvia.io/components/link#Overview">Link</a>`;

  example1 = `<a class="e-link" href="https://design.elvia.io/components/link#Overview">Standard link</a>
`;

  example1Inverted = `<a class="e-link e-link--inverted" href="https://design.elvia.io/components/link#Overview">Standard link</a>
`;

  example2 = `<div style="font-size: 20px;">This is an <a class="e-link e-link--inline" href="https://design.elvia.io/components/link#Overview">inline link</a></div>
`;

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
