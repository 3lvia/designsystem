import { Component, OnInit } from '@angular/core';
import { getComponent } from 'src/app/shared/e-items';

@Component({
  selector: 'app-draganddrop-doc',
  templateUrl: './draganddrop-doc.component.html',
  styleUrls: ['./draganddrop-doc.component.scss']
})
export class DraganddropDocComponent implements OnInit {

  externalUrl = getComponent('checkbox-toggle-doc').externalUrl;
  componentStatus = getComponent('checkbox-toggle-doc').status;

  example1 = `<div class="e-dragdrop" style="width:300px; height:150px">
  </div>`;

  example2 = `<div class="e-dragdrop e-dragdrop--hover" style="width:300px; height:150px">
  </div>`;

  constructor() { }

  ngOnInit() {
  }

}
