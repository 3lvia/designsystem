export interface SearchItem {
  title: string;
  description?: string;
  type?: string;
  absolutePath?: string;
  fragmentPath?: string;
  searchTerms?: string[];
}

export type SearchStatus = 'loading' | 'ready';
