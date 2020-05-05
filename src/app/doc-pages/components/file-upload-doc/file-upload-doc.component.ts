import { Component, OnInit } from '@angular/core';
import { getComponent } from 'src/app/shared/e-items';

@Component({
  selector: 'app-file-upload-doc',
  templateUrl: './file-upload-doc.component.html',
  styleUrls: ['./file-upload-doc.component.scss']
})
export class FileUploadDocComponent {

  externalUrl = getComponent('fileUpload-doc').externalUrl;
  componentStatus = getComponent('fileUpload-doc').status;
  fileUploadClasses = ['e-fileupload', 'e-fileupload__icon', 'e-fileupload__description', 'e-fileupload__input'];

  // Code Block example code
  example1 = `<div class="e-fileupload" style="width:380px">
  <div class="e-fileupload__icon">
    <i class="e-icon e-icon--file-add"></i>
  </div>
  <div class="e-fileupload__description">
    Dra og slipp eller
  </div>
  <div class="e-fileupload__input">
    <input type="file" id="fileUploadTemplate">
    <label for="fileUploadTemplate"> <i class="e-icon e-icon--download"></i> Velg fil</label>
  </div>
</div>
`;

  example2 = `<div class="e-fileupload e-fileupload---hover" style="width:380px">
  <div class="e-fileupload__icon">
    <i class="e-icon e-icon--file-add"></i>
  </div>
  <div class="e-fileupload__description">
    Dra og slipp eller
  </div>
  <div class="e-fileupload__input">
    <input type="file" id="fileUploadTemplate">
    <label for="fileUploadTemplate"> <i class="e-icon e-icon--download"></i> Velg fil</label>
  </div>
</div>`;
  dndDirective = `
import {
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
    @HostBinding('class.e-fileupload---hover') fileOver: boolean;
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
}
`;


}
