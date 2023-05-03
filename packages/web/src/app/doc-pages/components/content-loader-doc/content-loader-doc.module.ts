import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ComponentChangelogModule } from 'src/app/shared/component-documentation/component-changelog/component-changelog.module';
import { ComponentExampleCodeModule } from 'src/app/shared/component-documentation/component-example/component-example-code/component-example-code.module';
import { ComponentExampleV1Module } from 'src/app/shared/component-documentation/component-example/component-example-v1/component-example-v1.module';
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
    ComponentExampleV1Module,
    RouterModule,
    ComponentExampleCodeModule,
    ComponentPropertiesModule,
    ComponentSectionModule,
    ComponentSubsectionModule,
    ComponentChangelogModule,
    CegModule,
  ],
})
export class ContentLoaderDocModule {}
