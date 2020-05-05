import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { getComponent } from 'src/app/shared/e-items';

@Component({
  selector: 'app-modal-doc',
  templateUrl: './modal-doc.component.html',
  styleUrls: ['./modal-doc.component.scss']
})
export class ModalDocComponent implements OnInit {

  @ViewChild('modal1') modal1: ElementRef;
  @ViewChild('modal2') modal2: ElementRef;
  @ViewChild('modal1') modal3: ElementRef;

  externalUrl = getComponent('modal-doc').externalUrl;
  componentStatus = getComponent('modal-doc').status;

//   example1 = `<button class="e-btn" onclick="openModal('modal1')">Open modal</button>
// <div class="e-modal" #modal1>
//   <div class="e-modal__content">
//     <div class="e-modal__title">
//       Title of content comes here
//     </div>
//     <div class="e-modal__text">
//     Body text comes here and can go over several lines. It looks like this and when it is two.
//     </div>
//     <div class="e-modal__actions">
//       <button class="e-btn e-btn--secondary">
//         <span class="e-btn__title">Secondary</span>
//       </button>
//       <button class="e-btn e-btn--primary">
//         <span class="e-btn__title">Primary</span>
//       </button>
//     </div>
//   </div>
// </div>
// `;

//   example2 = `<button class="e-btn" onclick="openModal('modal2')">Open modal</button>
// <div class="e-modal" #modal2>
//   <div class="e-modal__content">
//     <div class="e-modal__title">
//       Title of content comes here
//     </div>
//       Body text comes here and can go over several lines. It looks like this and when it is two.
//     <button class="e-btn e-btn--secondary">
//       <span class="e-btn__title">Secondary</span>
//     </button>
//     <button class="e-btn e-btn--primary e-btn--danger">
//       <span class="e-btn__title">Primary</span>
//     </button>
//   </div>
// </div>
// `;

  constructor() { }

  ngOnInit() {
  }

  openModal(modal: string) {
    console.log(modal);
    if (modal === 'modal1') {
      this.modal1.nativeElement.classList.add('e-modal---visible');
    }
    if (modal === 'modal2') {
      this.modal2.nativeElement.classList.add('e-modal---visible');
    }
    if (modal === 'modal3') {
      this.modal3.nativeElement.classList.add('e-modal---visible');
    }
  }

}
