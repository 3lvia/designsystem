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

  example1 = `<ul class="e-list">
  <li>Just a hunk, a hunk of burning list</li>
  <li>Just a hunk, a hunk of burning list</li>
  <li>Just a hunk, a hunk of burning list</li>
  <li>Just a hunk, a hunk of burning list</li>
</ul>
`;

  example2 = `<ul class="e-list e-strong">
  <li>Just a hunk, a hunk of burning list</li>
  <li>Just a hunk, a hunk of burning list</li>
  <li>Just a hunk, a hunk of burning list</li>
  <li>Just a hunk, a hunk of burning list</li>
</ul>
`;

  constructor() { }

  ngOnInit() {
  }

}
