import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadDocComponent } from './file-upload-doc.component';
import { ComponentHeaderModule } from 'src/app/shared/component-header/component-header.module';
import { CodeBlockModule } from 'src/app/shared/code-block/code-block.module';
import { DndDirective } from './dnd.directive';

@NgModule({
  imports: [
    CommonModule,
    ComponentHeaderModule,
    CodeBlockModule,
  ],
  declarations: [FileUploadDocComponent, DndDirective]
})
export class FileUploadDocModule { }
