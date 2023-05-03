import { ElementRef } from '@angular/core';
import { Component, ViewChild } from '@angular/core';
import { getComponent } from 'src/app/shared/doc-pages';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-search-doc',
  templateUrl: './search-doc.component.html',
  styleUrls: ['./search-doc.component.scss'],
})
export class SearchDocComponent {
  @ViewChild('exampleSearch') exampleSearch: ElementRef;
  @ViewChild('exampleInput') exampleInput: ElementRef;

  figmaUrl = getComponent('search')?.figmaUrl;
  description = getComponent('search')?.description;
  title = getComponent('search')?.title;

  constructor(private titleService: Title) {
    this.titleService.setTitle(this.title + ' | Elvia design system');
  }

  isExampleInput = false;

  does = [
    'Organize related information',
    'When you have a lot of content and the content is not important to always have available',
  ];
  donts = [
    'Don’t hide necessary and critical information to the user to complete their task in a accordion',
    'Don’t use it for navigation elements',
  ];

  overviewExample = `<div class="e-form-field">
  <div
    class="e-search e-search--instant"
    style="width: 300px"
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
    <i class="e-icon e-icon--search-color" aria-hidden="true"></i>
    <button
      class="e-btn e-btn--icon e-btn--lg"
      (click)="clearExample()"
      aria-label="Tøm søkefelt"
    >
      <span class="e-btn__icon"><i class="e-icon e-icon--close-bold" aria-hidden="true"></i></span>
    </button>
  </div>
</div>
`;

  overviewExampleTS = `@ViewChild('exampleSearch') exampleSearch: ElementRef;
@ViewChild('exampleInput') exampleInput: ElementRef;

isExampleInput = false;

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
    <i class="e-icon e-icon--search-color" aria-hidden="true"></i>
    <button
      class="e-btn e-btn--icon"
      aria-label="Tøm søkefelt"
    >
      <span class="e-btn__icon"><i class="e-icon e-icon--close-bold" aria-hidden="true"></i></span>
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
    <i class="e-icon e-icon--search-color" aria-hidden="true"></i>
    <button
      class="e-btn e-btn--icon"
      (click)="clearExample()"
      aria-label="Tøm søkefelt"
    >
      <span class="e-btn__icon"><i class="e-icon e-icon--close-bold" aria-hidden="true"></i></span>
    </button>
  </div>
</div>
`;

  searhOnSubmitExample = `<div class="e-inlined-field">
  <div class="e-form-field e-form-field--width-auto">
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
      <button class="e-btn e-btn--icon" aria-label="Tøm søkefelt">
        <span class="e-btn__icon"><i class="e-icon e-icon--close-bold" aria-hidden="true"></i></span>
      </button>
    </div>
  </div>
  <button class="e-btn e-btn--lg e-ml-16">
    <span class="e-btn__icon">
      <i class="e-icon e-icon--search-color e-icon--inverted" aria-hidden="true"></i>
      <i class="e-icon e-icon--search-color" aria-hidden="true"></i>
    </span>
    <span class="e-btn__title">Search</span>
  </button>
</div>
`;
  searhOnSubmitAfterExample = `<div class="e-inlined-field">
  <div class="e-form-field e-form-field--width-auto">
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
        aria-label="Tøm søkefelt"
      >
        <span class="e-btn__icon"><i class="e-icon e-icon--close-bold" aria-hidden="true"></i></span>
      </button>
    </div>
  </div>
  <button class="e-btn e-btn--lg e-ml-16">
    <span class="e-btn__icon">
      <i class="e-icon e-icon--search-color e-icon--inverted" aria-hidden="true"></i>
      <i class="e-icon e-icon--search-color" aria-hidden="true"></i>
    </span>
    <span class="e-btn__title">Search</span>
  </button>
</div>
`;

