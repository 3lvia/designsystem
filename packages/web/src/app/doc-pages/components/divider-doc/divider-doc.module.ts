import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import '@elvia/elvis-divider';
import { DividerDocComponent } from './divider-doc.component';
import { DividerCegComponent } from './divider-ceg/divider-ceg.component';
import { SharedDocumentationModule } from 'src/app/shared/component-documentation/shared-component-documentation.module';

@NgModule({
    imports: [SharedDocumentationModule, DividerDocComponent, DividerCegComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DividerDocModule {}
