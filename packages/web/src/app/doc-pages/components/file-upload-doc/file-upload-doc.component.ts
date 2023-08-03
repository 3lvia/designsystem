import { Component } from '@angular/core';
import { getComponent } from 'src/app/shared/doc-pages';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-file-upload-doc',
  templateUrl: './file-upload-doc.component.html',
  styleUrls: ['./file-upload-doc.component.scss'],
})
export class FileUploadDocComponent {
  title = getComponent('file-upload')?.title;

  constructor(private titleService: Title) {
    this.titleService.setTitle(this.title + ' | Elvia design system');
  }
}
