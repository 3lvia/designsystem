import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorDocComponent } from './color-doc.component';
import { ComponentHeaderModule } from 'src/app/shared/component-header/component-header.module';
import { DoDontModule } from 'src/app/shared/do-dont/do-dont.module';
import { CodeBlockModule } from 'src/app/shared/code-block/code-block.module';
import { CopyModule } from 'src/app/shared/copy/copy.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    ComponentHeaderModule,
    DoDontModule,
    CodeBlockModule,
    CopyModule,
    RouterModule,
  ],
  declarations: [ColorDocComponent],
})
export class ColorDocModule { }
