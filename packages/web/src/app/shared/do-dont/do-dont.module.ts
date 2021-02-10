import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoDontComponent } from './do-dont.component';
import { ComponentExampleCodeModule } from '../component-documentation/component-example/component-example-code/component-example-code.module';

@NgModule({
  imports: [CommonModule, ComponentExampleCodeModule],
  exports: [DoDontComponent],
  declarations: [DoDontComponent],
})
export class DoDontModule {}
