import { Component, OnInit, Input } from '@angular/core';
import { TabNames } from 'src/app/shared/tab-names.enums';
import { getUtilities } from 'src/app/shared/e-items';

@Component({
  selector: 'app-color-doc',
  templateUrl: './color-doc.component.html',
  styleUrls: ['./color-doc.component.scss']
})
export class ColorDocComponent implements OnInit {

  @Input() selected = TabNames.Overview;

  componentStatus = getUtilities('color-doc').status;
  tabNames = TabNames;
  tabs = [TabNames.Overview, TabNames.Code, TabNames.Guidelines];
  componentClasses = ['e-text', 'e-bg'];
  colors: string[] = ['red', 'green'];

  doCode = `<div class="e-bg-green-lime"></div>`;
  dontCode = `<div class="e-bg-green-lime e-text-grey-mine-shaft"></div>`;
  doCodeCSS = `background: var(--e-green-lime);
color: var(--e-red);`;
  dontCodeCSS = `background: var(--e-bg-green-lime);
color: var(--e-text-red);`;
  example1 = `<span class="e-bg-green-lime e-mb-2 e-mt-2 e-p-2 example-box">Text</span>
<span class="e-bg-yellow e-mb-2 e-mt-2 e-p-2 example-box">Text</span>
<span class="e-bg-orange-peel e-mb-2 e-mt-2 e-p-2 example-box">Text</span>
<span class="e-bg-red e-mb-2 e-mt-2 e-p-2 example-box">Text</span>
<span class="e-bg-black e-mb-2 e-mt-2 e-p-2 example-box">Text</span>`;

  constructor() { }

  ngOnInit() {
  }


}
