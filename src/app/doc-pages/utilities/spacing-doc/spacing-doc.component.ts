import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-spacing-doc',
  templateUrl: './spacing-doc.component.html',
  styleUrls: ['./spacing-doc.component.scss']
})
export class SpacingDocComponent implements OnInit {

  componentClasses = ['e-p', 'e-m'];

  example1 = `<div class="e-p-3 e-border">Content</div>
<div class="e-p-1 e-m-5 e-border">Content</div>
<div class="e-pt-4 e-pb-4 e-pl-0 e-pr-1 e-m-2 e-border">Content</div>
<div class="e-p-3 e-mt-2 e-mb-0 e-ml-0 e-mr-7 e-border">Content</div>`;

  constructor() { }

  ngOnInit() {
  }

}
