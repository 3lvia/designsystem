import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TheDesignSystemDocComponent } from './the-design-system-doc.component';
import { ComponentHeaderModule } from 'src/app/shared/component-structure/component-header/component-header.module';
import { ComponentSectionModule } from 'src/app/shared/component-structure/component-section/component-section.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, ComponentHeaderModule, ComponentSectionModule, RouterModule],
  declarations: [TheDesignSystemDocComponent],
})
export class TheDesignSystemDocModule {}
