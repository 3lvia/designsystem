import Fuse from 'fuse.js';

export type SearchResult<T> = {
  item: T;
  matches?: ReadonlyArray<Fuse.FuseResultMatch>;
};

/**
 * Search facade over the Fuse library. How to use:
 * @example
 *
 * private searcher: Searcher<InterfaceToSearch>;
 *
 * ...
 *
 * this.searcher = new Searcher(this.searchItems, {
 *  includeScore: true,
 *  includeMatches: true,
 *  threshold: 0.4,
 *  minMatchCharLength: 1,
 *  keys: [
 *    { name: 'title', weight: 1 },
 *    { name: 'description', weight: 0.5 },
 *  ],
 * });
 *
 * ...
 *
 * this.searcher.search(value);
 */
export class Searcher<T> {
  searchResults: SearchResult<T>[];
  isInitialized = false;

  private fuse: Fuse<T>;

  constructor(searchItems: T[], searchOptions: Fuse.IFuseOptions<T>) {
    this.fuse = new Fuse(searchItems, searchOptions);
    this.isInitialized = true;
  }

  /**
   * Perform a search through the items defined in `initializeSearch`.
   * @param searchString
   * @returns List containing search results, sorted by fuzzy score (best matches first).
   */
  search(searchString: string): SearchResult<T>[] {
    this.searchResults = this.fuse.search(searchString);
    return this.searchResults;
  }

  /**
   * Adds the correct background and text color for a highlighted search result.
   * @param str
   * @returns The HTML string with the added background and text color.
   */
  addHighlightBackground(str: string): string {
    return `<span class="e-color-background-selected-1">${str}</span>`;
  }
}
