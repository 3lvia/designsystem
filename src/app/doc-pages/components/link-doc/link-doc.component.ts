import { Component, OnInit } from '@angular/core';
import { getComponent } from 'src/app/shared/e-items';

@Component({
  selector: 'app-link-doc',
  templateUrl: './link-doc.component.html',
  styleUrls: ['./link-doc.component.scss']
})
export class LinkDocComponent implements OnInit {

  componentStatus = getComponent('link-doc').status;
  componentClasses = ['e-link'];

  example1 = `<a href="https://hafslundnett.no" class="e-link">Normal</a> <br>
<a href="https://hafslundnett.no" class="e-link is-active">Active</a><br>
<a href="https://hafslundnett.no" class="e-link is-hovering">Hovered</a><br>
<a href="https://hafslundnett.no" class="e-link no-hover">Disabled hover state</a><br>
`;

  constructor() { }

  ngOnInit() {
  }

}
