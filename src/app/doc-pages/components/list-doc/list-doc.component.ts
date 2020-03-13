import { Component, OnInit } from '@angular/core';
import { getComponent } from 'src/app/shared/e-items';


@Component({
  selector: 'app-list-doc',
  templateUrl: './list-doc.component.html',
  styleUrls: ['./list-doc.component.scss']
})
export class ListDocComponent implements OnInit {


  componentStatus = getComponent('list-doc').status;
  componentClasses = ['e-list'];

  example1 = `
  <ul class="e-list">
    <li>Honka</li>
    <li>Honka</li>
    <li>Burning</li>
    <li>Love</li>
  </ul>
`;

  example2 = `
  <ul class="e-list strong">
    <li>Honka</li>
    <li>Honka</li>
    <li>Burning</li>
    <li>Love</li>
  </ul>
`;

  example3 = `
  <ol class="e-list numbers">
    <li>Honka</li>
    <li>Honka</li>
    <li>Burning</li>
    <li>Love</li>
  </ol>
`;

  constructor() { }

  ngOnInit() {
  }
}
