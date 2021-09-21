import { Component, OnInit } from '@angular/core';
import { getComponent } from 'src/app/shared/doc-pages';

@Component({
  selector: 'app-pagination-doc',
  templateUrl: './pagination-doc.component.html',
  styleUrls: ['./pagination-doc.component.scss'],
})
export class PaginationDocComponent implements OnInit {
  figmaUrl = getComponent('pagination').figmaUrl;
  description = getComponent('pagination').description;
  does = [
    'When there’s a lot of content to process and the user is looking for specific information. Often used in tables.',
  ];

  paginationExample = `<h3>Start</h3>
<div class="e-pagination">
  <div class="e-pagination__number-per-page">
    <span>Shows</span>
    <span class="e-pagination__dropdown">
      <div class="e-form-field e-form-field--compact">
        <div class="e-dropdown">
          <div class="e-input e-input--centered">
            <i class="e-icon e-icon--arrow_down-bold"></i>
            <!--<i class="e-icon e-icon--arrow_up-bold"></i>-->
            <input type="button" value="10" />
          </div>
          <!--<div class="e-dropdown__content">
            <span class="e-dropdown__item">
              option
            </span>
          </div>-->
        </div>
      </div>
    </span>
    <span>of 200 images</span>
  </div>
  <div class="e-pagination__choosing-page">
    <div class="e-pagination__number e-pagination__number--active">1</div>
    <div class="e-pagination__number">2</div>
    <div class="e-pagination__number">3</div>
    <div class="e-pagination__number">4</div>
    <div class="e-pagination__number">5</div>
    <div class="e-pagination__number">6</div>
    <div class="e-pagination__dots">...</div>
    <div class="e-pagination__number">29</div>
    <div class="e-pagination__arrow">
      <i class="e-icon e-icon--arrow_long e-icon--xs"></i>
    </div>
  </div>
</div>

<div class="e-mt-40">
  <h3>Middle</h3>
  <div class="e-pagination">
    <div class="e-pagination__number-per-page">
      <span>Shows</span>
      <span class="e-pagination__dropdown">
        <div class="e-form-field e-form-field--compact">
          <div class="e-dropdown">
            <div class="e-input e-input--centered">
              <i class="e-icon e-icon--arrow_down-bold"></i>
              <!--<i class="e-icon e-icon--arrow_up-bold"></i>-->
              <input type="button" value="20" />
            </div>
            <!--<div class="e-dropdown__content">
              <span class="e-dropdown__item">
                option
              </span>
            </div>-->
          </div>
        </div>
      </span>
      <span>of 200 images</span>
    </div>
    <div class="e-pagination__choosing-page">
      <div class="e-pagination__arrow">
        <i class="e-icon e-icon--arrow_long_left e-icon--xs"></i>
      </div>
      <div class="e-pagination__number">1</div>
      <div class="e-pagination__dots">...</div>
      <div class="e-pagination__number">4</div>
      <div class="e-pagination__number">5</div>
      <div class="e-pagination__number e-pagination__number--active">6</div>
      <div class="e-pagination__number">7</div>
      <div class="e-pagination__number">8</div>
      <div class="e-pagination__dots">...</div>
      <div class="e-pagination__number">29</div>
      <div class="e-pagination__arrow">
        <i class="e-icon e-icon--arrow_long e-icon--xs"></i>
      </div>
    </div>
  </div>
</div>

<div class="e-mt-40">
  <h3>End</h3>
  <div class="e-pagination">
    <div class="e-pagination__number-per-page">
      <span>Shows</span>
      <span class="e-pagination__dropdown">
        <div class="e-form-field e-form-field--compact">
          <div class="e-dropdown">
            <div class="e-input e-input--centered">
              <i class="e-icon e-icon--arrow_down-bold"></i>
              <!--<i class="e-icon e-icon--arrow_up-bold"></i>-->
              <input type="button" value="Alle" />
            </div>
            <!--<div class="e-dropdown__content">
              <span class="e-dropdown__item">
                option
              </span>
            </div>-->
          </div>
        </div>
      </span>
      <span>of 200 images</span>
    </div>
    <div class="e-pagination__choosing-page">
    <div class="e-pagination__arrow">
        <i class="e-icon e-icon--arrow_long_left e-icon--xs"></i>
      </div>
      <div class="e-pagination__number">1</div>
      <div class="e-pagination__dots">...</div>
      <div class="e-pagination__number e-pagination__number--active">27</div>
      <div class="e-pagination__number">24</div>
      <div class="e-pagination__number">25</div>
      <div class="e-pagination__number">26</div>
      <div class="e-pagination__number">27</div>
      <div class="e-pagination__number">28</div>
      <div class="e-pagination__number">29</div>
    </div>
  </div>
</div>
`;

