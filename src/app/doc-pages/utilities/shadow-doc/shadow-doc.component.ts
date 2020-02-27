import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shadow-doc',
  templateUrl: './shadow-doc.component.html',
  styleUrls: ['./shadow-doc.component.scss']
})
export class ShadowDocComponent implements OnInit {

  // tslint:disable-next-line:max-line-length
  example1 = `<span class="e-shadow-1 example-box"></span>
<span class="e-shadow-2 example-box"></span>
<span class="e-shadow-3 example-box"></span>`;

  componentClasses = ['e-shadow'];

  constructor() { }

  ngOnInit() {
  }

}


