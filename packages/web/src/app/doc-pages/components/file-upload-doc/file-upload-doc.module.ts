import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentChangelogModule } from 'src/app/shared/component-documentation/component-changelog/component-changelog.module';
import { ComponentHeaderModule } from 'src/app/shared/component-documentation/component-structure/component-header/component-header.module';
import { ComponentPropertiesModule } from 'src/app/shared/component-documentation/component-properties/component-properties.module';
import { ComponentSectionModule } from 'src/app/shared/component-documentation/component-structure/component-section/component-section.module';
import { ComponentSubsectionModule } from 'src/app/shared/component-documentation/component-structure/component-subsection/component-subsection.module';
import { DndDirective } from './dnd.directive';
import { FileUploadDocComponent } from './file-upload-doc.component';
import { RouterModule } from '@angular/router';
import { FileUploadCegComponent } from './file-upload-ceg/file-upload-ceg.component';
import { CegModule } from 'src/app/shared/component-documentation/ceg/ceg.module';
import { FileUploadDragoverCegComponent } from './file-upload-dragover-ceg/file-upload-dragover-ceg.component';

@NgModule({
  declarations: [
    FileUploadDocComponent,
    DndDirective,
    FileUploadCegComponent,
    FileUploadDragoverCegComponent,
  ],
  imports: [
    CommonModule,
    ComponentHeaderModule,
    ComponentPropertiesModule,
    ComponentSectionModule,
    ComponentSubsectionModule,
    RouterModule,
    ComponentChangelogModule,
    CegModule,
  ],
})
export class FileUploadDocModule {}
