import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilitiesDocComponent } from './utilities-doc.component';
import { ComponentHeaderModule } from 'src/app/shared/component-structure/component-header/component-header.module';
import { RouterModule } from '@angular/router';
import { DoDontModule } from 'src/app/shared/do-dont/do-dont.module';
import { CodeBlockModule } from 'src/app/shared/code-block/code-block.module';
import { CopyModule } from 'src/app/shared/copy/copy.module';
import { ComponentSectionModule } from 'src/app/shared/component-structure/component-section/component-section.module';
import { ComponentSubsectionModule } from 'src/app/shared/component-structure/component-subsection/component-subsection.module';

@NgModule({
  imports: [
    CommonModule,
    ComponentHeaderModule,
    DoDontModule,
    CodeBlockModule,
    CopyModule,
    ComponentSectionModule,
    ComponentSubsectionModule,
    RouterModule,
  ],
  declarations: [UtilitiesDocComponent],
})
export class UtilitiesDocModule {}
