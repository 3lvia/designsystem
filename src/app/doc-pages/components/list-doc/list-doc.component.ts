import { Component, OnInit } from '@angular/core';
import { getComponent } from 'src/app/shared/e-items';


@Component({
  selector: 'app-list-doc',
  templateUrl: './list-doc.component.html',
  styleUrls: ['./list-doc.component.scss']
})
export class ListDocComponent implements OnInit {


  externalUrl = getComponent('list-doc').externalUrl;
  componentStatus = getComponent('list-doc').status;

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

  example3 = `<ol class="e-list e-icons">
  <li><i class="e-icon-step-1-color"></i>Just a hunk, a hunk of burning list</li>
  <li><i class="e-icon-step-2-color"></i>Just a hunk, a hunk of burning lists</li>
  <li><i class="e-icon-money-color"></i>Just a hunk, a hunk of burning lists</li>
  <li><i class="e-icon-information-circle"></i>Just a hunk, a hunk of burning lists</li>
</ol>
`;

// Old numbered lists. Might remove later
//   example4 = `<ol class="e-list e-numbers">
//   <li>Just a hunk, a hunk of burning list</li>
//   <li>Just a hunk, a hunk of burning lists</li>
//   <li>Just a hunk, a hunk of burning lists</li>
//   <li>Just a hunk, a hunk of burning lists</li>
// </ol>
// `;

  constructor() { }

  ngOnInit() {
  }
}
