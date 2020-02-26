import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconDocComponent } from './icon-doc.component';
import { CodeBlockModule } from 'src/app/shared/code-block/code-block.module';

@NgModule({
  imports: [
    CommonModule,
    CodeBlockModule
  ],
  declarations: [IconDocComponent]
})
export class IconDocModule { }
