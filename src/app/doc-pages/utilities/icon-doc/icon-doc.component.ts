import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-icon-doc',
  templateUrl: './icon-doc.component.html',
})
export class IconDocComponent implements OnInit {


  componentStatus = '';
  componentClasses = ['.e-icon'];

  example = `<i class="e-icon-clock e-icon-xl"></i>
<i class="e-icon-clock e-icon-lg"></i>
<i class="e-icon-clock e-icon-md"></i>
<i class="e-icon-clock e-icon-sm"></i>
<i class="e-icon-clock e-icon-xs"></i>`;

example2 = `<i class="e-icon-custom e-icon-xl">
  <img src="assets/icons/example-custom-icon.svg"></img>
</i>

<i class="e-icon-custom">
  <img src="assets/icons/example-custom-icon.svg"></img>
</i>`;
  constructor() { }

  ngOnInit() {
  }


}
