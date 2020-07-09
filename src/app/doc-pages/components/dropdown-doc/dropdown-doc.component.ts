import { Component } from '@angular/core';
import { getComponent } from 'src/app/shared/e-items';

@Component({
  selector: 'app-dropdown-doc',
  templateUrl: './dropdown-doc.component.html',
  styleUrls: ['./dropdown-doc.component.scss'],
})
export class DropdownDocComponent {

  figmaUrl = getComponent('dropdown-doc').figmaUrl;
  headerDoes = ['Use sparingly: use dropdowns only when the user have 5-10 options and you have limited space to display it all open.'];
  headerDonts = [
    'Fewer than 5 options',
    'More than 15 options',
  ];

  example1 = `<div style="height:350px">
  <div class="e-form-field">
  <label class="e-form-field__label">Label</label>
  <div class="e-input e-input-xxs-icon">
    <i class="e-icon e-icon--arrow_up-bold e-icon--xxs"></i>
    <input type="buttton" placeholder="Placeholder text" value="Velg Alternativ"/>
    </div>
          <div class="e-dropdown">
      <span class="e-dropdown__item">Alternativ 1</span>
      <span class="e-dropdown__item">Alternativ 2</span>
      <span class="e-dropdown__item">Alternativ 3</span>
      <span class="e-dropdown__item">Alternativ 4</span>
      <span class="e-dropdown__item">Alternativ 5</span>
    </div>
  </div>
</div>
`;

  example2 = `<div style="height:300px; width:240px">
  <div class="e-form-field e-form-field--compact">
  <label class="e-form-field__label">Label</label>
  <div class="e-input e-input-xxs-icon">
    <i class="e-icon e-icon--arrow_up-bold e-icon--xxs"></i>
    <input type="buttton" placeholder="Placeholder text" value="Velg alternativ"/>
    </div>
      <div class="e-dropdown e-dropdown--compact">
        <span class="e-dropdown__item">Alternativ 1</span>
        <span class="e-dropdown__item">Alternativ 2</span>
        <span class="e-dropdown__item">Alternativ 3</span>
        <span class="e-dropdown__item">Alternativ 4</span>
        <span class="e-dropdown__item">Alternativ 5</span>
      </div>
  </div>
</div>
`;

  exampleInHTML = `<div class="e-form-field">
  <label class="e-form-field__label">Label</label>
  <div class="e-input e-input-xxs-icon" (click)="toggleDropdown()">
    <i class="e-icon e-icon--arrow_up-bold e-icon--xxs" *ngIf="showDropdown"></i>
    <i class="e-icon e-icon--arrow_down-bold e-icon--xxs" *ngIf="!showDropdown"></i>
    <input type="button" placeholder="Placeholder text" [value]="currentValue" />
  </div>
  <div class="e-dropdown" *ngIf="showDropdown">
    <span class="e-dropdown__item" *ngFor="let option of options" (click)="selectOption(option)">
      {{ option }}
    </span>
  </div>
</div>`;

  exampleInTS = `showDropdown = false;
currentValue = 'Velg alternativ';
options = [
  'Alternativ 1',
  'Alternativ 2',
  'Alternativ 3',
  'Alternativ 4',
  'Alternativ 5',
];

toggleDropdown() {
  this.showDropdown = !this.showDropdown;
}

selectOption(value: string): void {
  this.currentValue = value;
  this.showDropdown = false;
}`;

  // Live example
  showDropdown = false;
  currentValue = 'Velg alternativ';
  options = [
    'Alternativ 1',
    'Alternativ 2',
    'Alternativ 3',
    'Alternativ 4',
    'Alternativ 5',
  ];

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  selectOption(value: string): void {
    this.currentValue = value;
    this.showDropdown = false;
  }

}
