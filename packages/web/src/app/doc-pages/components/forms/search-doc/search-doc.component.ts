import { ElementRef } from '@angular/core';
import { Component, ViewChild } from '@angular/core';
import { getComponent } from 'src/app/shared/e-items';

@Component({
  selector: 'app-search-doc',
  templateUrl: './search-doc.component.html',
  styleUrls: ['./search-doc.component.scss'],
})
export class SearchDocComponent {

  @ViewChild('exampleSearch') exampleSearch: ElementRef;
  @ViewChild('exampleInput') exampleInput: ElementRef;

  figmaUrl = getComponent('search').figmaUrl;
  description = getComponent('search').description;


  isExampleInput = false;

  overviewExample = `<div class="e-form-field">
  <label class="e-form-field__label" for="compact">Søk</label>
  <div class="e-search e-search--local" style="width:400px;">
    <div class="e-input">
      <input id="compact" type="text" placeholder="Placeholder text">
    </div>
    <button class="e-btn e-btn--icon e-btn--lg">
      <span class="e-btn__icon"><i class="e-icon e-icon--search-color"></i></span>
      <span class="e-btn__icon"><i class="e-icon e-icon--close-bold"></i></span>
    </button>
  </div>
</div>
`;

  searchExample = `<div class="e-form-field">
  <label class="e-form-field__label" for="compact">Søk</label>
  <div class="e-search e-search--local" style="width:400px;">
    <div class="e-input">
      <input id="compact" type="text" placeholder="Placeholder text">
    </div>
    <button class="e-btn e-btn--icon e-btn--lg">
      <span class="e-btn__icon"><i class="e-icon e-icon--search-color"></i></span>
      <span class="e-btn__icon"><i class="e-icon e-icon--close-bold"></i></span>
    </button>
  </div>
</div>
`;

  afterSearchExample = `<div class="e-form-field">
  <label class="e-form-field__label" for="compact">Søk</label>
  <div class="e-search e-search--local e-search--searched" style="width:400px;">
    <div class="e-input">
      <input id="compact" type="text" placeholder="Placeholder text" value="Search text input">
    </div>
    <button class="e-btn e-btn--icon e-btn--lg">
      <span class="e-btn__icon"><i class="e-icon e-icon--search-color"></i></span>
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
      <span class="e-btn__icon"><i class="e-icon e-icon--search-color"></i></span>
      <span class="e-btn__icon"><i class="e-icon e-icon--bold"></i></span>
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
      <span class="e-btn__icon"><i class="e-icon e-icon--search-color"></i></span>
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

  onInput(input: string): void {
    if (input.length > 0) {
      this.exampleSearch.nativeElement.classList.add('e-search--searched');
      this.isExampleInput = true;
    } else {
      this.exampleSearch.nativeElement.classList.remove('e-search--searched');
      this.isExampleInput = false;
    }
  }

  clearExample(): void {
    if (this.isExampleInput === true) {
      this.exampleInput.nativeElement.value = null;
      this.exampleSearch.nativeElement.classList.remove('e-search--searched');
      this.isExampleInput = false;
    }
  }
}
