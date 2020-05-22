import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IconDocComponent } from './icon-doc.component';
import { CodeBlockModule } from 'src/app/shared/code-block/code-block.module';
import { ComponentHeaderModule } from 'src/app/shared/component-header/component-header.module';
import { CopyModule } from 'src/app/shared/copy/copy.module';
import { IconSearchPipe } from './icon-search.pipe';


@NgModule({
  imports: [
    CommonModule,
    CodeBlockModule,
    FormsModule,
    ComponentHeaderModule,
    CopyModule
  ],
  declarations: [IconDocComponent, IconSearchPipe]
})
export class IconDocModule { }
