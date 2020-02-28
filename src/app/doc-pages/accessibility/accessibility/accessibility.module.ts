import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccessibilityComponent } from './accessibility.component';
import { ComponentHeaderModule } from 'src/app/shared/component-header/component-header.module';

@NgModule({
  imports: [
    CommonModule,
    ComponentHeaderModule
  ],
  declarations: [AccessibilityComponent]
})
export class AccessibilityModule { }
