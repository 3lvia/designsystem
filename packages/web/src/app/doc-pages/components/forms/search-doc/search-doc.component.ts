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

  overviewExample = `    <div class="e-form-field">
      <div
        class="e-search e-search--local--instant"
        style="width: 250px"
        #exampleSearch
      >
        <div class="e-input">
          <input
            aria-label="Search"
            type="search"
            placeholder="Search"
            #exampleInput
            (keyup)="onInput(exampleInput.value)"
          />
        </div>
        <i class="e-icon e-icon--search-color"></i>
        <button
          class="e-btn e-btn--icon e-btn--lg"
          (click)="clearExample()"
        >
          <span class="e-btn__icon"><i class="e-icon e-icon--close-bold"></i></span>
        </button>
      </div>
    </div>
`;

  overviewExampleTS = `@ViewChild('exampleSearch') exampleSearch: ElementRef;
@ViewChild('exampleInput') exampleInput: ElementRef;

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
`;

  searchExample = `<div class="e-form-field">
<div
  class="e-search e-search--instant"
  style="width: 250px"
>
  <div class="e-input">
    <input
      aria-label="Search"
      type="search"
      placeholder="Search"
    />
  </div>
  <i class="e-icon e-icon--search-color"></i>
  <button
    class="e-btn e-btn--icon"
  >
    <span class="e-btn__icon"><i class="e-icon e-icon--close-bold"></i></span>
  </button>
</div>
</div>
`;

  afterSearchExample = `<div class="e-form-field">
<div
  class="e-search e-search--instant e-search--searched"
  style="width: 250px"
>
  <div class="e-input">
    <input
      aria-label="Search"
      type="search"
      placeholder="Search"
      value="Elvia"
    />
  </div>
  <i class="e-icon e-icon--search-color"></i>
  <button
    class="e-btn e-btn--icon"
    (click)="clearExample()"
  >
    <span class="e-btn__icon"><i class="e-icon e-icon--close-bold"></i></span>
  </button>
</div>
</div>
`;

  searhOnSubmitExample = `<div style="display: flex; justify-content: start; align-items: flex-end;">
<div class="e-form-field">
  <div
    class="e-search e-search--on-submit"
    style="width: 250px"
  >
    <div class="e-input">
      <input
        aria-label="Search"
        type="search"
        placeholder="Search"
      />
    </div>
    <button
      class="e-btn e-btn--icon"
    >
      <span class="e-btn__icon"><i class="e-icon e-icon--close-bold"></i></span>
    </button>
  </div>
</div>
<button class="e-btn e-btn--lg e-ml-16">
  <span class="e-btn__icon">
    <i class="e-icon e-icon--search-color e-icon--inverted"></i>
    <i class="e-icon e-icon--search-color"></i>
  </span>
  <span class="e-btn__title">Search</span>
</button>
</div>

`;
  searhOnSubmitAfterExample = `<div style="display: flex; justify-content: start; align-items: flex-end;">
<div class="e-form-field">
  <div
    class="e-search e-search--on-submit e-search--searched"
    style="width: 250px"
  >
    <div class="e-input">
      <input
        aria-label="Search"
        type="search"
        placeholder="Search"
        value="Elvia"
      />
    </div>
    <button
      class="e-btn e-btn--icon"
    >
      <span class="e-btn__icon"><i class="e-icon e-icon--close-bold"></i></span>
    </button>
  </div>
</div>
<button class="e-btn e-btn--lg e-ml-16">
  <span class="e-btn__icon">
    <i class="e-icon e-icon--search-color e-icon--inverted"></i>
    <i class="e-icon e-icon--search-color"></i>
  </span>
  <span class="e-btn__title">Search</span>
</button>
</div>
`;

  searchSizesInstantExample = `<div class="e-text-label e-mb-16">Normal</div>
<div class="e-form-field">
  <div
    class="e-search e-search--instant"
    style="width: 250px"
  >
    <div class="e-input">
      <input
        aria-label="Search"
        type="search"
        placeholder="Search"
      />
    </div>
    <i class="e-icon e-icon--search-color"></i>
    <button
      class="e-btn e-btn--icon"
    >
      <span class="e-btn__icon"><i class="e-icon e-icon--close-bold"></i></span>
    </button>
  </div>
</div>

<div class="e-text-label e-mb-16 e-mt-24">Compact</div>

<div class="e-form-field e-form-field--compact e-mt-24">
  <div
    class="e-search e-search--instant"
    style="width: 250px"
  >
    <div class="e-input">
      <input
        aria-label="Search"
        type="search"
        placeholder="Search"
      />
    </div>
    <i class="e-icon e-icon--search-color"></i>
    <button
      class="e-btn e-btn--icon"
    >
      <span class="e-btn__icon"><i class="e-icon e-icon--close-bold"></i></span>
    </button>
  </div>
</div>
`;

  searchSizesOnSubmitExample = `<div class="e-text-label e-mb-16">Normal</div>
<div style="display: flex; justify-content: start; align-items: flex-end;">
  <div class="e-form-field">
    <div
      class="e-search e-search--on-submit"
      style="width: 250px"
    >
      <div class="e-input">
        <input
          aria-label="Search"
          type="search"
          placeholder="Search"
        />
      </div>
      <button class="e-btn e-btn--icon">
        <span class="e-btn__icon"><i class="e-icon e-icon--close-bold"></i></span>
      </button>
    </div>
  </div>
  <button class="e-btn e-btn--lg e-ml-16">
    <span class="e-btn__icon">
      <i class="e-icon e-icon--search-color e-icon--inverted"></i>
      <i class="e-icon e-icon--search-color"></i>
    </span>
    <span class="e-btn__title">Search</span>
  </button>
</div>

<div class="e-text-label e-mb-16 e-mt-24">Compact</div>

<div class="e-mt-24" style="display: flex; justify-content: start; align-items: flex-end;">
  <div class="e-form-field e-form-field--compact">
    <div
      class="e-search e-search--on-submit "
      style="width: 250px"
    >
      <div class="e-input">
        <input
          aria-label="Search"
          type="search"
          placeholder="Search"
        />
      </div>
      <button
        class="e-btn e-btn--icon"
      >
        <span class="e-btn__icon"><i class="e-icon e-icon--close-bold"></i></span>
      </button>
    </div>
  </div>
  <button class="e-btn e-btn--sm e-ml-16">
    <span class="e-btn__icon">
      <i class="e-icon e-icon--search-color e-icon--inverted"></i>
      <i class="e-icon e-icon--search-color"></i>
    </span>
    <span class="e-btn__title">Search</span>
  </button>
</div>
`;

  searchGlobalExample = `<h3>Before search</h3>
<div class="e-search e-search--global" style="width:340px;">
  <div class="e-input">
    <input
      aria-label="Search"
      type="search"
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
      aria-label="Search"
      type="search"
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
