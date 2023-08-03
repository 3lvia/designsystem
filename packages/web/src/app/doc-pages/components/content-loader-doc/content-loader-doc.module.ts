import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ComponentChangelogModule } from 'src/app/shared/component-documentation/component-changelog/component-changelog.module';
import { ComponentHeaderModule } from 'src/app/shared/component-documentation/component-structure/component-header/component-header.module';
import { ComponentPropertiesModule } from 'src/app/shared/component-documentation/component-properties/component-properties.module';
import { ComponentSectionModule } from 'src/app/shared/component-documentation/component-structure/component-section/component-section.module';
import { ComponentSubsectionModule } from 'src/app/shared/component-documentation/component-structure/component-subsection/component-subsection.module';
import { ContentLoaderDocComponent } from './content-loader-doc.component';
import { CegModule } from 'src/app/shared/component-documentation/ceg/ceg.module';
import { ContentLoaderCegComponent } from './content-loader-ceg/content-loader-ceg.component';
import { ContentLoaderBoxCegComponent } from './content-loader-box-ceg/content-loader-box-ceg.component';
import { ContentLoaderCircleCegComponent } from './content-loader-circle-ceg/content-loader-circle-ceg.component';
import { ContentLoaderTextCegComponent } from './content-loader-text-ceg/content-loader-text-ceg.component';
import { SharedDocumentationModule } from 'src/app/shared/component-documentation/shared-component-documentation.module';

@NgModule({
  declarations: [
    ContentLoaderDocComponent,
    ContentLoaderCegComponent,
    ContentLoaderBoxCegComponent,
    ContentLoaderCircleCegComponent,
    ContentLoaderTextCegComponent,
  ],
  imports: [
    CommonModule,
    ComponentHeaderModule,
    RouterModule,
    ComponentPropertiesModule,
    ComponentSectionModule,
    ComponentSubsectionModule,
    ComponentChangelogModule,
    CegModule,
    SharedDocumentationModule,
  ],
})
export class ContentLoaderDocModule {}
