import { Injectable } from '@angular/core';
import Fuse from 'fuse.js';

/**
 * **NB**: Remember to add `providers: [SearchService]` to the component using this service.
 * This is necessary to ensure that the service is instantiated for each component (so that each search is separate).
 */
@Injectable()
export class SearchService<T> {
  searchResults: Fuse.FuseResult<T>[];
  isInitialized = false;

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
    this.isInitialized = true;
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

  /**
   * Replace the items to search through defined in `initializeSearch` with a new list.
   * @param searchItems List containing the new items to search through.
   */
  updateSearchItems(searchItems: T[]): void {
    this.fuse.setCollection(searchItems);
  }
}
