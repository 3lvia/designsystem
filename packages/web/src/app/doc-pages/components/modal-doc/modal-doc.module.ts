import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import '@elvia/elvis-modal';
import '@elvia/elvis-carousel';
import { ModalDocComponent } from './modal-doc.component';
import { ModalCegComponent } from './modal-ceg/modal-ceg.component';
import { ModalMultiplePagesCegComponent } from './modal-multiple-pages-ceg/modal-multiple-pages-ceg.component';
import { SharedDocumentationModule } from 'src/app/shared/component-documentation/shared-component-documentation.module';
import { ModalInitialFocusCegComponent } from './modal-initial-focus-ceg/modal-initial-focus-ceg.component';

@NgModule({
  imports: [SharedDocumentationModule],
  declarations: [
    ModalDocComponent,
    ModalCegComponent,
    ModalMultiplePagesCegComponent,
    ModalInitialFocusCegComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ModalDocModule {}
