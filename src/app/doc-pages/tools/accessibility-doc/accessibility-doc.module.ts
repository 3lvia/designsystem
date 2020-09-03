import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccessibilityDocComponent } from './accessibility-doc.component';
import { ComponentHeaderModule } from 'src/app/shared/component-structure/component-header/component-header.module';

@NgModule({
  imports: [
    CommonModule,
    ComponentHeaderModule,
  ],
  declarations: [AccessibilityDocComponent],
})
export class AccessibilityDocModule { }
