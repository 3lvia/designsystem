import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccessibilityDocComponent } from './accessibility-doc.component';
import { ComponentHeaderModule } from 'src/app/shared/component-documentation/component-structure/component-header/component-header.module';
import { DoDontModule } from 'src/app/shared/do-dont/do-dont.module';
import { ComponentSectionModule } from 'src/app/shared/component-documentation/component-structure/component-section/component-section.module';
import { RouterModule } from '@angular/router';
import { ComponentSubsectionModule } from 'src/app/shared/component-documentation/component-structure/component-subsection/component-subsection.module';
import { ComponentSubsubsectionModule } from 'src/app/shared/component-documentation/component-structure/component-subsubsection/component-subsubsection.module';

@NgModule({
  imports: [
    CommonModule,
    ComponentHeaderModule,
    DoDontModule,
    ComponentSectionModule,
    ComponentSubsectionModule,
    ComponentSubsubsectionModule,
    RouterModule,
  ],
  declarations: [AccessibilityDocComponent],
})
export class AccessibilityDocModule {}
