import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { getComponent } from 'src/app/shared/e-items';

@Component({
  selector: 'app-position-picker-doc',
  templateUrl: './position-picker-doc.component.html',
  styleUrls: ['./position-picker-doc.component.scss']
})
export class PositionPickerDocComponent implements OnInit {

  externalUrl = getComponent('position-picker-doc').externalUrl;
  componentStatus = getComponent('position-picker-doc').status;

  @ViewChild('mapModal') mapModal: ElementRef;

  example1Classes = ['e-position-picker', 'e-position-picker__icon', 'e-position-picker__action'];

  example1 = `<div class="e-position-picker" style="width:380px">
  <div class="e-position-picker__icon">
    <span class="e-btn__icon"><i class="e-icon e-icon--map-pin"></i></span>
  </div>
  <div class="e-position-picker__action">
    <button class="e-btn e-btn--tertiary e-btn--lg e-m-16">
      <span class="e-btn__icon"><i class="e-icon e-icon--pin"></i></span>
      <span class="e-btn__title">Velg plassering</span>
    </button>
  </div>
</div>
`;

  example2 = `<div class="e-position-picker" style="width:380px">
  <div class="e-position-picker__description">
    60.026676, 10.798887
  </div>
  <div class="e-position-picker__action">
    <button class="e-btn e-btn--tertiary e-btn--lg e-m-16">
      <span class="e-btn__icon"><i class="e-icon e-icon e-icon--pin"></i></span>
      <span class="e-btn__title">Endre plassering</span>
    </button>
  </div>
</div>
`;

  constructor() { }

  ngOnInit() {
  }

  openMapExample(modal: string) {
    if (modal === 'mapModal') {
      this.mapModal.nativeElement.classList.add('e-modal---visible');
    }
  }

  closeModal(modal: string) {
    if (modal === 'mapModal') {
      if (this.mapModal.nativeElement.classList.contains('e-modal---visible')) {
        this.mapModal.nativeElement.classList.remove('e-modal---visible');
      }
    }
  }

}
