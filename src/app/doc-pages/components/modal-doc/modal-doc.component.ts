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

  </div>
</div>
  `;

  constructor() { }

  ngOnInit() {
  }

}
