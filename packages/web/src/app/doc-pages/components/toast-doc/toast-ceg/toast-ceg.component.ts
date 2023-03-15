import { Component } from '@angular/core';
import { openElviaToast } from '@elvia/elvis-toast';

@Component({
  selector: 'app-toast-ceg',
  templateUrl: './toast-ceg.component.html',
  styleUrls: ['./toast-ceg.component.scss'],
})
export class ToastCegComponent {
  status: 'informative' | 'positive' = 'positive';
  closable = false;
  title = 'Short title';
  body = 'A successful confirmation message.';
  popoverIsOpen = false;

  exampleInHTML = `<!-- Place this element at the root of your app -->
<elvia-toast></elvia-toast>
  
<!-- Then trigger the toast e.g. from a button -->
<button class="e-btn" (click)="showToast()">
  Show example toast
</button>
`;

  get exampleInTS() {
    return `import { openElviaToast } from '@elvia/elvis-toast';

showToast() {
  openElviaToast({
    title: '${this.title}',
    body: '${this.body}',
    duration: 5000,
    closable: ${this.closable},
    status: '${this.status}'
  });
}`;
  }

  showToast() {
    openElviaToast({
      title: this.title,
      body: this.body,
      duration: 5000,
      closable: this.closable,
      status: this.status,
    });
  }

  resetText() {
    this.title = 'Short title';
    this.body = 'A successful confirmation message.';
  }
}
