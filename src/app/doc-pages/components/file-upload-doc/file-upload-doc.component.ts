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

  example1 = `An example of how can create a fle upload.
`;


  constructor() { }

  ngOnInit() {
  }

}
