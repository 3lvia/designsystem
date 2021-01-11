import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BorderDocComponent } from './border-doc.component';
import { ComponentHeaderModule } from 'src/app/shared/component-structure/component-header/component-header.module';
import { CodeBlockModule } from 'src/app/shared/code-block/code-block.module';

@NgModule({
  imports: [CommonModule, ComponentHeaderModule, CodeBlockModule],
  declarations: [BorderDocComponent],
})
export class BorderDocModule {}
