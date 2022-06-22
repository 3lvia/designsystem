import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShadowDocComponent } from './shadow-doc.component';
import { ComponentSubsectionModule } from 'src/app/shared/component-documentation/component-structure/component-subsection/component-subsection.module';
import { ComponentSectionModule } from 'src/app/shared/component-documentation/component-structure/component-section/component-section.module';
import { ComponentHeaderModule } from 'src/app/shared/component-documentation/component-structure/component-header/component-header.module';
import { WhenToUseModule } from 'src/app/shared/when-to-use/when-to-use.module';
import '@elvia/elvis-icon';

@NgModule({
  imports: [
    CommonModule,
    ComponentHeaderModule,
    ComponentSectionModule,
    ComponentSubsectionModule,
    WhenToUseModule,
  ],
  declarations: [ShadowDocComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ShadowDocModule {}
