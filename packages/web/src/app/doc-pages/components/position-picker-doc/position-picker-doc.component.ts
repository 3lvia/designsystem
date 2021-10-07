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

  exampleOverview = `<div class="e-position-picker" style="width: 380px;">
  <div class="e-position-picker__icon" *ngIf="!showPosition">
    <span class="e-btn__icon"><i class="e-icon e-icon--map_pin-color e-icon--lg"></i></span>
  </div>
  <div class="e-position-picker__action">
    <button class="e-btn e-btn--tertiary" (click)="openMapExample('mapModal')">
      <span class="e-btn__icon"><i class="e-icon e-icon--add_circle"></i></span>
      <span class="e-btn__title">Choose position</span>
    </button>
  </div>
</div>
<div class="e-modal e-none" #mapModal>
  <div class="e-modal__content">
    <button class="e-btn e-btn--icon" (click)="closeModal('mapModal')" id="examplebutton">
      <span class="e-btn__icon"><i class="e-icon e-icon--remove_circle-color"></i></span>
    </button>
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d7998.985919234493!2d10.685827403470268!3d59.9197547324057!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sno!4v1589372574967!5m2!1sen!2sno"
      width="600"
      height="450"
      frameborder="0"
      style="border: 0;"
      allowfullscreen=""
      aria-hidden="false"
      tabindex="0"
    ></iframe>
    <div class="e-form-field" id="exampleInput">
      <div class="e-input">
        <input id="normal" type="text" placeholder="Choose Address" />
        <i class="e-icon e-icon--search e-icon--xs"></i>
      </div>
    </div>
  </div>
</div>
`;

  example1 = `<div class="e-position-picker">
  <div class="e-position-picker__icon">
    <span class="e-btn__icon"><i class="e-icon e-icon--map_pin-color e-icon--lg"></i></span>
  </div>
  <div class="e-position-picker__action">
    <button class="e-btn e-btn--tertiary">
      <span class="e-btn__icon"><i class="e-icon e-icon--add_circle"></i></span>
      <span class="e-btn__title">Choose position</span>
    </button>
  </div>
</div>
`;

  exampleHTMLCode = `<div class="e-position-picker" style="width: 300px">
<div
  class="e-position-picker__icon"
  *ngIf="!showPosition"
>
  <span class="e-btn__icon"><i class="e-icon e-icon--map_pin-color e-icon--lg"></i></span>
</div>
<div class="e-position-picker__action">
  <button
    class="e-btn e-btn--tertiary"
    (click)="openMapExample('mapModal')"
  >
    <span class="e-btn__icon"><i class="e-icon e-icon--add_circle"></i></span>
    <span class="e-btn__title">Choose position</span>
  </button>
</div>
</div>
<div
class="e-modal e-none"
#mapModal
>
<div class="e-modal__content">
  <button
    class="e-btn e-btn--icon"
    (click)="closeModal('mapModal')"
    id="examplebutton"
  >
    <span class="e-btn__icon"><i class="e-icon e-icon--remove_circle-color"></i></span>
  </button>
  <iframe
    src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d7998.985919234493!2d10.685827403470268!3d59.9197547324057!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sno!4v1589372574967!5m2!1sen!2sno"
    width="600"
    height="450"
    frameborder="0"
    style="border: 0"
    allowfullscreen=""
    aria-hidden="false"
    tabindex="0"
  ></iframe>
  <div
    class="e-form-field"
    id="exampleInput"
  >
    <div
      class="e-search e-search--instant"
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
        class="e-btn e-btn--icon"
        (click)="clearExample()"
      >
        <span class="e-btn__icon"><i class="e-icon e-icon--close-bold"></i></span>
      </button>
    </div>
  </div>
</div>
</div>
`;
}
