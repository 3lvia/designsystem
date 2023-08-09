import { Component } from '@angular/core';
import { getComponent } from 'src/app/shared/doc-pages';
import { toastData } from './toast-data';
import { configurationProps } from './toast-configuration-props';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-toast-doc',
  templateUrl: './toast-doc.component.html',
  styleUrls: ['./toast-doc.component.scss'],
})
export class ToastDocComponent {
  componentData = toastData;
  toastConfigurationProps = configurationProps;
  title = getComponent('toast')?.title;

  constructor(private titleService: Title) {
    this.titleService.setTitle(this.title + ' | Elvia design system');
  }

  does = ['Confirmation message after an user action', 'Notification message'];
  donts = ['Error messages'];
}
