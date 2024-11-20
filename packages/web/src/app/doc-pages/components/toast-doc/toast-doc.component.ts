import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { CegComponent } from '../../../shared/component-documentation/ceg/ceg.component';
import { ComponentDocumentationComponent } from '../../../shared/component-documentation/component-documentation.component';
import { ComponentSectionComponent } from '../../../shared/component-documentation/component-structure/component-section/component-section.component';
import { WhenToUseComponent } from '../../../shared/when-to-use/when-to-use.component';
import { ToastCegComponent } from './toast-ceg/toast-ceg.component';
import { toastData } from './toast-data';

@Component({
  selector: 'app-toast-doc',
  templateUrl: './toast-doc.component.html',
  styleUrls: ['./toast-doc.component.scss'],
  imports: [
    ComponentDocumentationComponent,
    CegComponent,
    ToastCegComponent,
    ComponentSectionComponent,
    WhenToUseComponent,
    RouterLink,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ToastDocComponent {
  componentData = toastData;

  does = ['Confirmation message after a user action', 'Notification message'];
  donts = ['Error messages'];
}
