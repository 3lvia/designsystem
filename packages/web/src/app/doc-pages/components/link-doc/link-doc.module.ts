import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinkDocComponent } from './link-doc.component';
import { ComponentHeaderModule } from 'src/app/shared/component-documentation/component-structure/component-header/component-header.module';
import { ComponentExampleV1Module } from 'src/app/shared/component-documentation/component-example/component-example-v1/component-example-v1.module';
import { DoDontModule } from 'src/app/shared/do-dont/do-dont.module';
import { ComponentPropertiesModule } from 'src/app/shared/component-documentation/component-properties/component-properties.module';
import { ComponentSectionModule } from 'src/app/shared/component-documentation/component-structure/component-section/component-section.module';
import { ComponentSubsectionModule } from 'src/app/shared/component-documentation/component-structure/component-subsection/component-subsection.module';
import { ComponentSubsubsectionModule } from 'src/app/shared/component-documentation/component-structure/component-subsubsection/component-subsubsection.module';
import { WhenToUseModule } from 'src/app/shared/when-to-use/when-to-use.module';
import { DoDontTextModule } from 'src/app/shared/do-dont-text/do-dont-text.module';
import { CopyModule } from 'src/app/shared/copy/copy.module';

@NgModule({
  imports: [
    CommonModule,
    ComponentHeaderModule,
    ComponentExampleV1Module,
    DoDontModule,
    ComponentPropertiesModule,
    ComponentSectionModule,
    ComponentSubsectionModule,
    ComponentSubsubsectionModule,
    WhenToUseModule,
    DoDontTextModule,
    CopyModule,
  ],
  declarations: [LinkDocComponent],
})
export class LinkDocModule {}
