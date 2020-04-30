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
<div class="e-progress" role="progressbar">
  <div class="e-progress__bar"></div>
</div>
`;

  example2 = `
<div class="e-progress" role="progressbar">
  <div class="e-progress__bar e-progress__bar--error"></div>
</div>
`;

  constructor() { }

  ngOnInit() {
  }

}
