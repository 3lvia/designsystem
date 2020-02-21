import { Component, OnInit } from '@angular/core';
import { getComponent } from 'src/app/shared/elvis-items';

@Component({
  selector: 'app-link-doc',
  templateUrl: './link-doc.component.html',
  styleUrls: ['./link-doc.component.scss']
})
export class LinkDocComponent implements OnInit {

  componentStatus = getComponent('link-doc').status;
  componentClasses = ['.elvis-link'];

  example1 = `<a href="https://hafslundnett.no" class="elvis-link">Normal</a> <br>
<a href="https://hafslundnett.no" class="elvis-link is-active">Active</a><br>
<a href="https://hafslundnett.no" class="elvis-link is-hovering">Hovered</a><br>
<a href="https://hafslundnett.no" class="elvis-link no-hover">Disabled hover state</a><br>
`;

  constructor() { }

  ngOnInit() {
  }

}
