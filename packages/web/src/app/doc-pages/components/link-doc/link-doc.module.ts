import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ComponentChangelogModule } from 'src/app/shared/component-documentation/component-changelog/component-changelog.module';
import { ComponentHeaderModule } from 'src/app/shared/component-documentation/component-structure/component-header/component-header.module';
import { ComponentPropertiesModule } from 'src/app/shared/component-documentation/component-properties/component-properties.module';
import { ComponentSectionModule } from 'src/app/shared/component-documentation/component-structure/component-section/component-section.module';
import { ComponentSubsectionModule } from 'src/app/shared/component-documentation/component-structure/component-subsection/component-subsection.module';
import { ComponentSubsubsectionModule } from 'src/app/shared/component-documentation/component-structure/component-subsubsection/component-subsubsection.module';
import { CopyModule } from 'src/app/shared/copy/copy.module';
import { DoDontModule } from 'src/app/shared/do-dont/do-dont.module';
import { DoDontTextModule } from 'src/app/shared/do-dont-text/do-dont-text.module';
import { LinkDocComponent } from './link-doc.component';
import { WhenToUseModule } from 'src/app/shared/when-to-use/when-to-use.module';
import { CegModule } from 'src/app/shared/component-documentation/ceg/ceg.module';
import { LinkCegComponent } from './link-ceg/link-ceg.component';
import { LinkActionCegComponent } from './link-action-ceg/link-action-ceg.component';
import { LinkInlineCegComponent } from './link-inline-ceg/link-inline-ceg.component';
import { LinkNewTabCegComponent } from './link-new-tab-ceg/link-new-tab-ceg.component';
import { LinkBackCegComponent } from './link-back-ceg/link-back-ceg.component';
import { LinkAsBtnCegComponent } from './link-as-btn-ceg/link-as-btn-ceg.component';
import { LinkSizesCegComponent } from './link-sizes-ceg/link-sizes-ceg.component';

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
  imports: [
    CommonModule,
    ComponentHeaderModule,
    WhenToUseModule,
    DoDontTextModule,
    DoDontModule,
    ComponentPropertiesModule,
    ComponentSectionModule,
    ComponentSubsectionModule,
    ComponentSubsubsectionModule,
    CopyModule,
    RouterModule,
    ComponentChangelogModule,
    CegModule,
  ],
})
export class LinkDocModule {}
