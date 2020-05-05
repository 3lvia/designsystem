import { Component, OnInit } from '@angular/core';
import { getComponent } from 'src/app/shared/e-items';

@Component({
  selector: 'app-modal-doc',
  templateUrl: './modal-doc.component.html',
  styleUrls: ['./modal-doc.component.scss']
})
export class ModalDocComponent implements OnInit {

  externalUrl = getComponent('modal-doc').externalUrl;
  componentStatus = getComponent('modal-doc').status;

  example1 = `<div class="e-modal">
  <div class="e-modal__content">
    <div class="e-modal__title">
      Title
    </div>
      Content
    <button class="e-btn e-btn--secondary e-m-16">
      <span class="e-btn__title">Secondary</span>
    </button>
    <button class="e-btn e-btn--primary e-m-16">
      <span class="e-btn__title">Primary</span>
    </button>
  </div>
</div>
`;

  example2 = `<div class="e-modal">
  <div class="e-modal__content">
    <div class="e-modal__title">
      Title
    </div>
      Content
    <button class="e-btn e-btn--secondary e-m-16">
      <span class="e-btn__title">Secondary</span>
    </button>
    <button class="e-btn e-btn--primary e-btn--danger e-m-16">
      <span class="e-btn__title">Primary</span>
    </button>
  </div>
</div>
`;

  constructor() { }

  ngOnInit() {
  }

}
