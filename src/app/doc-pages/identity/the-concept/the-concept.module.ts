import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TheConceptComponent } from './the-concept.component';
import { ComponentHeaderModule } from 'src/app/shared/component-structure/component-header/component-header.module';
import { ComponentSectionModule } from 'src/app/shared/component-structure/component-section/component-section.module';
import { ComponentSubsectionModule } from 'src/app/shared/component-structure/component-subsection/component-subsection.module';

@NgModule({
  imports: [
    CommonModule,
    ComponentHeaderModule,
    ComponentSectionModule,
    ComponentSubsectionModule,
  ],
  declarations: [TheConceptComponent]
})
export class TheConceptModule { }
