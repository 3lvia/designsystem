import { Component } from '@angular/core';
import { getComponent } from 'src/app/shared/e-items';

@Component({
  selector: 'app-search-doc',
  templateUrl: './search-doc.component.html',
  styleUrls: ['./search-doc.component.scss'],
})
export class SearchDocComponent {

  figmaUrl = getComponent('search-doc').figmaUrl;
  description = getComponent('search-doc').description;

  searchExample = `<h3>Before search</h3>
<div class="e-form-field">
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
<h3>After search (e-search--searched)</h3>
<div class="e-form-field">
  <label class="e-form-field__label" for="compact">Søk</label>
  <div class="e-search e-search--local e-search--searched" style="width:400px;">
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

  searchCompactExample = `<h3>Before search</h3>
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
<h3>After search (e-search--searched)</h3>
<div class="e-form-field e-form-field--compact">
  <label class="e-form-field__label" for="compact">Søk</label>
  <div class="e-search e-search--local e-search--searched" style="width:240px;">
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

  searchGlobalExample = `<h3>Before search</h3>
<div class="e-search e-search--global" style="width:340px;">
  <div class="e-input">
    <input
      type="text"
      placeholder="Search"
    />
  </div>
  <button class="e-btn e-btn--icon" (click)="searchString = ''">
    <span class="e-btn__icon"><i class="e-icon e-icon--close-bold"></i></span>
  </button>
</div>
<h3>After search (e-search--searched)</h3>
<div class="e-search e-search--global e-search--searched" style="width:340px;">
  <div class="e-input">
    <input
      type="text"
      placeholder="Search"
    />
  </div>
  <button class="e-btn e-btn--icon" (click)="searchString = ''">
    <span class="e-btn__icon"><i class="e-icon e-icon--close-bold"></i></span>
  </button>
</div>
`;

}
