import { Component, OnInit } from '@angular/core';
import { getComponent } from 'src/app/shared/e-items';
import * as icons from 'style/elvis/src/icons/icons.config';

@Component({
  selector: 'app-file-upload-doc',
  templateUrl: './file-upload-doc.component.html',
  styleUrls: ['./file-upload-doc.component.scss']
})
export class FileUploadDocComponent implements OnInit {

  externalUrl = getComponent('fileUpload-doc').externalUrl;
  componentStatus = getComponent('fileUpload-doc').status;

  example1 = `<div class="e-input__file">
  <input type="file" id="fileUploadTemplate">
  <label for="fileUploadTemplate"> <i class="e-icon e-icon--download"></i> Velg fil</label>
</div>
`;

  example2 = `<div>
  <div class="e-input__file">
    <input type="file" id="fileUploadTemplate">
    <label for="fileUploadTemplate"> <i class="e-icon e-icon--download"></i> Velg fil</label>
  </div>
</div>`;


  constructor() { }

  ngOnInit() {
  }

}
