import { Component, OnInit, Input } from '@angular/core';
import { TabNames } from 'src/app/shared/tab-names.enums';

@Component({
  selector: 'app-shadow-doc',
  templateUrl: './shadow-doc.component.html',
  styleUrls: ['./shadow-doc.component.scss']
})
export class ShadowDocComponent implements OnInit {

  @Input() selected = TabNames.Overview;

  tabNames = TabNames;
  tabs = [TabNames.Overview, TabNames.Examples, TabNames.Guidelines];
  componentClasses = ['e-shadow'];

  // tslint:disable-next-line:max-line-length
  example1 = `<span class="e-shadow-1 example-box"></span>
<span class="e-shadow-2 example-box"></span>
<span class="e-shadow-3 example-box"></span>`;

  constructor() { }

  ngOnInit() {
  }

}


