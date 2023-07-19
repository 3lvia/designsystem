import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ToastDocComponent } from './toast-doc.component';
import { ToastCegComponent } from './toast-ceg/toast-ceg.component';
import { SharedDocumentationModule } from 'src/app/shared/component-documentation/shared-component-documentation.module';

@NgModule({
  imports: [SharedDocumentationModule],
  declarations: [ToastDocComponent, ToastCegComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ToastDocModule {}
