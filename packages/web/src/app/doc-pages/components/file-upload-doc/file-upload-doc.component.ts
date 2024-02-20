import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FileUploadDragoverCegComponent } from './file-upload-dragover-ceg/file-upload-dragover-ceg.component';
import { ComponentSubsectionComponent } from '../../../shared/component-documentation/component-structure/component-subsection/component-subsection.component';
import { ComponentSectionComponent } from '../../../shared/component-documentation/component-structure/component-section/component-section.component';
import { FileUploadCegComponent } from './file-upload-ceg/file-upload-ceg.component';
import { StaticCegComponent } from '../../../shared/component-documentation/ceg/static-ceg/static-ceg.component';
import { ComponentDocumentationComponent } from '../../../shared/component-documentation/component-documentation.component';

@Component({
  selector: 'app-file-upload-doc',
  templateUrl: './file-upload-doc.component.html',
  styleUrls: ['./file-upload-doc.component.scss'],
  standalone: true,
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
