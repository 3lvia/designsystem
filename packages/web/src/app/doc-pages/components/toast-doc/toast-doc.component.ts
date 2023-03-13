import { Component } from '@angular/core';
import { getComponent } from 'src/app/shared/doc-pages';
import { toastData } from './toast-data';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-toast-doc',
  templateUrl: './toast-doc.component.html',
})
export class ToastDocComponent {
  componentData = toastData;
  figmaUrl = getComponent('toast').figmaUrl;
  description = getComponent('toast').description;
  title = getComponent('toast').title;

  constructor(private titleService: Title) {
    this.titleService.setTitle(this.title + ' | Elvia design system');
  }

  does = ['Confirmation message after an user action', 'Notification message'];
  donts = ['Error messages'];
}
