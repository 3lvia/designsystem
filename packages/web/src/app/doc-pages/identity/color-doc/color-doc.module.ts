import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorDocComponent } from './color-doc.component';
import { ComponentHeaderModule } from 'src/app/shared/component-structure/component-header/component-header.module';
import { DoDontModule } from 'src/app/shared/do-dont/do-dont.module';
import { CodeBlockModule } from 'src/app/shared/code-block/code-block.module';
import { CopyModule } from 'src/app/shared/copy/copy.module';
import { RouterModule } from '@angular/router';
import { ComponentSubsectionModule } from 'src/app/shared/component-structure/component-subsection/component-subsection.module';
import { ComponentSectionModule } from 'src/app/shared/component-structure/component-section/component-section.module';
import { ComponentSubsubsectionModule } from 'src/app/shared/component-structure/component-subsubsection/component-subsubsection.module';
import { DoDontTextModule } from 'src/app/shared/do-dont-text/do-dont-text.module';

@NgModule({
  imports: [
    CommonModule,
    ComponentHeaderModule,
    DoDontModule,
    CodeBlockModule,
    CopyModule,
    RouterModule,
    ComponentSectionModule,
    ComponentSubsectionModule,
    ComponentSubsubsectionModule,
    DoDontTextModule,
  ],
  declarations: [ColorDocComponent],
})
export class ColorDocModule {}
