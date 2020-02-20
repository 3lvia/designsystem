import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentExampleComponent } from './component-example.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [ComponentExampleComponent],
  declarations: [ComponentExampleComponent]
})
export class ComponentExampleModule { }
