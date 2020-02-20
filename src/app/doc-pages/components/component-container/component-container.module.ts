import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentContainerComponent } from './component-container.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [ComponentContainerComponent],
  declarations: [ComponentContainerComponent]
})
export class ComponentContainerModule { }
