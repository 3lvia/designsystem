import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetStartedDocComponent } from './get-started-doc.component';
import { ComponentHeaderModule } from 'src/app/shared/component-documentation/component-structure/component-header/component-header.module';
import { CopyModule } from 'src/app/shared/copy/copy.module';
import { ComponentSectionModule } from 'src/app/shared/component-documentation/component-structure/component-section/component-section.module';
import { RouterModule } from '@angular/router';
import { ComponentSubsectionModule } from 'src/app/shared/component-documentation/component-structure/component-subsection/component-subsection.module';
import { ComponentSubsubsectionModule } from 'src/app/shared/component-documentation/component-structure/component-subsubsection/component-subsubsection.module';
import '@elvia/elvis-accordion';
import '@elvia/elvis-divider';
import { CegModule } from 'src/app/shared/component-documentation/ceg/ceg.module';

@NgModule({
  imports: [
    CommonModule,
    ComponentHeaderModule,
    CopyModule,
    ComponentSectionModule,
    ComponentSubsectionModule,
    ComponentSubsubsectionModule,
    RouterModule,
    CegModule,
  ],
  declarations: [GetStartedDocComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GetStartedDocModule {}
