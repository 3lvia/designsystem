import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { Icon } from 'src/app/shared/icon.interface';
import { TabNames } from 'src/app/shared/tab-names.enums';
import { getUtilities } from 'src/app/shared/e-items';
import * as icons from 'style/elvis/src/icons/icons.config';

@Component({
  selector: 'app-icon-doc',
  templateUrl: './icon-doc.component.html',
  styleUrls: ['./icon-doc.component.scss'],
})
export class IconDocComponent implements OnInit {
  @Input() selected = TabNames.Overview;
  svgIcons = [];
  externalUrl = getUtilities('icon-doc').externalUrl;
  componentStatus = getUtilities('icon-doc').status;
  tabNames = TabNames;
  tabs = [TabNames.Overview, TabNames.Code, TabNames.Guidelines]; // TabNames.Code,
  inverted = false;

  example = `<i class="e-icon e-icon--move-truck-color e-icon--xxl"></i>
<i class="e-icon e-icon--move-truck-color e-icon--xl"></i>
<i class="e-icon e-icon--move-truck-color e-icon--lg"></i>
<i class="e-icon e-icon--move-truck-color e-icon--md"></i>
<i class="e-icon e-icon--move-truck-color e-icon--sm"></i>
<i class="e-icon e-icon--move-truck-color e-icon--xs"></i>
<i class="e-icon e-icon--move-truck-color e-icon--xxs"></i>`;


  example2 = `<div class="e-p-8">
  <i class="e-icon e-icon--cog e-icon--xxl e-icon--color-purple-plum"></i>
  <i class="e-icon e-icon--cog e-icon--xl e-icon--color-orange-mango"></i>
  <i class="e-icon e-icon--cog e-icon--lg e-icon--color-red-tomato"></i>
  <i class="e-icon e-icon--cog e-icon--md e-icon--color-violet-grape"></i>
  <i class="e-icon e-icon--cog e-icon--sm e-icon--color-grey-70"></i>
  <i class="e-icon e-icon--cog e-icon--xs e-icon--color-blue-berry"></i>
  <i class="e-icon e-icon--cog e-icon--xxs e-icon--color-green-apple"></i>
</div>
<div class="e-bg-black e-p-8">
  <i class="e-icon e-icon--cog e-icon--xxl e-icon--color-purple-plum e-icon--inverted"></i>
  <i class="e-icon e-icon--cog e-icon--xl e-icon--color-orange-mango e-icon--inverted"></i>
  <i class="e-icon e-icon--cog e-icon--lg e-icon--color-red-tomato e-icon--inverted"></i>
  <i class="e-icon e-icon--cog e-icon--md e-icon--color-violet-grape e-icon--inverted"></i>
  <i class="e-icon e-icon--cog e-icon--sm e-icon--color-grey-70 e-icon--inverted"></i>
  <i class="e-icon e-icon--cog e-icon--xs e-icon--color-blue-berry e-icon--inverted"></i>
  <i class="e-icon e-icon--cog e-icon--xxs e-icon--color-green-apple e-icon--inverted"></i>
</div>
`;

example3 = `<div class="e-bg-black e-p-8">
  <i class="e-icon e-icon--chat e-icon--inverted"></i>
</div>
<div class="e-p-8">
  <i class="e-icon e-icon--chat e-icon--color-disabled"></i>
</div>
<div class="e-bg-black e-p-8">
  <i class="e-icon e-icon--chat e-icon--color-disabled-light"></i>
</div>`;

example4 = `<i class="e-icon e-icon--email"></i>
<i class="e-icon e-icon--email e-icon--color-grey-90"></i>
<i class="e-icon e-icon--email e-icon--color-grey-80"></i>
<i class="e-icon e-icon--email e-icon--color-grey-70"></i>
<i class="e-icon e-icon--email e-icon--color-grey-60"></i>
<i class="e-icon e-icon--email e-icon--color-grey-50"></i>
<i class="e-icon e-icon--email e-icon--color-grey-40"></i>
<i class="e-icon e-icon--email e-icon--color-grey-30"></i>
<i class="e-icon e-icon--email e-icon--color-grey-20"></i>
<i class="e-icon e-icon--email e-icon--color-grey-10"></i>
<i class="e-icon e-icon--email e-icon--color-grey-05"></i>
<i class="e-icon e-icon--email e-icon--color-grey-02"></i>
`;

  term;
  IconClassList: Icon[] = [];
  constructor() {}

  ngOnInit() {
    this.fillIconList();
  }


  invert(): void {
    this.inverted = !this.inverted;
  }


  fillIconList(): void {
    this.svgIcons = [];


    for (const icon of icons) {
      if (icon.name.indexOf('figma') > -1) {
        continue;
      }
      this.svgIcons.push({
        title: icon.name,
      });
    }

    this.svgIcons.sort((icon: any, icon2: any) => {
      const a = icon.title.toLowerCase();
      const b = icon2.title.toLowerCase();
      return (a < b) ? -1 : (a > b ) ? 1 : 0;
    });
  }
}
