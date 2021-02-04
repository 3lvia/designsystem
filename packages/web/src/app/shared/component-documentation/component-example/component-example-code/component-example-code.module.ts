import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentExampleCodeComponent } from './component-example-code.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ComponentExampleCodeComponent],
  exports: [ComponentExampleCodeComponent],
})
export class ComponentExampleCodeModule {}
