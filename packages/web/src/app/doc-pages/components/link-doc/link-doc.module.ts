import { NgModule } from '@angular/core';
import { DoDontTextModule } from 'src/app/shared/do-dont-text/do-dont-text.module';
import { LinkDocComponent } from './link-doc.component';
import { LinkCegComponent } from './link-ceg/link-ceg.component';
import { LinkActionCegComponent } from './link-action-ceg/link-action-ceg.component';
import { LinkInlineCegComponent } from './link-inline-ceg/link-inline-ceg.component';
import { LinkNewTabCegComponent } from './link-new-tab-ceg/link-new-tab-ceg.component';
import { LinkBackCegComponent } from './link-back-ceg/link-back-ceg.component';
import { LinkAsBtnCegComponent } from './link-as-btn-ceg/link-as-btn-ceg.component';
import { LinkSizesCegComponent } from './link-sizes-ceg/link-sizes-ceg.component';
import { SharedDocumentationModule } from 'src/app/shared/component-documentation/shared-component-documentation.module';

@NgModule({
  declarations: [
    LinkDocComponent,
    LinkCegComponent,
    LinkActionCegComponent,
    LinkInlineCegComponent,
    LinkNewTabCegComponent,
    LinkBackCegComponent,
    LinkAsBtnCegComponent,
    LinkSizesCegComponent,
  ],
  imports: [DoDontTextModule, SharedDocumentationModule],
})
export class LinkDocModule {}
