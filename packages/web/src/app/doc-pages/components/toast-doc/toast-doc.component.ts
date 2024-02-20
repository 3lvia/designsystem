import { Component } from '@angular/core';
import { toastData } from './toast-data';
import { configurationProps } from './toast-configuration-props';
import { ComponentPropertiesTableComponent } from '../../../shared/component-documentation/component-properties-table/component-properties-table.component';
import { RouterLink } from '@angular/router';
import { WhenToUseComponent } from '../../../shared/when-to-use/when-to-use.component';
import { ComponentSectionComponent } from '../../../shared/component-documentation/component-structure/component-section/component-section.component';
import { ToastCegComponent } from './toast-ceg/toast-ceg.component';
import { CegComponent } from '../../../shared/component-documentation/ceg/ceg.component';
import { ComponentDocumentationComponent } from '../../../shared/component-documentation/component-documentation.component';

@Component({
  selector: 'app-toast-doc',
  templateUrl: './toast-doc.component.html',
  styleUrls: ['./toast-doc.component.scss'],
  standalone: true,
  imports: [
    ComponentDocumentationComponent,
    CegComponent,
    ToastCegComponent,
    ComponentSectionComponent,
    WhenToUseComponent,
    RouterLink,
    ComponentPropertiesTableComponent,
  ],
})
export class ToastDocComponent {
  componentData = toastData;
  toastConfigurationProps = configurationProps;

  does = ['Confirmation message after an user action', 'Notification message'];
  donts = ['Error messages'];
}
