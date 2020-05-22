import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'iconSeachPipe',
})
export class IconSearchPipe implements PipeTransform {

  static filter(
    IconList: Array<{ [key: string]: any }>,
    searchTerm: string
  ): Array<{ [key: string]: any }> {

    const compare = searchTerm.toLowerCase();

    // tslint:disable-next-line: no-shadowed-variable
    function checkInside(IconList: any, searchTerm: string) {
      if (
        typeof IconList === 'string' &&
        IconList.toString().toLowerCase().includes(compare)
      ) {
        return true;
      }

      for (const property in IconList) {
        if (IconList[property] === null || IconList[property] === undefined) {
          continue;
        }
        if (typeof IconList[property] === 'object') {
          if (checkInside(IconList[property], searchTerm)) {
            return true;
          }
        } else if (
          IconList[property].toString().toLowerCase().includes(compare)
        ) {
          return true;
        }
      }
      return false;
    }

    return IconList.filter(function (IconList) {
      return checkInside(IconList, searchTerm);
    });
  }

  transform(IconList: any, searchTerm: string): any {
    if (!searchTerm || !IconList) {
      return IconList;
    }

    return IconSearchPipe.filter(IconList, searchTerm);
  }
}
