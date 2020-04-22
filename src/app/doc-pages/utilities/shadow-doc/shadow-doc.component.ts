import { Component, OnInit, Input } from '@angular/core';
import { TabNames } from 'src/app/shared/tab-names.enums';
import { getUtilities } from 'src/app/shared/e-items';

@Component({
  selector: 'app-shadow-doc',
  templateUrl: './shadow-doc.component.html',
  styleUrls: ['./shadow-doc.component.scss']
})
export class ShadowDocComponent implements OnInit {

  @Input() selected = TabNames.Overview;

  tabNames = TabNames;
  tabs = [TabNames.Overview, TabNames.Code, TabNames.Guidelines];
  // componentClasses = ['e-shadow-soft', 'e-shadow-medium', 'e-shadow-hard'];
  componentStatus = getUtilities('shadow-doc').status;
  externalUrl = getUtilities('shadow-doc').externalUrl;

  doCodeCSS = `box-shadow: var(--e-shadow-2);
box-shadow: none;`;
  dontCodeCSS = `box-shadow: var(--e-shadow-none);`;
  example1 = `<span class="e-shadow-1 e-mb-16 e-mt-16 example-box"></span>
<span class="e-shadow-2 e-mb-16 e-mt-16 example-box"></span>
<span class="e-shadow-3 e-mb-16 e-mt-16 example-box"></span>`;

  constructor() { }

  ngOnInit() {
  }

}


