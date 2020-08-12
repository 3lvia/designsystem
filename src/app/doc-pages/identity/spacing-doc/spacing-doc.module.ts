import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpacingDocComponent } from './spacing-doc.component';
import { CodeBlockModule } from 'src/app/shared/code-block/code-block.module';
import { ComponentHeaderModule } from 'src/app/shared/component-header/component-header.module';
import { DoDontModule } from 'src/app/shared/do-dont/do-dont.module';
import { CopyModule } from 'src/app/shared/copy/copy.module';

@NgModule({
  imports: [
    CommonModule,
    CodeBlockModule,
    ComponentHeaderModule,
    DoDontModule,
    CopyModule,
  ],
  declarations: [SpacingDocComponent],
})
export class SpacingDocModule { }
