import { Component, OnInit } from '@angular/core';
import { getComponent } from 'src/app/shared/e-items';

@Component({
  selector: 'app-divider-doc',
  templateUrl: './divider-doc.component.html',
  styleUrls: ['./divider-doc.component.scss']
})
export class DividerDocComponent implements OnInit {

  componentStatus = getComponent('divider-doc').status;
  componentClasses = ['e-divider'];

  example1 = `<p>Some content</p>
<hr class="e-divider">
<p>Other content</p>
<p>Divider below in light theme</p>
<hr class="e-divider is-light">
<p>Other content</p>
`;

  constructor() { }

  ngOnInit() {
  }

}
