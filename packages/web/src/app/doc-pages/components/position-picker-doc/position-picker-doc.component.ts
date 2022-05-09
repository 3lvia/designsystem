import { Component, ViewChild, ElementRef } from '@angular/core';
import { getComponent } from 'src/app/shared/doc-pages';

@Component({
  selector: 'app-position-picker-doc',
  templateUrl: './position-picker-doc.component.html',
  styleUrls: ['./position-picker-doc.component.scss'],
})
export class PositionPickerDocComponent {
  @ViewChild('mapModal') mapModal: ElementRef;
  @ViewChild('exampleSearch') exampleSearch: ElementRef;
  @ViewChild('exampleInput') exampleInput: ElementRef;
  showPosition = false;

  figmaUrl = getComponent('position-picker').figmaUrl;
  description = getComponent('position-picker').description;
  isExampleInput = false;

  exampleOverview = ` <div class="e-position-picker" style="width: 300px">
  <div class="e-position-picker__icon" *ngIf="!showPosition">
    <span class="e-btn__icon"><i class="e-icon e-icon--map_pin-color e-icon--lg"  aria-hidden="true"></i></span>
  </div>
  <div class="e-position-picker__action">
    <button class="e-btn e-btn--tertiary">
      <span class="e-btn__icon"><i class="e-icon e-icon--add_circle"  aria-hidden="true"></i></span>
      <span class="e-btn__title">Add position</span>
    </button>
  </div>
</div>
`;

  example1 = `<div class="e-position-picker">
  <div class="e-position-picker__icon">
    <span class="e-btn__icon"><i class="e-icon e-icon--map_pin-color e-icon--lg"  aria-hidden="true"></i></span>
  </div>
  <div class="e-position-picker__action">
    <button class="e-btn e-btn--tertiary">
      <span class="e-btn__icon"><i class="e-icon e-icon--add_circle"  aria-hidden="true"></i></span>
      <span class="e-btn__title">Add position</span>
    </button>
  </div>
</div>
`;
}