  exampleInHTML = `<div class="e-pagination">
  <div class="e-pagination__number-per-page">
    <span>Shows</span>
    <span class="e-pagination__dropdown">
      <div class="e-form-field e-form-field--compact">
        <div class="e-dropdown">
          <div class="e-input e-input--centered" (click)="toggleDropdown()">
            <i class="e-icon e-icon--arrow_up-bold" *ngIf="showDropdown"></i>
            <i class="e-icon e-icon--arrow_down-bold" *ngIf="!showDropdown"></i>
            <input type="button" [value]="currentValue" />
          </div>
          <div class="e-dropdown__content" *ngIf="showDropdown">
            <span class="e-dropdown__item" *ngFor="let option of options" (click)="selectOption(option)">
              {{ option }}
            </span>
          </div>
        </div>
      </div>
    </span>
    <span>of 200 images</span>
  </div>
  <div class="e-pagination__choosing-page">
    <div class="e-pagination__arrow" *ngIf="leftArrow()" (click)="prev()">
      <i class="e-icon e-icon--arrow_long_left e-icon--xs"></i>
    </div>
    <div
      *ngFor="let firstNum of firstNums"
      class="e-pagination__number"
      [ngClass]="{ 'e-pagination__number--active': activeNumber(firstNum) }"
      id="element-{{ firstNum }}"
      (click)="chooseNumber($event)"
    >
      {{ firstNum }}
    </div>
    <div class="e-pagination__dots" *ngIf="paginationDotsLeft()">...</div>
    <div
      class="e-pagination__number"
      *ngFor="let centerNum of centerNums"
      [ngClass]="{ 'e-pagination__number--active': activeNumber(centerNum) }"
      id="element-{{ centerNum }}"
      (click)="chooseNumber($event)"
    >
      {{ centerNum }}
    </div>
    <div class="e-pagination__dots" *ngIf="paginationDotsRight()">...</div>
    <div
      class="e-pagination__number"
      *ngFor="let lastNum of lastNums"
      [ngClass]="{ 'e-pagination__number--active': activeNumber(lastNum) }"
      id="element-{{ lastNum }}"
      (click)="chooseNumber($event)"
    >
      {{ lastNum }}
    </div>
    <div class="e-pagination__arrow" *ngIf="rightArrow()" (click)="next()">
      <i class="e-icon e-icon--arrow_long e-icon--xs"></i>
    </div>
  </div>
</div>
`;

  exampleInTS = `allNums: number[] = Array.from(Array(29), (_, i) => i + 1);
firstNums: number[] = [];
centerNums: number[] = [];
lastNums: number[] = [];
chosenNum = 1;
showDropdown = false;
currentValue = '10';
options = [
  '10',
  '20',
  '30',
  '40',
  '50',
  'Alle',
];

ngOnInit(): void {
  this.getVisibleNumbers();
}

toggleDropdown(): void {
  this.showDropdown = !this.showDropdown;
}

selectOption(value: string): void {
// this solution is only to illustrate how the pagination should appear visually
switch (value) {
  case '10':
    this.allNums = Array.from(Array(30), (_, i) => i + 1);
    this.getVisibleNumbers();
    break;
  case '20':
    this.allNums = Array.from(Array(15), (_, i) => i + 1);
    this.getVisibleNumbers();

    break;
  case '30':
    this.allNums = Array.from(Array(12), (_, i) => i + 1);
    this.getVisibleNumbers();
    break;
  case '40':
    this.allNums = Array.from(Array(8), (_, i) => i + 1);
    this.getVisibleNumbers();
    break;
  case '50':
    this.allNums = Array.from(Array(6), (_, i) => i + 1);
    this.getVisibleNumbers();
    break;
  case 'Alle':
    this.showAll = true;
    break;
}

if (value !== 'Alle') {
  this.showAll = false;
}
  this.currentValue = value;
  this.showDropdown = false;
}

getVisibleNumbers(): void {
  this.firstNums = [];
  this.lastNums = [];
  this.centerNums = [];

  if (this.chosenNum < 6) {
    this.firstNums = this.allNums.slice(0, 6);
  } else {
    this.firstNums = this.allNums.slice(0, 1);
  }

  if (this.chosenNum > this.allNums.length - 5) {
    this.lastNums = this.allNums.slice(this.allNums.length - 6, this.allNums.length);
  } else {
    this.lastNums = this.allNums.slice(this.allNums.length - 1, this.allNums.length);
  }

  if (this.chosenNum > 5 && this.chosenNum < this.allNums.length - 4) {
    this.centerNums = this.allNums.slice(this.allNums[this.chosenNum - 4], this.allNums[this.chosenNum + 1]);
  }
}

activeNumber(chosen: number): boolean {
  return this.chosenNum === chosen;
}

chooseNumber(event?: MouseEvent): void {
  const element = event.target as HTMLElement;
  if (!element.classList.contains('e-pagination__number--active')) {
    this.chosenNum = parseInt(element.innerText, 10);
    this.getVisibleNumbers();
  }
}

next(): void {
  this.chosenNum += 1;
  this.getVisibleNumbers();
}

prev(): void {
  this.chosenNum -= 1;
  this.getVisibleNumbers();
}

leftArrow(): boolean {
  return this.chosenNum > 1;
}

rightArrow(): boolean {
  return this.chosenNum < this.allNums.length;
}

paginationDotsLeft(): boolean {
  return this.chosenNum > 0;
}
paginationDotsRight(): boolean {
  return this.chosenNum > 3 && this.chosenNum < (this.allNums.length - 2);
}
`;

