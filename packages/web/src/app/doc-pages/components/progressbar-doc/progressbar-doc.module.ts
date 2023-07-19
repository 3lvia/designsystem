import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ProgressbarDocComponent } from './progressbar-doc.component';
import { ProgressbarCegComponent } from './progressbar-ceg/progressbar-ceg.component';
import '@elvia/elvis-progress-linear';
import { SharedDocumentationModule } from 'src/app/shared/component-documentation/shared-component-documentation.module';

@NgModule({
  imports: [SharedDocumentationModule],
  declarations: [ProgressbarDocComponent, ProgressbarCegComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProgressbarDocModule {}
