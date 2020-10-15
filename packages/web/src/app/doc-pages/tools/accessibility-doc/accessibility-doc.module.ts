import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccessibilityDocComponent } from './accessibility-doc.component';
import { ComponentHeaderModule } from 'src/app/shared/component-structure/component-header/component-header.module';
import { DoDontModule } from 'src/app/shared/do-dont/do-dont.module';
import { ComponentSectionModule } from 'src/app/shared/component-structure/component-section/component-section.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    ComponentHeaderModule,
    DoDontModule,
    ComponentSectionModule,
    RouterModule,
  ],
  declarations: [AccessibilityDocComponent],
})
export class AccessibilityDocModule { }
