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
  tabs = [TabNames.Overview, TabNames.Code, TabNames.Guidelines];
  componentClasses = ['e-shadow'];

  doCodeCSS = `box-shadow: var(--e-shadow-2);
box-shadow: none;`;
  dontCodeCSS = `box-shadow: var(--e-shadow-none);`;
  example1 = `<span class="e-shadow-1 e-mb-2 e-mt-2 example-box"></span>
<span class="e-shadow-2 e-mb-2 e-mt-2 example-box"></span>
<span class="e-shadow-3 e-mb-2 e-mt-2 example-box"></span>`;

  constructor() { }

  ngOnInit() {
  }

}


