import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ContextMenuDocComponent } from './context-menu-doc.component';
import { ContextMenuCegComponent } from './context-menu-ceg/context-menu-ceg.component';
import { ContextMenuHeadingsCegComponent } from './context-menu-headings-ceg/context-menu-headings-ceg.component';
import { ContextMenuIconsCegComponent } from './context-menu-icons-ceg/context-menu-icons-ceg.component';
import { ContextMenuSelectableCegComponent } from './context-menu-selectable-ceg/context-menu-selectable-ceg.component';
import { ContextMenuDisabledCegComponent } from './context-menu-disabled-ceg/context-menu-disabled-ceg.component';
import '@elvia/elvis-context-menu';
import { SharedDocumentationModule } from 'src/app/shared/component-documentation/shared-component-documentation.module';

@NgModule({
  imports: [SharedDocumentationModule],
  declarations: [
    ContextMenuDocComponent,
    ContextMenuCegComponent,
    ContextMenuHeadingsCegComponent,
    ContextMenuIconsCegComponent,
    ContextMenuSelectableCegComponent,
    ContextMenuDisabledCegComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ContextMenuDocModule {}
