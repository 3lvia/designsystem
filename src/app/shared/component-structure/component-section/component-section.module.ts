import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentSectionComponent } from './component-section.component';
import { CopyModule } from '../../copy/copy.module';

@NgModule({
  imports: [
    CommonModule,
    CopyModule,
  ],
  declarations: [ComponentSectionComponent],
  exports: [ComponentSectionComponent],
})
export class ComponentSectionModule { }
