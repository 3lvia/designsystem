import { Component, OnInit } from '@angular/core';
import { getComponent } from 'src/app/shared/e-items';

@Component({
  selector: 'app-link-doc',
  templateUrl: './link-doc.component.html',
  styleUrls: ['./link-doc.component.scss']
})
export class LinkDocComponent implements OnInit {

  externalUrl = getComponent('link-doc').externalUrl;
  componentStatus = getComponent('link-doc').status;

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
`;

  example2 = `<p style="font-size: 20px;">Lorem ipsum <a class="e-link e-link--inline" href="https://www.elvia.no/">dolor</a> sit amet.
  Soluta modi in rerum magnam blanditiis laboriosam architecto illum,
  nemo eaque voluptate consectetur nulla fugiat delectus vel quia tenetur eius pariatur magni!
</p>
`;

  example3 = `<div>
  <h3 class="e-title-small">Large</h3>
  <a class="e-link e-link--lg" href="https://www.elvia.no/">
    <span class="e-link__icon"><i class="e-icon e-icon--arrow-left"></i></span>
    <span class="e-link__title">Tilbake</span>
  </a>
</div>
<div class="e-mt-40">
  <h3 class="e-title-small">Medium (default)</h3>
  <a class="e-link" href="https://www.elvia.no/">
    <span class="e-link__icon"><i class="e-icon e-icon--arrow-left"></i></span>
    <span class="e-link__title">Tilbake</span>
  </a>
</div>
`;

  example4 = `<div>
  <h3 class="e-title-small">Large</h3>
  <a class="e-link e-link--external e-link--lg" href="https://www.elvia.no/">
    <span class="e-link__title">Se mer</span>
    <span class="e-link__icon"><i class="e-icon e-icon--arrow-external"></i></span>
  </a>
</div>
<div class="e-mt-40">
  <h3 class="e-title-small">Medium (default)</h3>
  <a class="e-link e-link--external" href="https://www.elvia.no/">
    <span class="e-link__title">Se mer</span>
    <span class="e-link__icon"><i class="e-icon e-icon--arrow-external"></i></span>
  </a>
</div>
`;

  example5 = `<div>
  <h3 class="e-title-small">Large</h3>
  <a class="e-link e-link--action e-link--lg" href="https://www.elvia.no/">
    <span class="e-link__title">Se hva du kan gjøre</span>
    <span class="e-link__icon"><i class="e-icon e-icon--arrow-right"></i></span>
  </a>
</div>
<div class="e-mt-40">
  <h3 class="e-title-small">Medium (default)</h3>
  <a class="e-link e-link--action" href="https://www.elvia.no/">
    <span class="e-link__title">Se hva du kan gjøre</span>
    <span class="e-link__icon"><i class="e-icon e-icon--arrow-right"></i></span>
  </a>
</div>
`;

  example6 = `<a class="e-link e-link--jumbo" href="https://www.elvia.no/">
  <span class="e-link__icon"><i class="e-icon e-icon--powerline-snow e-icon--xl"></i></span>
  <span class="e-link__title">Strømledning nær bakken</span>
  <span class="e-link__icon"><i class="e-icon e-icon--arrow-right e-icon--xs"></i></span>
</a>
`;

  example7 = `<div>
  <a class="e-link e-link---hover" href="https://www.elvia.no/">Hover</a>
</div>
<div class="e-mt-16">
  <a class="e-link e-link---focus" href="https://www.elvia.no/">Focus</a>
</div>
`;

  constructor() { }

  ngOnInit() {
  }

}
