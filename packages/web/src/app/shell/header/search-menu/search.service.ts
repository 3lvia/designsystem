import { Injectable } from '@angular/core';
import Fuse from 'fuse.js';
import { SearchItem } from './search-menu.interface';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  searchOptions: Fuse.IFuseOptions<SearchItem> = {
    includeScore: true,
    includeMatches: true,
    threshold: 0.4,
    minMatchCharLength: 1,
    keys: [
      { name: 'title', weight: 1 },
      { name: 'description', weight: 0.5 },
    ],
  };

  fuse: Fuse<SearchItem>;
  searchResults: Fuse.FuseResult<SearchItem>[];

  initializeSearch(searchItems: SearchItem[]): void {
    this.fuse = new Fuse(searchItems, this.searchOptions);
  }

  search(searchString: string): void {
    this.searchResults = this.fuse.search(searchString);
  }

  getSearchItems(): SearchItem[] {
    return this.searchResults.map((result) => result.item);
  }
}
