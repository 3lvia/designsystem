import { Injectable } from '@angular/core';
import Fuse from 'fuse.js';

@Injectable({
  providedIn: 'root',
})
export class SearchService<T> {
  searchResults: Fuse.FuseResult<T>[];

  private fuse: Fuse<T>;

  /**
   *
   * @param searchItems List containing the items to search through.
   * @param searchOptions Search options.
   * 
   * @example
   * this.searchService.initializeSearch(this.searchItems, {
      includeScore: true,
      includeMatches: true,
      threshold: 0.4,
      minMatchCharLength: 1,
      keys: [
        { name: 'title', weight: 1 },
        { name: 'description', weight: 0.5 },
      ],
    });
   */
  initializeSearch(searchItems: T[], searchOptions: Fuse.IFuseOptions<T>): void {
    this.fuse = new Fuse(searchItems, searchOptions);
  }

  /**
   * Perform a search through the items defined in `initializeSearch`.
   * @param searchString
   * @returns List containing search results, sorted by fuzzy score (best matches first).
   */
  search(searchString: string): T[] {
    this.searchResults = this.fuse.search(searchString);
    return this.searchResults.map((result) => result.item);
  }
}
