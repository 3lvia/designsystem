import { Component, OnInit } from '@angular/core';
import { Icon } from 'src/app/shared/icon.interface';
import { getIdentity } from 'src/app/shared/e-items';
import * as icons from 'style/elvis/src/config/icons.config';

@Component({
  selector: 'app-icon-doc',
  templateUrl: './icon-doc.component.html',
  styleUrls: ['./icon-doc.component.scss'],
})
export class IconDocComponent implements OnInit {
  svgIcons = [];
  figmaUrl = getIdentity('icon-doc').figmaUrl;
  description = getIdentity('icon-doc').description;
  inverted = false;

  example = `<i class="e-icon e-icon--move_truck-color e-icon--xxs e-mr-40"></i>
<i class="e-icon e-icon--move_truck-color e-icon--xs e-mr-40"></i>
<i class="e-icon e-icon--move_truck-color e-icon--sm e-mr-40"></i>
<i class="e-icon e-icon--move_truck-color e-icon--md e-mr-40"></i>
<i class="e-icon e-icon--move_truck-color e-icon--lg e-mr-40"></i>
<i class="e-icon e-icon--move_truck-color e-icon--xl e-mr-40"></i>
<i class="e-icon e-icon--move_truck-color e-icon--xxl"></i>
`;

  example2 = `<i class="e-icon e-icon--cog e-icon--color-red-tomato e-mr-40"></i>
<i class="e-icon e-icon--cog e-icon--color-orange-mango e-mr-40"></i>
<i class="e-icon e-icon--cog e-icon--color-green-apple e-mr-40"></i>
<i class="e-icon e-icon--cog e-icon--color-blue-berry e-mr-40"></i>
<i class="e-icon e-icon--cog e-icon--color-purple-plum e-mr-40"></i>
<i class="e-icon e-icon--cog e-icon--color-violet-grape e-mr-40"></i>
<i class="e-icon e-icon--cog e-icon--color-grey e-mr-40"></i>
<i class="e-icon e-icon--cog e-icon--color-grey-70"></i>
`;

  example3 = `<i class="e-icon e-icon--chat e-mr-40"></i>
<i class="e-icon e-icon--chat e-icon--color-disabled"></i>
`;
  example3Inverted = `<i class="e-icon e-icon--chat e-icon--inverted e-mr-40"></i>
<i class="e-icon e-icon--chat e-icon--color-disabled e-icon--inverted"></i>
`;


  importCodeTS = `import { addCircle } from '@elvia/elvis/icons'`;
  scriptCodeHTML = `<script src="path_to_file/elvis.js"></script>;`;
  iconExample = `<i class="e-icon e-icon--chat e-icon--md"></i>`;

  term;
  IconClassList: Icon[] = [];

  ngOnInit(): void {
    this.fillIconList();
  }

  invert(): void {
    this.inverted = !this.inverted;
  }

  getShortIconName(iconName: string): string {
    let short = iconName.split('-')[0];
    short = short.split('_').join(' ');
    return short.charAt(0).toUpperCase() + short.slice(1);
  }

  fillIconList(): void {
    this.svgIcons = [];

    for (const icon of icons) {
      if (icon.name.indexOf('figma') > -1) {
        continue;
      }
      this.svgIcons.push({
        pretty: this.getShortIconName(icon.name),
        title: icon.name,
        terms: icon.terms,
      });
    }

    this.svgIcons.sort((icon: any, icon2: any) => {
      const a = icon.title.toLowerCase();
      const b = icon2.title.toLowerCase();
      return a < b ? -1 : a > b ? 1 : 0;
    });
  }
}
