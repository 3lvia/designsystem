import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinkDocComponent } from './link-doc.component';
import { ComponentHeaderModule } from 'src/app/shared/component-header/component-header.module';
import { CodeBlockModule } from 'src/app/shared/code-block/code-block.module';
import { DoDontModule } from 'src/app/shared/do-dont/do-dont.module';

@NgModule({
  imports: [
    CommonModule,
    ComponentHeaderModule,
    CodeBlockModule,
    DoDontModule
  ],
  declarations: [LinkDocComponent]
})
export class LinkDocModule { }
