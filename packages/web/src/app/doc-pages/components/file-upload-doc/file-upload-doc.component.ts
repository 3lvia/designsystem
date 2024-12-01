import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { StaticCegComponent } from '../../../shared/component-documentation/ceg/static-ceg/static-ceg.component';
import { ComponentDocumentationComponent } from '../../../shared/component-documentation/component-documentation.component';
import { ComponentSectionComponent } from '../../../shared/component-documentation/component-structure/component-section/component-section.component';
import { ComponentSubsectionComponent } from '../../../shared/component-documentation/component-structure/component-subsection/component-subsection.component';
import { FileUploadCegComponent } from './file-upload-ceg/file-upload-ceg.component';
import { FileUploadDragoverCegComponent } from './file-upload-dragover-ceg/file-upload-dragover-ceg.component';

@Component({
  selector: 'app-file-upload-doc',
  templateUrl: './file-upload-doc.component.html',
  imports: [
    ComponentDocumentationComponent,
    StaticCegComponent,
    FileUploadCegComponent,
    ComponentSectionComponent,
    ComponentSubsectionComponent,
    FileUploadDragoverCegComponent,
    RouterLink,
  ],
})
export class FileUploadDocComponent {}
