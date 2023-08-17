export interface SearchItem {
  title: string;
  description?: string;
  type?: string;
  absolutePath?: string;
  fragmentPath?: string;
  searchTerms?: string[];
}

export type ResultsStatus = 'loading' | 'show' | 'empty' | 'no-result';
