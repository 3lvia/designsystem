import { Component, Input, OnInit } from '@angular/core';
import { Icon } from 'src/app/shared/icon.interface';
import { TabNames } from 'src/app/shared/tab-names.enums';
import { getUtilities } from 'src/app/shared/e-items';
import * as icons from 'style/elvis/src/icons/icons';

@Component({
  selector: 'app-icon-doc',
  templateUrl: './icon-doc.component.html',
  styleUrls: ['./icon-doc.component.scss'],
})
export class IconDocComponent implements OnInit {

  @Input() selected = TabNames.Overview;

  componentStatus = getUtilities('icon-doc').status;
  tabNames = TabNames;
  tabs = [TabNames.Overview, TabNames.Code, TabNames.Guidelines];
  componentClasses = ['e-icon'];

  example = `<i class="e-icon-clock e-icon-xl"></i>
<i class="e-icon-clock e-icon-lg"></i>
<i class="e-icon-clock e-icon-md"></i>
<i class="e-icon-clock e-icon-sm"></i>
<i class="e-icon-github e-icon-sm"></i>
<i class="e-icon-clock e-icon-xs"></i>`;

  example2 = `<i class="e-icon-custom e-icon-xl">
  <img src="assets/icons/example-custom-icon.svg"></img>
</i>

<i class="e-icon-custom">
  <img src="assets/icons/example-custom-icon.svg"></img>
</i>`;

  term;
  IconClassList: Icon[] = [];
  constructor() {}

  ngOnInit() {
    this.fillIconList();
  }

  fillIconList(): void {
    this.IconClassList = icons.map((icon: any) => {
      return {
        title: icon.name,
        class: `e-icon-${icon.name}`,
        terms: icon.terms
      };
    }).sort((icon: any, icon2: any) => {
      const a = icon.title.toLowerCase();
      const b = icon2.title.toLowerCase();
      return (a < b) ? -1 : (a > b ) ? 1 : 0;
    });
  }
}
