import { Component, OnInit } from '@angular/core';
import { getComponent } from 'src/app/shared/e-items';

@Component({
  selector: 'app-file-upload-doc',
  templateUrl: './file-upload-doc.component.html',
  styleUrls: ['./file-upload-doc.component.scss']
})
export class FileUploadDocComponent implements OnInit {

  externalUrl = getComponent('fileUpload-doc').externalUrl;
  componentStatus = getComponent('fileUpload-doc').status;
  fileUploadClasses = ['e-fileupload', 'e-fileupload__icon-container', 'e-fileupload__description', 'e-fileupload__input'];

  example1 = `<div class="e-fileupload" style="width:380px">
  <div class="e-fileupload__icon-container">
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

  constructor() { }

  ngOnInit() {
  }

}
