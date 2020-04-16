import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { Icon } from 'src/app/shared/icon.interface';
import { TabNames } from 'src/app/shared/tab-names.enums';
import { getUtilities } from 'src/app/shared/e-items';
import * as icons from 'style/elvis/src/icons/icons.config';
// @ts-ignore
const svgIconModule = require('style/elvis/icons');
import { DomSanitizer } from '@angular/platform-browser';

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
  tabs = [TabNames.Overview, TabNames.Guidelines]; // TabNames.Code, 
  componentClasses = ['e-icon'];
  inverted = false;

  example = `<i class="e-icon-move-truck-color e-icon-xl"></i>
<i class="e-icon-move-truck-color e-icon-lg"></i>
<i class="e-icon-move-truck-color e-icfon-md"></i>
<i class="e-icon-move-truck-color e-icon-sm"></i>
<i class="e-icon-move-truck-color e-icon-xs"></i>`;

  example2 = `<i class="e-icon-custom e-icon-xl">
  <img src="assets/icons/example-custom-icon.svg"></img>
</i>

<i class="e-icon-custom">
  <img src="assets/icons/example-custom-icon.svg"></img>
</i>`;

example3 = `<div class="e-bg-black e-p-1">
<i class="e-icon-chat e-icon-invert"></i>
</div>
<i class="e-icon-chat e-icon-disabled"></i>
`;



  term;
  IconClassList: Icon[] = [];
  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.fillIconList();
  }

  invert(): void {
    this.inverted = !this.inverted;
    this.fillIconList();
  }

  fillIconList(): void {
    const iconNames = Object.keys(svgIconModule);
    this.svgIcons = [];

    const filenames = [];
    for(let i = 0; i < icons.length; i++) {
      filenames[this.createCamelCase(icons[i].name)] = icons[i].name;
    }

    for(let i = 0; i < iconNames.length; i++) {
      this.svgIcons.push({
        svg: this.sanitizer.bypassSecurityTrustHtml(svgIconModule[iconNames[i]].getIcon(this.inverted ? 'white': null)),
        title: filenames[iconNames[i]],
        class: iconNames[i]
      });
    }

    this.svgIcons.sort((icon: any, icon2: any) => {
      const a = icon.title.toLowerCase();
      const b = icon2.title.toLowerCase();
      return (a < b) ? -1 : (a > b ) ? 1 : 0;
    });
  }

  createCamelCase(original) {
    const arr = original.split('-');
    let newText = '';
    for(let i = 0; i < arr.length; i++){
      if(i === 0) {
        newText += arr[i];
        continue;
      }
      newText += arr[i][0].toUpperCase() + arr[i].substr(1,arr[i].length-1);
    }
    return newText;
  }
}
