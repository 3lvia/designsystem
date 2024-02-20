import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { HeaderDocComponent } from './header-doc.component';
import { HeaderCegComponent } from './header-ceg/header-ceg.component';
import { SharedDocumentationModule } from 'src/app/shared/component-documentation/shared-component-documentation.module';
import '@elvia/elvis-header';

@NgModule({
    imports: [SharedDocumentationModule, HeaderDocComponent, HeaderCegComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HeaderDocModule {}
