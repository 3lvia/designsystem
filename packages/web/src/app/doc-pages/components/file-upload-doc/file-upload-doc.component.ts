import { Component } from '@angular/core';
import { getComponent } from 'src/app/shared/doc-pages';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-file-upload-doc',
  templateUrl: './file-upload-doc.component.html',
  styleUrls: ['./file-upload-doc.component.scss'],
})
export class FileUploadDocComponent {
  figmaUrl = getComponent('file-upload')?.figmaUrl;
  description = getComponent('file-upload')?.description;
  title = getComponent('file-upload')?.title;

  constructor(private titleService: Title) {
    this.titleService.setTitle(this.title + ' | Elvia design system');
  }

  example1 = `<div class="e-fileupload" style="width:380px">
  <div class="e-fileupload__icon">
    <i class="e-icon e-icon--image_add-color" aria-hidden="true"></i>
  </div>
  <div class="e-fileupload__description">
    Drag and drop or
  </div>
  <div class="e-fileupload__input">
    <input type="file" id="fileUploadTemplate">
    <label for="fileUploadTemplate"> <i class="e-icon e-icon--upload" aria-hidden="true"></i>Choose file</label>
  </div>
</div>
`;

  example2 = `<div class="e-fileupload e-fileupload--dragover" style="width:380px">
  <div class="e-fileupload__icon">
    <i class="e-icon e-icon--image_add-color" aria-hidden="true"></i>
  </div>
  <div class="e-fileupload__description">
    Drag and drop or
  </div>
  <div class="e-fileupload__input">
    <input type="file" id="fileUploadTemplate">
    <label for="fileUploadTemplate"> <i class="e-icon e-icon--upload" aria-hidden="true"></i>Choose file</label>
  </div>
</div>`;

  dndDirective = `import {
    Directive,
    Output,
    Input,
    EventEmitter,
    HostBinding,
    HostListener
} from '@angular/core';

@Directive({
    selector: '[appDnd]'
})
export class DndDirective {
    @HostBinding('class.e-fileupload--dragover') fileOver: boolean;
    @Output() fileDropped = new EventEmitter<any>();

    // Dragover listener
    @HostListener('dragover', ['$event']) onDragOver(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        this.fileOver = true;
    }

    // Dragleave listener
    @HostListener('dragleave', ['$event']) public onDragLeave(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        this.fileOver = false;
    }

    // Drop listener
    @HostListener('drop', ['$event']) public ondrop(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        this.fileOver = false;
        alert('Files got dropped! Don´t worry, we do not store anything that you dropped here =)');
    }
}`;
}
