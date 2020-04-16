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

  example1 = `
  <div class="fileUpload-container">
    <i class="e-icon-agreements-color"></i>
    <input type="file">Velg fil</input>
    <p>eller dra og slipp<p>
  </div>

  <style>
    .fileUpload-container {
      border: 2px dashed #D3D3D3;

      i {
        margin: auto;
        margin-top: 32px;
      }
    }
  </style>
`;


  constructor() { }

  ngOnInit() {
  }

}
