import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShadowDocComponent } from './shadow-doc.component';
import { ComponentHeaderModule } from 'src/app/shared/component-structure/component-header/component-header.module';
import { DoDontModule } from 'src/app/shared/do-dont/do-dont.module';
import { WhenToUseModule } from 'src/app/shared/when-to-use/when-to-use.module';
import { ComponentSubsectionModule } from 'src/app/shared/component-structure/component-subsection/component-subsection.module';
import { ComponentSectionModule } from 'src/app/shared/component-structure/component-section/component-section.module';
import { CopyModule } from 'src/app/shared/copy/copy.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    ComponentHeaderModule,
    DoDontModule,
    ComponentSectionModule,
    ComponentSubsectionModule,
    WhenToUseModule,
    CopyModule,
    RouterModule,
  ],
  declarations: [ShadowDocComponent],
})
export class ShadowDocModule {}