  searchSizesNormalExample = `<div class="e-title-caps e-mb-16">Instant</div>
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
    <i class="e-icon e-icon--search-color" aria-hidden="true"></i>
    <button
      class="e-btn e-btn--icon"
      aria-label="Tøm søkefelt"
    >
      <span class="e-btn__icon"><i class="e-icon e-icon--close-bold" aria-hidden="true"></i></span>
    </button>
  </div>
</div>

<div class="e-title-caps e-mb-16 e-mt-24">On submit</div>
<div class="e-inlined-field">
  <div class="e-form-field e-form-field--width-auto">
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
      <button class="e-btn e-btn--icon" aria-label="Tøm søkefelt">
        <span class="e-btn__icon"><i class="e-icon e-icon--close-bold" aria-hidden="true"></i></span>
      </button>
    </div>
  </div>
  <button class="e-btn e-btn--lg e-ml-16">
    <span class="e-btn__icon">
      <i class="e-icon e-icon--search-color e-icon--inverted" aria-hidden="true"></i>
      <i class="e-icon e-icon--search-color" aria-hidden="true"></i>
    </span>
    <span class="e-btn__title">Search</span>
  </button>
</div>
`;

  searchSizesCompactExample = `<div class="e-title-caps e-mb-16">Instant</div>
<div class="e-form-field e-form-field--compact">
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
    <i class="e-icon e-icon--search-color" aria-hidden="true"></i>
    <button
      class="e-btn e-btn--icon"
      aria-label="Tøm søkefelt"
    >
      <span class="e-btn__icon"><i class="e-icon e-icon--close-bold" aria-hidden="true"></i></span>
    </button>
  </div>
</div>

<div class="e-title-caps e-mb-16 e-mt-24">On submit</div>
<div class="e-inlined-field">
  <div class="e-form-field e-form-field--width-auto e-form-field--compact">
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
        aria-label="Tøm søkefelt"
      >
        <span class="e-btn__icon"><i class="e-icon e-icon--close-bold" aria-hidden="true"></i></span>
      </button>
    </div>
  </div>
  <button class="e-btn e-btn--sm e-ml-16">
    <span class="e-btn__icon">
      <i class="e-icon e-icon--search-color e-icon--inverted" aria-hidden="true"></i>
      <i class="e-icon e-icon--search-color" aria-hidden="true"></i>
    </span>
    <span class="e-btn__title">Search</span>
  </button>
</div>
`;

  searchFullWidth = `<!-- Instant -->
<div class="e-title-caps e-mb-16">Instant</div>
<div class="e-form-field e-form-field--full-width">
  <div class="e-search e-search--instant">
    <div class="e-input">
      <input aria-label="Search" type="search" placeholder="Search" />
    </div>
    <i class="e-icon e-icon--search-color" aria-hidden="true"></i>
    <button class="e-btn e-btn--icon" aria-label="Tøm søkefelt">
      <span class="e-btn__icon"
        ><i class="e-icon e-icon--close-bold" aria-hidden="true"></i
      ></span>
    </button>
  </div>
</div>

<!-- On submit -->
<div class="e-title-caps e-mb-16 e-mt-24">On submit</div>
<div class="e-inlined-field e-inlined-field--full-width">
  <div class="e-form-field">
    <div class="e-search e-search--on-submit">
      <div class="e-input">
        <input aria-label="Search" type="search" placeholder="Search" />
      </div>
      <button class="e-btn e-btn--icon" aria-label="Tøm søkefelt">
        <span class="e-btn__icon"
          ><i class="e-icon e-icon--close-bold" aria-hidden="true"></i
        ></span>
      </button>
    </div>
  </div>
  <button class="e-btn e-btn--lg e-ml-16">
    <span class="e-btn__icon">
      <i
        class="e-icon e-icon--search-color e-icon--inverted"
        aria-hidden="true"
      ></i>
      <i class="e-icon e-icon--search-color" aria-hidden="true"></i>
    </span>
    <span class="e-btn__title">Search</span>
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
