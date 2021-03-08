import { Component } from '@angular/core';
import { getComponent } from 'src/app/shared/e-items';
import { dropdownData } from './dropdown-data';
import { exampleContents } from 'src/app/shared/example-contents';

@Component({
  selector: 'app-dropdown-doc',
  templateUrl: './dropdown-doc.component.html',
  styleUrls: ['./dropdown-doc.component.scss'],
})
export class DropdownDocComponent {
  exampleContents = exampleContents;
  componentData = dropdownData;
  does = dropdownData.does;
  donts = dropdownData.donts;
  figmaUrl = getComponent('dropdown').figmaUrl;
  description = getComponent('dropdown').description;

  exampleOptions = [
    {
      value: 'norge',
      label: 'Norge',
    },
    {
      value: 'sverige',
      label: 'Sverige',
    },
    {
      value: 'danmark',
      label: 'Danmark',
    },
    {
      value: 'finland',
      label: 'Finland',
    },
    {
      value: 'island',
      label: 'Island',
    },
  ];

  // Commented out earlier solution with own style

  // headerDoes = [
  //   'Use sparingly: use dropdowns only when the user have 5-10 options and you have limited space to display it all open.',
  // ];
  // headerDonts = ['Fewer than 5 options', 'More than 15 options'];

  //   example1 = `<div style="height:350px">
  //   <div class="e-form-field">
  //     <label class="e-form-field__label">Label</label>
  //     <div class="e-dropdown">
  //       <div class="e-input">
  //         <i class="e-icon e-icon--arrow_up-bold"></i>
  //         <input type="button" class="e-input--placeholder" value="Velg Alternativ"/>
  //       </div>
  //       <div class="e-dropdown__content">
  //         <span class="e-dropdown__item">Alternativ 1</span>
  //         <span class="e-dropdown__item">Alternativ 2</span>
  //         <span class="e-dropdown__item">Alternativ 3</span>
  //         <span class="e-dropdown__item">Alternativ 4</span>
  //         <span class="e-dropdown__item">Alternativ 5</span>
  //       </div>
  //     </div>
  //   </div>
  // </div>
  // `;

  //   example2 = `<div style="height:200px; width:240px">
  //   <div class="e-form-field e-form-field--compact">
  //     <label class="e-form-field__label">Label</label>
  //     <div class="e-dropdown">
  //       <div class="e-input">
  //         <i class="e-icon e-icon--arrow_up-bold"></i>
  //         <input type="button" class="e-input--placeholder" value="Velg Alternativ"/>
  //       </div>
  //       <div class="e-dropdown__content">
  //         <span class="e-dropdown__item">Alternativ 1</span>
  //         <span class="e-dropdown__item">Alternativ 2</span>
  //         <span class="e-dropdown__item">Alternativ 3</span>
  //         <span class="e-dropdown__item">Alternativ 4</span>
  //         <span class="e-dropdown__item">Alternativ 5</span>
  //       </div>
  //     </div>
  //   </div>
  // </div>
  // `;

  //   exampleInHTML = `<div class="e-form-field">
  //   <label class="e-form-field__label">Label</label>
  //   <div class="e-dropdown">
  //     <div class="e-input" (click)="toggleDropdown()">
  //       <i class="e-icon e-icon--arrow_up-bold" *ngIf="showDropdown"></i>
  //       <i class="e-icon e-icon--arrow_down-bold" *ngIf="!showDropdown"></i>
  //       <input
  //         type="button"
  //         [ngClass]="!valueChanged ? 'e-input--placeholder' : ''"
  //         [value]="currentValue"
  //       />
  //     </div>
  //     <div class="e-dropdown__content" *ngIf="showDropdown">
  //       <span class="e-dropdown__item" *ngFor="let option of options" (click)="selectOption(option)">
  //         {{ option }}
  //       </span>
  //     </div>
  //   </div>
  // </div>`;

  //   exampleInTS = `showDropdown = false;
  // currentValue = 'Velg alternativ';
  // valueChanged = false;
  // options = [
  //   'Alternativ 1',
  //   'Alternativ 2',
  //   'Alternativ 3',
  //   'Alternativ 4',
  //   'Alternativ 5',
  // ];

  // toggleDropdown(): void {
  //   this.showDropdown = !this.showDropdown;
  // }

  // selectOption(value: string): void {
  //   this.currentValue = value;
  //   this.valueChanged = true;
  //   this.showDropdown = false;
  // }`;

  // Live example
  // showDropdown = false;
  // currentValue = 'Velg alternativ';
  // valueChanged = false;
  // options = [
  //   'Alternativ 1',
  //   'Alternativ 2',
  //   'Alternativ 3',
  //   'Alternativ 4',
  //   'Alternativ 5',
  // ];

  // toggleDropdown(): void {
  //   this.showDropdown = !this.showDropdown;
  // }

  // selectOption(value: string): void {
  //   this.currentValue = value;
  //   this.valueChanged = true;
  //   this.showDropdown = false;
  // }
}
