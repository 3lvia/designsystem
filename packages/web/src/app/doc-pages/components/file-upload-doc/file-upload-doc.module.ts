import { NgModule } from '@angular/core';
import { DndDirective } from './dnd.directive';
import { FileUploadDocComponent } from './file-upload-doc.component';
import { FileUploadCegComponent } from './file-upload-ceg/file-upload-ceg.component';
import { FileUploadDragoverCegComponent } from './file-upload-dragover-ceg/file-upload-dragover-ceg.component';
import { SharedDocumentationModule } from 'src/app/shared/component-documentation/shared-component-documentation.module';

@NgModule({
  declarations: [
    FileUploadDocComponent,
    DndDirective,
    FileUploadCegComponent,
    FileUploadDragoverCegComponent,
  ],
  imports: [SharedDocumentationModule],
})
export class FileUploadDocModule {}
