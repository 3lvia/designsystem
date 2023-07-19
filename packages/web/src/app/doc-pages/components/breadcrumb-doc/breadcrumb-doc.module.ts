import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BreadcrumbDocComponent } from './breadcrumb-doc.component';
import { BreadcrumbCegComponent } from './breadcrumb-ceg/breadcrumb-ceg.component';
import { BreadcrumbEventCegComponent } from './breadcrumb-event-ceg/breadcrumb-event-ceg.component';
import { SharedDocumentationModule } from 'src/app/shared/component-documentation/shared-component-documentation.module';
import '@elvia/elvis-breadcrumb';

@NgModule({
  imports: [SharedDocumentationModule],
  declarations: [BreadcrumbDocComponent, BreadcrumbCegComponent, BreadcrumbEventCegComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BreadcrumbDocModule {}
