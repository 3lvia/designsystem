import { Component, OnInit } from '@angular/core';
import { getComponent } from 'src/app/shared/e-items';


@Component({
  selector: 'app-list-doc',
  templateUrl: './list-doc.component.html',
  styleUrls: ['./list-doc.component.scss']
})
export class ListDocComponent implements OnInit {


  componentStatus = getComponent('list-doc').status;

  example1 = `<ul class="e-list">
  <li>Just a hunk, a hunk of burning list</li>
  <li>Just a hunk, a hunk of burning list</li>
  <li>Just a hunk, a hunk of burning list</li>
  <li>Just a hunk, a hunk of burning list</li>
</ul>
`;

  example2 = `<ul class="e-list strong">
  <li>Just a hunk, a hunk of burning list</li>
  <li>Just a hunk, a hunk of burning list</li>
  <li>Just a hunk, a hunk of burning list</li>
  <li>Just a hunk, a hunk of burning list</li>
</ul>
`;

  example3 = `<ol class="e-list numbers">
  <li>Just a hunk, a hunk of burning list</li>
  <li>Just a hunk, a hunk of burning lists</li>
  <li>Just a hunk, a hunk of burning lists</li>
  <li>Just a hunk, a hunk of burning lists</li>
</ol>
`;

  constructor() { }

  ngOnInit() {
  }
}
