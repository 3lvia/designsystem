import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IconDocComponent } from './icon-doc.component';
import { CodeBlockModule } from 'src/app/shared/code-block/code-block.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ComponentHeaderModule } from 'src/app/shared/component-header/component-header.module';
import { CopyModule } from 'src/app/shared/copy/copy.module';
import { IconSearchPipe } from './icon-search.pipe';


@NgModule({
  imports: [
    CommonModule,
    CodeBlockModule,
    FormsModule,
    Ng2SearchPipeModule,
    ComponentHeaderModule,
    CopyModule
  ],
  declarations: [IconDocComponent, IconSearchPipe]
})
export class IconDocModule { }
