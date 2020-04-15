import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { Icon } from 'src/app/shared/icon.interface';
import { TabNames } from 'src/app/shared/tab-names.enums';
import { getUtilities } from 'src/app/shared/e-items';
import * as icons from 'style/elvis/src/icons/icons.config';
import { addCircle } from 'style/elvis/icons';
import { ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-icon-doc',
  templateUrl: './icon-doc.component.html',
  styleUrls: ['./icon-doc.component.scss'],
})
export class IconDocComponent implements OnInit {
  @ViewChild('dataContainer') dataContainer: ElementRef;
  @Input() selected = TabNames.Overview;
  externalUrl = getUtilities('icon-doc').externalUrl;
  componentStatus = getUtilities('icon-doc').status;
  tabNames = TabNames;
  tabs = [TabNames.Overview, TabNames.Code, TabNames.Guidelines];
  componentClasses = ['e-icon'];

  example = `<i class="e-icon-move-truck-color e-icon-xl"></i>
<i class="e-icon-move-truck-color e-icon-lg"></i>
<i class="e-icon-move-truck-color e-icon-md"></i>
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
  constructor() {}

  ngOnInit() {
    console.log(this.dataContainer);
    this.fillIconList();
  }

  ngAfterViewInit() {
    console.log(addCircle.getIcon());
    console.log(addCircle.getIcon('red'));
    this.dataContainer.nativeElement.innerHTML = addCircle.getIcon('red');
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
