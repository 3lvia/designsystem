import { Component, OnInit } from '@angular/core';
import { getComponent } from 'src/app/shared/e-items';

@Component({
  selector: 'app-progressbar-doc',
  templateUrl: './progressbar-doc.component.html',
  styleUrls: ['./progressbar-doc.component.scss']
})
export class ProgressbarDocComponent implements OnInit {

  externalUrl = getComponent('progressbar-doc').externalUrl;
  componentStatus = getComponent('progressbar-doc').status;

  example1 = `
<div class="e-progressbar" role="progressbar">
  <div class="e-progressbar e-loading"></div>
</div>
`;

  example2 = `
<div class="e-progressbar" role="progressbar">
  <div class="e-progressbar e-error"></div>
</div>
`;

  constructor() { }

  ngOnInit() {
  }

}
