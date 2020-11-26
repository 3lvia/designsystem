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
  <label class="e-form-field__label" for="searchExample">Søk</label>
  <div
    class="e-search e-search--local"
    [ngClass]="{ 'e-search--searched': searched }"
    style="width: 250px"
  >
    <div class="e-input">
      <input id="searchExample" [(ngModel)]="searchString" type="text" placeholder="Placeholder text" />
    </div>
    <button class="e-btn e-btn--icon" (click)="search()">
      <span class="e-btn__icon">
        <i class="e-icon e-icon--search-bold"></i>
      </span>
      <span class="e-btn__icon">
        <i class="e-icon e-icon--close-bold"></i>
      </span>
    </button>
  </div>
</div>
`;

  overviewExampleTs = `searchString = '';
searched = false;

search(): void {
  if (this.searched) {
    this.searchString = '';
    this.searched = false;
  } else if (this.searchString !== '') {
    this.searched = true;
  }
}`;

  normalSearch = `<div class="e-text-label e-mb-8">Before searched</div>
<div class="e-form-field">
  <label class="e-form-field__label" for="searchNormal">Søk</label>
  <div class="e-search" style="width:400px;">
    <div class="e-input">
      <input id="searchNormal" type="text" placeholder="Placeholder text">
    </div>
    <button class="e-btn e-btn--icon">
      <span class="e-btn__icon"><i class="e-icon e-icon--search-bold"></i></span>
      <span class="e-btn__icon"><i class="e-icon e-icon--close-bold"></i></span>
    </button>
  </div>
</div>

<div class="e-text-label e-mb-8 e-mt-40">Searched</div>
<div class="e-form-field">
  <label class="e-form-field__label" for="searchNormalSearched">Søk</label>
  <div class="e-search e-search--searched" style="width:400px;">
    <div class="e-input">
      <input id="searchNormalSearched" type="text" placeholder="Placeholder text">
    </div>
    <button class="e-btn e-btn--icon">
      <span class="e-btn__icon"><i class="e-icon e-icon--search-bold"></i></span>
      <span class="e-btn__icon"><i class="e-icon e-icon--close-bold"></i></span>
    </button>
  </div>
</div>
`;


  instantSearch = `<div class="e-text-label e-mb-8">Before searched</div>
<div class="e-form-field">
  <label class="e-form-field__label" for="searchInstant">Søk</label>
  <div class="e-search e-search--instant" style="width:400px;">
    <span class="e-search__icon"><i class="e-icon e-icon--search-bold"></i></span>
    <div class="e-input">
      <input id="searchInstant" type="text" placeholder="Placeholder text">
    </div>
    <button class="e-btn e-btn--icon">
      <span class="e-btn__icon"><i class="e-icon e-icon--close-bold"></i></span>
    </button>
  </div>
</div>

<div class="e-text-label e-mb-8 e-mt-40">Searched</div>
<div class="e-form-field">
  <label class="e-form-field__label" for="searchInstantSearched">Søk</label>
  <div class="e-search e-search--instant e-search--searched" style="width:400px;">
    <span class="e-search__icon"><i class="e-icon e-icon--search-bold"></i></span>
    <div class="e-input">
      <input id="searchInstantSearched" type="text" placeholder="Placeholder text">
    </div>
    <button class="e-btn e-btn--icon">
      <span class="e-btn__icon"><i class="e-icon e-icon--close-bold"></i></span>
    </button>
  </div>
</div>
`;

  searchSizesExample = `<div class="e-text-label e-mb-8">Normal</div>
<div class="e-form-field">
  <label class="e-form-field__label" for="normal">Søk</label>
  <div class="e-search" style="width:240px;">
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
  <div class="e-search" style="width:240px;">
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
  searched = false;

  search(): void {
    if (this.searched) {
      this.searchString = '';
      this.searched = false;
    } else if (this.searchString !== '') {
      this.searched = true;
    }
  }

}
