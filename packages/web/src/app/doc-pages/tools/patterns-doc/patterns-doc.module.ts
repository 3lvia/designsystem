import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatternsDocComponent } from './patterns-doc.component';
import { ComponentHeaderModule } from 'src/app/shared/component-structure/component-header/component-header.module';
import { CopyModule } from 'src/app/shared/copy/copy.module';
import { ComponentSectionModule } from 'src/app/shared/component-structure/component-section/component-section.module';

@NgModule({
  imports: [CommonModule, ComponentHeaderModule, CopyModule, ComponentSectionModule],
  declarations: [PatternsDocComponent],
})
export class PatternsDocModule {}
