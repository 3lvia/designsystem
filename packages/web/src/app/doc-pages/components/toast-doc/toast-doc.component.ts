import { Component } from '@angular/core';
import { getComponent } from 'src/app/shared/doc-pages';
import { toastData } from './toast-data';
import { configurationProps } from './toast-configuration-props';
import { Title } from '@angular/platform-browser';
import { openElviaToast } from '@elvia/elvis-toast';

@Component({
  selector: 'app-toast-doc',
  templateUrl: './toast-doc.component.html',
  styleUrls: ['./toast-doc.component.scss'],
})
export class ToastDocComponent {
  componentData = toastData;
  toastConfigurationProps = configurationProps;
  figmaUrl = getComponent('toast').figmaUrl;
  description = getComponent('toast').description;
  title = getComponent('toast').title;

  constructor(private titleService: Title) {
    this.titleService.setTitle(this.title + ' | Elvia design system');
  }

  does = ['Confirmation message after an user action', 'Notification message'];
  donts = ['Error messages'];

  exampleInHTML = `<!-- Place this element at the root of your app -->
<elvia-toast></elvia-toast>
  
<!-- Then trigger the toast e.g. from a button -->
<button class="e-btn" (click)="showToast()">
  Show example toast
</button>
`;

  exampleInTS = `import { openElviaToast } from '@elvia/elvis-toast';

showToast() {
  openElviaToast({
    title: 'Short title',
    body: 'A successful confirmation message.',
    duration: 5000,
    closable: true,
  });
}
`;

  showToast() {
    openElviaToast({
      title: 'Short title',
      body: 'A successful confirmation message.',
      duration: 5000,
      closable: true,
    });
  }
}
