import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridDocComponent } from './grid-doc.component';
import { ComponentHeaderModule } from 'src/app/shared/component-structure/component-header/component-header.module';
import { CodeBlockModule } from 'src/app/shared/code-block/code-block.module';
import { ComponentSubsectionModule } from 'src/app/shared/component-structure/component-subsection/component-subsection.module';
import { ComponentSectionModule } from 'src/app/shared/component-structure/component-section/component-section.module';

@NgModule({
  imports: [
    CommonModule,
    ComponentHeaderModule,
    CodeBlockModule,
    ComponentSectionModule,
    ComponentSubsectionModule,
  ],
  declarations: [GridDocComponent],
})
export class GridDocModule { }
