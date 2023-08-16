import { Component } from '@angular/core';
import { toastData } from './toast-data';
import { configurationProps } from './toast-configuration-props';

@Component({
  selector: 'app-toast-doc',
  templateUrl: './toast-doc.component.html',
  styleUrls: ['./toast-doc.component.scss'],
})
export class ToastDocComponent {
  componentData = toastData;
  toastConfigurationProps = configurationProps;

  does = ['Confirmation message after an user action', 'Notification message'];
  donts = ['Error messages'];
}
