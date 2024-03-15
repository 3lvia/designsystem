import { Pipe, PipeTransform } from '@angular/core';

import { IllustrationExhibitEntry } from '../illustrations-exhibit-data';
import { IllustrationsExhibitListDisplayNamePipe } from './illustrations-exhibit-list-display-name.pipe';

@Pipe({
  name: 'illustrationsExhibitListSearch',
  standalone: true,
})
export class IllustrationsExhibitListSearchPipe implements PipeTransform {
  private displayNamePipe = new IllustrationsExhibitListDisplayNamePipe();

  transform<T extends IllustrationExhibitEntry[]>(value: T, searchValue: string | null): T {
    return value.filter((entry) => {
      // If the search value is empty, return all entries
      if (!searchValue) {
        return true;
      }
      const searchValueLower = searchValue.toLowerCase();
      return (
        this.displayNamePipe.transform(entry.name).toLowerCase().includes(searchValueLower) ||
        entry.searchKeywords.some((keyword) => keyword.toLowerCase().includes(searchValueLower))
      );
    }) as T;
  }
}
