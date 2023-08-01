import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'iconSearchPipe',
  pure: false,
})
export class IconSearchPipe implements PipeTransform {
  static filter(IconList: Array<{ [key: string]: any }>, searchTerm: string): Array<{ [key: string]: any }> {
    const compare = searchTerm.toLowerCase();

    function checkInside(IconList: any, searchTerm: string) {
      if (typeof IconList === 'string' && IconList.toString().toLowerCase().includes(compare)) {
        return true;
      }

      for (const property in IconList) {
        if (IconList[property] === null || IconList[property] === undefined) {
          continue;
        }
        if (typeof IconList[property] === 'object' && checkInside(IconList[property], searchTerm)) {
          return true;
        } else if (IconList[property].toString().toLowerCase().includes(compare)) {
          return true;
        }
      }
      return false;
    }
    return IconList.filter((iconList) => {
      return checkInside(iconList, searchTerm);
    });
  }

  transform(IconList: Array<any>, searchTerm: string): any {
    if (!searchTerm || !IconList) {
      return IconList;
    }

    const resultList = IconSearchPipe.filter(IconList, searchTerm);
    if (resultList.length === 0) {
      return [-1];
    }

    return resultList;
  }
}
