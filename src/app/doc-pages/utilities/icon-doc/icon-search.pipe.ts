import { Pipe, PipeTransform } from '@angular/core';
import * as icons from 'style/elvis/src/icons/icons.config';

@Pipe({
  name: 'iconSeachPipe'
})
export class IconSearchPipe implements PipeTransform {

  transform(iconList: [], searchTerm: string) {

    const filtereList = [];

    if (!searchTerm) {
      return iconList;
    }

    for (const icon of icons) {
      if (icon.name.indexOf('figma') > -1) {
        continue;
      }

      if (icon.name.includes(searchTerm)) {
        filtereList.push({
          title: icon.name,
        });
      }
    }

    if (filtereList.length > 0) {
      return filtereList;
    }

  }
}