  allNums: number[] = Array.from(Array(29), (_, i) => i + 1);
  firstNums: number[] = [];
  centerNums: number[] = [];
  lastNums: number[] = [];
  chosenNum = 1;
  showDropdown = false;
  currentValue = '10';
  showAll = false;
  options = ['10', '20', '30', '40', '50', 'Alle'];

  ngOnInit(): void {
    this.getVisibleNumbers();
  }

  toggleDropdown(): void {
    this.showDropdown = !this.showDropdown;
  }

  selectOption(value: string): void {
    switch (value) {
      case '10':
        this.allNums = Array.from(Array(30), (_, i) => i + 1);
        this.getVisibleNumbers();
        break;
      case '20':
        this.allNums = Array.from(Array(15), (_, i) => i + 1);
        this.getVisibleNumbers();

        break;
      case '30':
        this.allNums = Array.from(Array(12), (_, i) => i + 1);
        this.getVisibleNumbers();
        break;
      case '40':
        this.allNums = Array.from(Array(8), (_, i) => i + 1);
        this.getVisibleNumbers();
        break;
      case '50':
        this.allNums = Array.from(Array(6), (_, i) => i + 1);
        this.getVisibleNumbers();
        break;
      case 'Alle':
        this.showAll = true;
        break;
    }

    if (value !== 'Alle') {
      this.showAll = false;
    }
    this.currentValue = value;
    this.showDropdown = false;
  }

  getVisibleNumbers(): void {
    this.firstNums = [];
    this.lastNums = [];
    this.centerNums = [];

    if (this.chosenNum < 6) {
      this.firstNums = this.allNums.slice(0, 6);
    } else {
      this.firstNums = this.allNums.slice(0, 1);
    }

    if (this.chosenNum > this.allNums.length - 5) {
      this.lastNums = this.allNums.slice(this.allNums.length - 6, this.allNums.length);
    } else {
      this.lastNums = this.allNums.slice(this.allNums.length - 1, this.allNums.length);
    }

    if (this.chosenNum > 5 && this.chosenNum < this.allNums.length - 4) {
      this.centerNums = this.allNums.slice(
        this.allNums[this.chosenNum - 4],
        this.allNums[this.chosenNum + 1],
      );
    }
  }

  activeNumber(chosen: number): boolean {
    return this.chosenNum === chosen;
  }

  chooseNumber(event?: MouseEvent): void {
    const element = event.target as HTMLElement;
    if (!element.classList.contains('e-pagination__number--active')) {
      this.chosenNum = parseInt(element.innerText, 10);
      this.getVisibleNumbers();
    }
  }

  next(): void {
    this.chosenNum += 1;
    this.getVisibleNumbers();
  }

  prev(): void {
    this.chosenNum -= 1;
    this.getVisibleNumbers();
  }

  leftArrow(): boolean {
    return this.chosenNum > 1;
  }

  rightArrow(): boolean {
    return this.chosenNum < this.allNums.length;
  }

  paginationDotsLeft(): boolean {
    return this.chosenNum > 0;
  }
  paginationDotsRight(): boolean {
    return this.chosenNum > 5 && this.chosenNum < this.allNums.length - 4;
  }
}
