import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShadowDocComponent } from './shadow-doc.component';
import { CodeBlockModule } from 'src/app/shared/code-block/code-block.module';
import { ComponentHeaderModule } from 'src/app/shared/component-header/component-header.module';
import { DoDontModule } from 'src/app/shared/do-dont/do-dont.module';

@NgModule({
  imports: [
    CommonModule,
    ComponentHeaderModule,
    CodeBlockModule,
    DoDontModule
  ],
  declarations: [ShadowDocComponent]
})
export class ShadowDocModule { }
