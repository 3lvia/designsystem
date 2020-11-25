import { Component } from '@angular/core';
import { getComponent } from 'src/app/shared/e-items';

@Component({
  selector: 'app-search-doc',
  templateUrl: './search-doc.component.html',
  styleUrls: ['./search-doc.component.scss'],
})
export class SearchDocComponent {

  figmaUrl = getComponent('search').figmaUrl;
  description = getComponent('search').description;

  overviewExample = `<div class="e-form-field">
  <label class="e-form-field__label" for="compact">Søk</label>
  <div class="e-search e-search--local" style="width:400px;">
    <div class="e-input">
      <input id="compact" type="text" placeholder="Placeholder text">
    </div>
    <button class="e-btn e-btn--icon e-btn--lg">
      <span class="e-btn__icon"><i class="e-icon e-icon--search-bold"></i></span>
      <span class="e-btn__icon"><i class="e-icon e-icon--close-bold"></i></span>
    </button>
  </div>
</div>
`;

  overviewExampleTs = ``;

  searchExample = `<div class="e-form-field">
  <label class="e-form-field__label" for="search1">Søk</label>
  <div class="e-search e-search--local" style="width:400px;">
    <div class="e-input">
      <input id="search1" type="text" placeholder="Placeholder text">
    </div>
    <button class="e-btn e-btn--icon e-btn--lg">
      <span class="e-btn__icon"><i class="e-icon e-icon--search-bold"></i></span>
      <span class="e-btn__icon"><i class="e-icon e-icon--close-bold"></i></span>
    </button>
  </div>
</div>
`;

  beforeSearchExample = `<div class="e-form-field">
  <label class="e-form-field__label" for="beforeSearch">Søk</label>
  <div class="e-search e-search--local" style="width:400px;">
    <div class="e-input">
      <input id="beforeSearch" type="text" placeholder="Placeholder text">
    </div>
    <button class="e-btn e-btn--icon e-btn--lg">
      <span class="e-btn__icon"><i class="e-icon e-icon--search-bold"></i></span>
      <span class="e-btn__icon"><i class="e-icon e-icon--close-bold"></i></span>
    </button>
  </div>
</div>
`;
  afterSearchExample = `<div class="e-form-field">
  <label class="e-form-field__label" for="afterSearch">Søk</label>
  <div class="e-search e-search--local e-search--searched" style="width:400px;">
    <div class="e-input">
      <input id="afterSearch" type="text" placeholder="Placeholder text" value="strømbrudd">
    </div>
    <button class="e-btn e-btn--icon e-btn--lg">
      <span class="e-btn__icon"><i class="e-icon e-icon--search-bold"></i></span>
      <span class="e-btn__icon"><i class="e-icon e-icon--close-bold"></i></span>
    </button>
  </div>
</div>
`;

  searchSizesExample = `<div class="e-text-label e-mb-8">Normal</div>
<div class="e-form-field">
  <label class="e-form-field__label" for="normal">Søk</label>
  <div class="e-search e-search--local" style="width:240px;">
    <div class="e-input">
      <input id="normal" type="text" placeholder="Placeholder text">
    </div>
    <button class="e-btn e-btn--icon">
      <span class="e-btn__icon"><i class="e-icon e-icon--search-bold"></i></span>
      <span class="e-btn__icon"><i class="e-icon e-icon--close-bold"></i></span>
    </button>
  </div>
</div>

<div class="e-text-label e-mb-8 e-mt-40">Compact</div>
<div class="e-form-field e-form-field--compact">
  <label class="e-form-field__label" for="compact">Søk</label>
  <div class="e-search e-search--local" style="width:240px;">
    <div class="e-input">
      <input id="compact" type="text" placeholder="Placeholder text">
    </div>
    <button class="e-btn e-btn--icon">
      <span class="e-btn__icon"><i class="e-icon e-icon--search-bold"></i></span>
      <span class="e-btn__icon"><i class="e-icon e-icon--close-bold"></i></span>
    </button>
  </div>
</div>
`;


  searchString = '';

  search(): void {
    if (this.searchString != '') {
      this.searchString = '';
    }
  }

}
